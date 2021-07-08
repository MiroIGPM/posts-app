import React, { FC, useEffect, useState } from 'react';
import { usePosts } from 'src/moduls/posts/context/posts-context';
import { withRouter, Link } from 'react-router-dom';
import { IPostWithUserName } from 'src/api/models';
import './single-post-page.scss';

const SinglePostPage: FC<any> = ({ location, commponentName, propMessage }) => {
  const [post, setPost] = useState<IPostWithUserName | undefined>(undefined);
  const idSplit = location.pathname.split('');
  const postId = idSplit[idSplit.length - 1];
  const { state } = usePosts();

  const getPost = () => {
    const singlePost = state.posts.find((item) => item.id.toString() === postId);
    setPost(singlePost);
  };

  useEffect(() => {
    console.log(`${propMessage} ${commponentName}`);
  }, []);

  useEffect(() => {
    if (state.posts.length !== 0) {
      getPost();
    }
  }, [state.posts]);

  return (
    <div className="post flex flex-align-center flex-justify-center flex-column">
      <p className="post-title">{post?.title as string}</p>
      <p className="post-text">{post?.body as string}</p>
      <p className="post-user">{post?.name as string}</p>
      <div className="link-holder">
        <Link to="/posts">
          <p
            className="link-btn"
          >
            Back
          </p>
        </Link>
      </div>
    </div>
  );
};

export default withRouter(SinglePostPage);
