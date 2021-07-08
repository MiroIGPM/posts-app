import React, { FC, useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { fetchAll } from 'src/api/api';
import { usePosts } from 'src/moduls/posts/context/posts-context';
import { useApp } from 'src/context/app-context';
import PostsPage from 'src/moduls/posts/page/posts-page';
import SinglePostPage from 'src/moduls/post/page/single-post-page';
import { IAppControlerProps } from './models/app-controler-models';

const AppControler: FC<IAppControlerProps> = ({ propMessage, commponentName }) => {
  const { dispatch } = usePosts();
  const { appState, appDispatch } = useApp();

  const handleDispatch = (data: any) => {
    if (data.message) {
      appDispatch({ type: 'SET_ERROR', payload: { errorExist: true, errorMessage: data.message } });
    }
    if (!data.message) {
      dispatch({ type: 'SET_POSTS', payload: data });
    }
  };

  const fetchData = async (): Promise<void> => {
    appDispatch({ type: 'SET_LOADING', payload: true });
    const postsData = await fetchAll();
    handleDispatch(postsData);
    appDispatch({ type: 'SET_LOADING', payload: false });
  };

  useEffect(() => {
    fetchData();
    console.log(`${propMessage} ${commponentName}`);
  }, []);

  const renderContetn = () => {
    if (appState.errorState.errorExist) {
      return (
        <div>{appState.errorState.errorMessage}</div>
      );
    }
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            (
              <Redirect to="/posts" />
            )
          )}
        />
        <Route exact path="/posts">
          <PostsPage propMessage={propMessage} commponentName="PostsPage" />
        </Route>
        <Route path="/post/:id">
          <SinglePostPage propMessage={propMessage} commponentName="SinglePostPage" />
        </Route>
      </Switch>
    );
  };

  return (
    <BrowserRouter>
      {renderContetn()}
    </BrowserRouter>
  );
};

export default AppControler;
