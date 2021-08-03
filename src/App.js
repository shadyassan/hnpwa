import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Wrapper from './components/shared/Wrapper';
import ListingPage from './pages/ListingPage';
import Post from './pages/Post';
import { RouteProvider } from './contexts/AppProvider';

const App = () => {
  return (
    <Wrapper>
      <Route exact path="/">
        <RouteProvider>
          <ListingPage url="news" />
        </RouteProvider>
      </Route>
      <Route exact path="/newest">
        <RouteProvider>
          <ListingPage url="newest" />
        </RouteProvider>
      </Route>
      <Route path="/post/:id">
        <Post />
      </Route>
    </Wrapper>
  );
};

export default App;
