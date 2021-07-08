import React, {
  createContext,
  ReactNode,
  useReducer,
  useContext,
} from 'react';

type Action = {
  type: 'SET_ERROR', payload: { errorExist: boolean, errorMessage: string }
} | {
  type: 'SET_LOADING', payload: boolean
};
type Dispatch = (action: Action) => void;
type State = { isLoading: boolean; errorState: { errorExist: boolean, errorMessage: string } };
type AppProviderProps = { children: ReactNode };

const initalState: State = {
  isLoading: false,
  errorState: {
    errorExist: false,
    errorMessage: '',
  },
};

const AppContext = createContext<
{ appState: State, appDispatch: Dispatch } | undefined
>(undefined);

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        errorState: {
          ...state.errorState,
          errorExist: action.payload.errorExist,
          errorMessage: action.payload.errorMessage,
        },
      };
    default: {
      throw new Error('Unhandled action type');
    }
  }
};

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  const [appState, appDispatch] = useReducer(appReducer, initalState);

  const value = { appState, appDispatch };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

const useApp = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('There is no context');
  }
  return context;
};

export { AppProvider, useApp };
