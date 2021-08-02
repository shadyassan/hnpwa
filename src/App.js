import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Wrapper from './components/shared/Wrapper';
import TopBar from './components/shared/Topbar';
import ListingPage from './pages/ListingPage';
import Post from './pages/Post';

const App = () => {
  return (
    <Wrapper>
      <TopBar />
      <Route exact path="/">
        <ListingPage url="news" />
      </Route>
      <Route exact path="/newest">
        <ListingPage url="newest" />
      </Route>
      <Route path="/post/:id">
        <Post />
      </Route>
    </Wrapper>
  );
};

export default App;
