import React, { FC } from 'react';
import { Provider, } from 'react-redux';
import { Route, Switch, RouteComponentProps } from 'react-router-dom';
import store from './redux';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import ContainerWrapper from './components/ContainerWrapper';
import Users from './containers/users';
import Post from './containers/post';
import Album from './containers/album';
import Photo from './containers/photo';
import PostConfig from './containers/post/PostConfig';
import CommentConfig from './containers/comment/CommentConfig';
import Toaster from './components/Toaster';
import 'semantic-ui-css/semantic.min.css';

const App: FC<RouteComponentProps> = (props) => {
  return (
    <Provider store={store}>
      <Switch>
        <Route
          exact
          path="/users"
          render={() => (
            <ContainerWrapper>
              <Users {...props} />
            </ContainerWrapper>
          )}
        />
        <Route
          exact
          path="/posts/:userId/create"
          render={() => (
            <ContainerWrapper>
              <PostConfig {...props} />
            </ContainerWrapper>
          )}
        />
        <Route
          exact
          path="/posts/:userId"
          render={() => (
            <ContainerWrapper>
              <Post {...props} />
            </ContainerWrapper>
          )}
        />
        <Route
          exact
          path="/albums/:userId"
          render={() => (
            <ContainerWrapper>
              <Album {...props} />
            </ContainerWrapper>
          )}
        />
        <Route
          exact
          path="/albums/:albumId/photo"
          render={() => (
            <ContainerWrapper>
              <Photo {...props} />
            </ContainerWrapper>
          )}
        />
        <Route
          exact
          path="/posts/:postId/edit"
          render={() => (
            <ContainerWrapper>
              <PostConfig {...props} />
            </ContainerWrapper>
          )}
        />
        <Route
          exact
          path="/comments/:commentId/edit"
          render={() => (
            <ContainerWrapper>
              <CommentConfig {...props} />
            </ContainerWrapper>
          )}
        />
        <Route
          exact
          path="/comments/:postId/create"
          render={() => (
            <ContainerWrapper>
              <CommentConfig {...props} />
            </ContainerWrapper>
          )}
        />
      </Switch>
      <Toaster />
    </Provider>
  );
}

export default App;
