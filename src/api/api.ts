import formatPosts from './utils/utils';

import {
  IPostType,
  IUserType,
  IPostWithUserName,
  ICommentType,
} from './models';

const baseURL = 'https://jsonplaceholder.typicode.com/';

const fetchPosts = async (): Promise<IPostType[]> => {
  try {
    const response = await fetch(`${baseURL}posts`);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

const fetchComments = async (id: string | number): Promise<ICommentType[]> => {
  try {
    const response = await fetch(`${baseURL}posts/${id}/comments`);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

const fetchUsers = async (): Promise<IUserType[]> => {
  try {
    const response = await fetch(`${baseURL}users`);
    const data = await response.json();
    return data;
  } catch (e) {
    return e;
  }
};

const fetchAll = async (): Promise<IPostWithUserName[]> => {
  try {
    const posts = await fetchPosts();
    const users = await fetchUsers();
    const postsWithName = formatPosts(posts, users);
    return postsWithName;
  } catch (e) {
    return e;
  }
};

const fetchPostsByUser = async (userName: string | number): Promise<IPostWithUserName[]> => {
  try {
    const userResponse = await fetch(`${baseURL}users?name=${userName}`);
    const userData = await userResponse.json();
    if (userData[0]) {
      const udserId = userData[0].id;
      const postsResponse = await fetch(`${baseURL}posts?userId=${udserId}`);
      const postsData = await postsResponse.json();

      const postWithUserName = postsData.map((post: IPostType) => {
        const { name } = userData[0];
        return {
          ...post,
          name,
        };
      });

      return postWithUserName;
    }
    return [];
  } catch (e) {
    return e;
  }
};

export { fetchComments, fetchAll, fetchPostsByUser };
