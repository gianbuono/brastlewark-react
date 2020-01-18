import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import GnomesList from './components/GnomesList';

import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/gnomes" />
        </Route>
        <Route path="/gnomes">
          <GnomesList />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
