import React from 'react';
import HomePage from './components/pages/HomePage.js';
import Articles from './components/pages/Articles.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return ( <>
    <Router>
      <Switch>
        <Route path="/articles">
          <Articles />
        </Route>
        <Route path='/'>
          <HomePage />
        </Route>
      </Switch>
    </Router>
  </>);
}

export default App;
