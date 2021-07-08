import React, { FC, useEffect, useState } from 'react';
import Input from 'src/common/core-ui/commponents/input/input';
import Button from 'src/common/core-ui/commponents/button/button';
import { fetchPostsByUser, fetchAll } from 'src/api/api';
import { usePosts } from 'src/moduls/posts/context/posts-context';
import { useApp } from 'src/context/app-context';
import { IPostsFilterProps } from './models/posts-filter.props';

const PostsFilter: FC<IPostsFilterProps> = ({ propMessage, componentName }) => {
  const { dispatch } = usePosts();
  const { appDispatch } = useApp();
  const [searchParam, setSearchParam] = useState<string | number>('');

  useEffect(() => {
    console.log(`${propMessage} ${componentName}`);
  }, []);

  const handleDispatch = (data: any) => {
    if (data.message) {
      appDispatch({ type: 'SET_ERROR', payload: { errorExist: true, errorMessage: data.message } });
    }
    if (!data.message) {
      dispatch({ type: 'SET_POSTS', payload: data });
    }
  };

  const applyFilter = async () => {
    appDispatch({ type: 'SET_LOADING', payload: true });
    const postsByUsers = await fetchPostsByUser(searchParam);
    handleDispatch(postsByUsers);
    appDispatch({ type: 'SET_LOADING', payload: false });
  };

  const resetFilter = async () => {
    appDispatch({ type: 'SET_LOADING', payload: true });
    const posts = await fetchAll();
    handleDispatch(posts);
    setSearchParam('');
    appDispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <div>
      <Input placeholder="Search by user name" onChange={setSearchParam} inputValue={searchParam} />
      <div className="flex flex-justify-center">
        <Button text="apply filter" onButtonClicked={applyFilter} propMessage={propMessage} commponentName="Button" isDisabled={!searchParam.toString().length} />
        <Button text="reset filter" onButtonClicked={resetFilter} propMessage={propMessage} commponentName="Button" />
      </div>
    </div>
  );
};

export default PostsFilter;
