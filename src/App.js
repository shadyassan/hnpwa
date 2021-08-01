import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Wrapper from './components/shared/Wrapper';
import ListingPage from './pages/ListingPage';
import News from './pages/News';

const App = () => {
  return (
    <Wrapper>
      <Route exact path="/">
        <ListingPage />
      </Route>
      <Route path="/news/:id">
        <News />
      </Route>
    </Wrapper>
  );
};

export default App;
