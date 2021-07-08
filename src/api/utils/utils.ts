import { IPostType, IUserType, IPostWithUserName } from '../models';

const formatPosts = (posts: IPostType[], users: IUserType[]): IPostWithUserName[] => {
  const postWithUserName = posts.map((post) => {
    const userIndex = post.userId - 1;
    return {
      ...post,
      name: users[userIndex].name,
    };
  });
  return postWithUserName;
};

export default formatPosts;
