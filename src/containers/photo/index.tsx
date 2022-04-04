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
  Image,
  Dimmer,
  Loader,
  Breadcrumb,
} from 'semantic-ui-react';
import { ECountDataAssumptions, ELimitViewData } from '../../interfaces';
import { TAppState } from '../../redux';
import { IPhotoParams } from '../../interfaces/photo';
import {
  getUserAlbumPhotos,
} from '../../actions/photo';
import {
  resetState,
} from '../../redux/actions/photo';
import PaginationWrapper from '../../components/PaginationWrapper';
import ModalWrapper from '../../components/ModalWrapper';

const Photo: FC<RouteComponentProps> = () => {
  const dispatch = useDispatch();
  const { albumId } = useParams<IPhotoParams>();
  const {
    isLoading,
    userAlbumPhotos,
  } = useSelector((state: TAppState) => state.photo);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getUserAlbumPhotos(albumId, 0, ELimitViewData.USER_ALBUM_PHOTOS));
    return () => {
      dispatch(resetState());
    };
  }, []);

  const paginationCall = useCallback((start, limitView) => {
    dispatch(getUserAlbumPhotos(albumId, start, limitView));
  }, [albumId]);

  const clickPhotoDetail = useCallback((photoUrl: string) => {
    setImageSrc(photoUrl);
    setIsOpen(true);
  }, []);

  const closePhotoDetail = useCallback(() => {
    setIsOpen(false);
    setImageLoaded(false);
  }, []);

  const renderModalChildren = useCallback(() => (
    <>
      <Image
        src={imageSrc}
        size="medium"
        style={imageLoaded ? {} : { display: 'none' }}
        rounded
        centered
        onLoad={() => setImageLoaded(true)}
      />
      <Container
        style={imageLoaded ? { display: 'none' } : {}}
      >
        <Dimmer active inverted>
          <Loader inverted>load image</Loader>
        </Dimmer>
      </Container>
    </>
  ), [imageLoaded, imageSrc]);

  const renderUserALbumPhotoRow = () => userAlbumPhotos.map((photo) => (
    <Table.Row key={photo.id}>
      <Table.Cell>{photo.id}</Table.Cell>
      <Table.Cell>{photo.title}</Table.Cell>
      <Table.Cell>{photo.url}</Table.Cell>
      <Table.Cell>{photo.thumbnailUrl}</Table.Cell>
      <Table.Cell>
        <Button
          color="instagram"
          compact
          onClick={() => clickPhotoDetail(photo.url)}
        >
          <Icon name="eye" />
          View
        </Button>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Container>
      <Segment raised padded loading={isLoading}>
        <Grid verticalAlign="middle">
          <Grid.Row>
            <Grid.Column>
              <Header as="h3">
                Album
                {`#${albumId}`}
                {' '}
                Photos
              </Header>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column>
              <Breadcrumb size="small">
                <Breadcrumb.Section>Users</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>Users Albums</Breadcrumb.Section>
                <Breadcrumb.Divider />
                <Breadcrumb.Section>Album Photos</Breadcrumb.Section>
              </Breadcrumb>
            </Grid.Column>
          </Grid.Row>

          <Divider />

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
                    url
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    thumbnailUrl
                  </Table.HeaderCell>
                  <Table.HeaderCell width={3}>
                    Action
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {renderUserALbumPhotoRow()}
              </Table.Body>

              <Table.Footer>
                <Table.Row textAlign="right">
                  <Table.HeaderCell colSpan="7">
                    <PaginationWrapper
                      totalData={ECountDataAssumptions.USER_ALBUM_PHOTOS}
                      limitView={ELimitViewData.USER_ALBUM_PHOTOS}
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
        headerText="Photo Image"
        useModalAction={false}
        open={isOpen}
        onClose={closePhotoDetail}
      >
        {renderModalChildren()}
      </ModalWrapper>
    </Container>
  );
};

export default memo(Photo);
