import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
  } from "react-router-dom";
import configureStore from './configureStore'
import App from './App'
const store = configureStore()

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Switch>
                <Route exact path="/">
                    <Redirect to="/gnomes" />
                </Route>
                <Route path="/gnomes">
                    <App />
                </Route>
            </Switch>
          </Router>
       
      </Provider>
    )
  }
}