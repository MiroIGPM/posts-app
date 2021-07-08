import React, { FC, useEffect } from 'react';
import { usePosts } from 'src/moduls/posts/context/posts-context';
import { useApp } from 'src/context/app-context';
import { v4 as uuidv4 } from 'uuid';
import Spinner from 'src/shared/commponents/spinner/spinner';
import PostsFilter from 'src/shared/commponents/posts-filter/posts-filter';
import PostListItem from '../commponents/post-list-item/post-list-item';
import { IPostsPageProps } from './models/posts-page.props';

const PostsPage: FC<IPostsPageProps> = ({ propMessage, commponentName }) => {
  const { state } = usePosts();
  const { appState } = useApp();

  useEffect(() => {
    console.log(`${propMessage} ${commponentName}`);
  }, []);

  const renderContet = () => {
    if (!appState.isLoading) {
      if (state.posts.length) {
        return (
          state.posts.map((post) => (
            <PostListItem
              name={post.name}
              title={post.title}
              id={post.id}
              propMessage={propMessage}
              commponentName="PostListItem"
              key={uuidv4()}
            />
          ))
        );
      }
      return (
        <div>There are no posts for this user or user dose not exist.</div>
      );
    }
    return <Spinner propMessage={propMessage} commponentName="Spinner" />;
  };

  return (
    <div>
      <PostsFilter propMessage={propMessage} componentName="PostsFilter" />
      {renderContet()}
    </div>
  );
};

export default PostsPage;
