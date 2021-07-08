import React, {
  ReactNode,
  createContext,
  useReducer,
  useContext,
} from 'react';
import { IPostWithUserName } from 'src/api/models';

type Action = { type: 'SET_POSTS', payload: IPostWithUserName[] };
type Dispatch = (action: Action) => void;
type State = { posts: IPostWithUserName[] };
type PostsProviderProps = { children: ReactNode };

const initalState: State = {
  posts: [],
};

const PostsContext = createContext<{ state: State, dispatch: Dispatch } | undefined>(undefined);

const postsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
      };
    default: {
      throw new Error('Unhandled action type');
    }
  }
};

const PostsProvider = ({ children }: PostsProviderProps): JSX.Element => {
  const [state, dispatch] = useReducer(postsReducer, initalState);

  const value = { state, dispatch };
  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

const usePosts = () => {
  const context = useContext(PostsContext);

  if (context === undefined) {
    throw new Error('There is no context');
  }
  return context;
};

export { PostsProvider, usePosts };
