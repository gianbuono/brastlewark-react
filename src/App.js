import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {Map} from 'immutable'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import {
  fetchUsers
} from './actions'
//import { selectorUsers } from './selectors'

import './App.css'
import { Header } from './components/Header'
import GnomesList from './components/GnomesList'
import { GnomeDetails } from './components/GnomeDetails'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchUsers())
  }

  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(fetchUsers())
  }
  render() {
    const { list, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Header />
        <div className="App-body">
          <Router>
            <Switch>
              <Route exact path="/">
                <Redirect to="/gnomes" />
              </Route>
              <Route path="/gnomes">
                <Switch>
                  <Route exact path="/gnomes">  
                    {isFetching && list.length === 0 && <h2>Loading...</h2>}
                    {!isFetching && list.length === 0 && <h2>Empty.</h2>}
                    {list.length > 0 && (
                      <div className="data-table-wrapper">
                        <GnomesList users={list} />
                      </div>
                    )}
                  </Route>
                  <Route exact path="/gnomes/:gnomeId">
                    <GnomeDetails {...this.props} />
                  </Route>
                </Switch>
              </Route>
            </Switch>
          </Router>

          {/* <p>
            {lastUpdated && (
              <span>
                Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
              </span>
            )}
            {!isFetching && (
              <button onClick={this.handleRefreshClick}>Refresh</button>
            )}
          </p> */}

        </div>
      </div>
    )
  }
}
App.propTypes = {
  list: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  
  const deepState = Map(state);
  const { users } = deepState.toJS()
  console.log(state)
  const { isFetching, lastUpdated, list } = users || {
    isFetching: true,
    list: []
  }
  
  return {
    list,
    isFetching,
    lastUpdated
  }

}
export default connect(mapStateToProps)(App)