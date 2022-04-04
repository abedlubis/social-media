import React, {
  FC, useCallback, useState, useMemo, useEffect, memo,
} from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, useParams } from 'react-router';
import { Prompt } from 'react-router-dom';
import {
  Segment,
  Container,
  Header,
  Grid,
  Divider,
  Button,
  Confirm,
} from 'semantic-ui-react';
import { TAppState } from '../../redux';
import { ICommentParam } from '../../interfaces/comment';
import { COMMENT_FORM } from '../../constants';
import {
  setCommentForm,
  setCommentFormErrors,
  resetState,
} from '../../redux/actions/commentConfig';
import {
  createPostComment,
  getPostComment,
  updatePostComment,
  deletePostComment,
} from '../../actions/commentConfig';
import { deepCopy } from '../../utils';
import Validator from '../../helpers/Validator';
import { COMMENT_CONFIG_VALIDATION_RULES } from '../../helpers/validationRule';
import FormWrapper from '../../components/FormWrapper';

const CommentConfig: FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const { commentId, postId } = useParams<ICommentParam>();
  const {
    errors,
    form,
    formDefault,
    isLoading,
  } = useSelector((state: TAppState) => state.commentConfig);

  const isNewCommentProcess = useMemo(() => !!postId, [postId]);

  const [isEditMode, setIsEditMode] = useState<boolean>(!!isNewCommentProcess);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isNewCommentProcess) {
      dispatch(getPostComment(commentId));
    }
    return () => {
      dispatch(resetState());
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const { value } = e.target;

    const newForm: any = deepCopy(form);
    newForm[name] = value;

    dispatch(setCommentForm(newForm));
  };

  const handleChangeTextArea = (e: React.SyntheticEvent<HTMLTextAreaElement>) => {
    const { name } = e.currentTarget;
    const { value } = e.currentTarget;

    const newForm: any = deepCopy(form);
    newForm[name] = value;

    dispatch(setCommentForm(newForm));
  };

  const handleSave = useCallback(() => {
    const validator = new Validator(COMMENT_CONFIG_VALIDATION_RULES);
    validator.validate(form)
      .then(() => {
        if (isNewCommentProcess) {
          batch(() => {
            dispatch(setCommentFormErrors({}));
            dispatch(createPostComment(postId));
          });
        } else {
          batch(() => {
            dispatch(setCommentFormErrors({}));
            dispatch(updatePostComment(commentId));
          });
        }
      })
      .catch((err) => {
        const errorMessages = Validator.getErrorMessages(err);
        dispatch(setCommentFormErrors(errorMessages));
      });
  }, [form, postId, commentId]);

  const handleCancel = useCallback(() => {
    if (isNewCommentProcess) {
      props.history.goBack();
      return;
    }

    setIsEditMode(false);
    batch(() => {
      dispatch(setCommentForm(formDefault));
      dispatch(setCommentFormErrors({}));
    });
  }, [isNewCommentProcess, formDefault]);

  const deleteComment = useCallback(() => {
    dispatch(deletePostComment(commentId));
    setIsDeleteConfirmOpen(false);

    props.history.goBack();
  }, [commentId]);

  const renderDeleteButton = useCallback(() => {
    if (!isNewCommentProcess) {
      return (
        <>
          <Divider />
          <Grid.Row centered>
            <Button
              color="red"
              content="Delete Comment"
              icon="trash"
              labelPosition="left"
              circular
              onClick={() => setIsDeleteConfirmOpen(true)}
            />
          </Grid.Row>
        </>
      );
    }
    return null;
  }, [deleteComment]);

  const renderButton = useCallback(() => {
    if (isEditMode || isNewCommentProcess) {
      return (
        <div className="pull-right">
          <Button
            id="btn-cancel"
            size="medium"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id="btn-save"
            size="medium"
            color="teal"
            className="ml-8"
            disabled={!isEditMode}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      );
    }
    return (
      <div className="pull-right">
        <Button
          color="teal"
          onClick={() => setIsEditMode(true)}
        >
          Edit
        </Button>
      </div>
    );
  }, [isEditMode, handleCancel, handleSave]);

  return (
    <Container>
      <Segment raised padded loading={isLoading}>
        <Grid verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                { isNewCommentProcess ? `New Comment (Post: ${postId})` : `Edit Comment #${commentId}`}
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Divider />

          <Grid.Row>
            <Grid.Column>
              {renderButton()}
            </Grid.Column>
          </Grid.Row>

          <FormWrapper
            disabled={!isEditMode}
            formField={COMMENT_FORM}
            form={form}
            errors={errors}
            handleChange={handleChange}
            handleChangeTextArea={handleChangeTextArea}
          />

          {renderDeleteButton()}
        </Grid>
      </Segment>
      <Prompt
        when={isEditMode && !isNewCommentProcess}
        message="Are you sure want to leave ?"
      />

      <Confirm
        open={isDeleteConfirmOpen}
        onConfirm={deleteComment}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </Container>
  );
};

export default memo(CommentConfig);
