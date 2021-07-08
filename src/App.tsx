import React, { FC, useEffect } from 'react';
import AppControler from './app-controler/app-controler';
import { PostsProvider } from './moduls/posts/context/posts-context';
import './App.scss';

const PROP_MESSAGE = 'Hello from';

const App: FC = () => {
  useEffect(() => {
    console.log(`${PROP_MESSAGE} app commponent`);
  }, []);

  return (
    <div className="App">
      <PostsProvider>
        <AppControler propMessage={PROP_MESSAGE} commponentName="AppControler" />
      </PostsProvider>
    </div>
  );
};

export default App;
