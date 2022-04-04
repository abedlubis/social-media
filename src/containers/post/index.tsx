import React, {
  FC, useEffect, memo, useCallback, useState,
} from 'react';
import { RouteComponentProps, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Segment,
  Container,
  Header,
  Grid,
  Divider,
  Table,
  Button,
  Icon,
  Dimmer,
  Loader,
  Item,
  Comment,
  Confirm,
  Breadcrumb,
} from 'semantic-ui-react';
import { ECountDataAssumptions, ELimitViewData } from '../../interfaces';
import { TAppState } from '../../redux';
import { IPostParams } from '../../interfaces/post';
import {
  getUserPostsData,
  getCommentsByPostId,
  deleteUserPost,
} from '../../actions/post';
import {
  resetState,
} from '../../redux/actions/post';
import PaginationWrapper from '../../components/PaginationWrapper';
import ModalWrapper from '../../components/ModalWrapper';

const Post: FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const { userId } = useParams<IPostParams>();
  const {
    isLoading,
    userPosts,
    comments,
    isModalLoading,
  } = useSelector((state: TAppState) => state.post);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [postId, setPostId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getUserPostsData(userId, 0, ELimitViewData.USER_POST));
    return () => {
      dispatch(resetState());
    };
  }, []);

  const paginationCall = useCallback((start, limitView) => {
    dispatch(getUserPostsData(userId, start, limitView));
  }, [userId]);

  const clickOpenDetail = useCallback((postId: string) => {
    setIsOpen(true);
    setPostId(postId);
  }, []);

  const closeDetail = useCallback(() => {
    setIsOpen(false);
  }, []);

  const postDetailModalMount = useCallback(() => {
    dispatch(getCommentsByPostId(postId as string));
  }, [postId]);

  const clickOpenConfirmDelete = useCallback((postId) => {
    setIsDeleteConfirmOpen(true);
    setPostId(postId);
  }, []);

  const onConfirmDelete = useCallback(() => {
    dispatch(deleteUserPost(postId as string));
    setIsDeleteConfirmOpen(false);
  }, [postId]);

  const renderUserPostsRow = () => userPosts.map((userPost) => (
    <Table.Row key={userPost.id}>
      <Table.Cell>{userPost.id}</Table.Cell>
      <Table.Cell>{userPost.title}</Table.Cell>
      <Table.Cell>{userPost.body}</Table.Cell>
      <Table.Cell>
        <Button
          color="instagram"
          className="button-action-table"
          compact
          floated="right"
          onClick={() => clickOpenDetail(userPost.id.toString())}
        >
          <Icon name="eye" />
        </Button>

        <Button
          color="yellow"
          className="button-action-table"
          compact
          floated="right"
          onClick={() => props.history.push(`/posts/${userPost.id}/edit`)}
        >
          <Icon name="edit" />
        </Button>

        <Button
          color="red"
          className="button-action-table"
          compact
          floated="right"
          onClick={() => clickOpenConfirmDelete(userPost.id)}
        >
          <Icon name="trash" />
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  const renderPostComments = () => comments.map((comment) => (
    <Comment key={comment.id}>
      <Comment.Author>{comment.email}</Comment.Author>
      <Comment.Metadata>
        <div>{comment.name}</div>
      </Comment.Metadata>
      <Comment.Text>{comment.body}</Comment.Text>
      <Comment.Actions>
        <Comment.Action>
          <Button
            color="teal"
            compact
            basic
            circular
            onClick={() => props.history.push(`/comments/${comment.id}/edit`)}
          >
            <Icon name="folder open" />
            Open
          </Button>
        </Comment.Action>
      </Comment.Actions>
    </Comment>
  ));

  const renderModalChildren = () => {
    if (isModalLoading) {
      return (
        <Container>
          <Dimmer active inverted>
            <Loader inverted>Loading ...</Loader>
          </Dimmer>
        </Container>
      );
    }

    const Post = userPosts.find((usePost) => usePost.id.toString() === postId);

    return (
      <Container>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{Post?.title}</Item.Header>
              <Item.Meta>content text</Item.Meta>
              <Item.Description>{Post?.body}</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>

        <Grid>
          <Grid.Row centered>
            <Button
              color="twitter"
              compact
              circular
              onClick={() => props.history.push(`/comments/${postId}/create`)}
            >
              <Icon name="plus" />
              New Comment
            </Button>
          </Grid.Row>
        </Grid>

        <Comment.Group>
          <Header as="h3" dividing>
            Comments
          </Header>
          {renderPostComments()}
        </Comment.Group>
      </Container>
    );
  };

  return (
    <Container>
      <Segment raised padded loading={isLoading}>
        <Grid verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                User
                {`#${userId}`}
                {' '}
                Posts
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Breadcrumb size="small">
                <Breadcrumb.Section>Users</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>Users Posts</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>

          <Divider />

          <Grid.Row>
            <Grid.Column>
              <div className="pull-right">
                <Button
                  color="teal"
                  onClick={() => props.history.push(`/posts/${userId}/create`)}
                >
                  <Icon name="plus" />
                  {' '}
                  New Post
                </Button>
              </div>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Table celled structured color="teal">
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width={1}>
                    Id
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Title
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Body
                  </Table.HeaderCell>
                  <Table.HeaderCell width={3}>
                    Action
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {renderUserPostsRow()}
              </Table.Body>

              <Table.Footer>
                <Table.Row textAlign="right">
                  <Table.HeaderCell colSpan="7">
                    <PaginationWrapper
                      totalData={ECountDataAssumptions.USER_POST}
                      limitView={ELimitViewData.USER_POST}
                      getData={paginationCall}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Row>
        </Grid>
      </Segment>

      <ModalWrapper
        closeIcon
        basic={false}
        headerText="Post details"
        useModalAction={false}
        open={isOpen}
        isLoading={isModalLoading}
        onClose={closeDetail}
        onMount={postDetailModalMount}
      >
        {renderModalChildren()}
      </ModalWrapper>

      <Confirm
        open={isDeleteConfirmOpen}
        onConfirm={onConfirmDelete}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </Container>
  );
};

export default memo(Post);
