import React from 'react';
import HomePage from './components/pages/HomePage.js';
import Article from './components/pages/Article.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return ( <>
    <Router>
      <Switch>
        <Route path="/article/:articleId">
          <Article/>
        </Route>
        <Route path="/article">
          <Redirect to="/" />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  </>);
}

export default App;
