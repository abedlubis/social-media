import React, {
  FC, useCallback, useEffect, memo,
} from 'react';
import { RouteComponentProps } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Segment,
  Container,
  Header,
  Grid,
  Icon,
  Button,
  Table,
  Divider,
} from 'semantic-ui-react';
import { ECountDataAssumptions, ELimitViewData } from '../../interfaces';
import { TAppState } from '../../redux';
import {
  getUsersData,
} from '../../actions/users';
import {
  resetState,
} from '../../redux/actions/users';
import PaginationWrapper from '../../components/PaginationWrapper';

const Users: FC<RouteComponentProps> = (props) => {
  const dispatch = useDispatch();
  const {
    isLoading,
    data,
  } = useSelector((state: TAppState) => state.users);

  useEffect(() => {
    dispatch(getUsersData(0, ELimitViewData.USERS));
    return () => {
      dispatch(resetState());
    };
  }, []);

  const paginationCall = useCallback((start, limitView) => {
    dispatch(getUsersData(start, limitView));
  }, []);

  const renderUserRow = () => data.map((user) => (
    <Table.Row key={user.id}>
      <Table.Cell>{user.id}</Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.username}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        {`${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}
      </Table.Cell>
      <Table.Cell>{user.phone}</Table.Cell>
      <Table.Cell>
        <Button
          color="teal"
          fluid
          onClick={() => props.history.push(`/posts/${user.id}`)}
          className="button-action-table"
        >
          <Icon name="folder open" />
          Posts
        </Button>
        <Button
          color="instagram"
          fluid
          onClick={() => props.history.push(`/albums/${user.id}`)}
        >
          <Icon name="images" />
          Albums
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
              <Header as="h3">Users Overview</Header>
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
                    Name
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Username
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Email
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Address
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    Phone number
                  </Table.HeaderCell>
                  <Table.HeaderCell width={2}>
                    Actions
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {renderUserRow()}
              </Table.Body>

              <Table.Footer>
                <Table.Row textAlign="right">
                  <Table.HeaderCell colSpan="7">
                    <PaginationWrapper
                      totalData={ECountDataAssumptions.USERS}
                      limitView={ELimitViewData.USERS}
                      getData={paginationCall}
                    />
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Row>
        </Grid>
      </Segment>
    </Container>
  );
};

export default memo(Users);
