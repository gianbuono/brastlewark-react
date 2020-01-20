import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Map } from 'immutable'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import {
  fetchUsers,
  updateFilterName,
  updateFilterJob,
  updateFilterMaxAge,
  updateFilterMinAge
} from './actions'
import './App.css'
import { Form, FormGroup, Input } from 'reactstrap';
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
    const { list, isFetching, filterName, filterJob, filterMaxAge, filterMinAge } = this.props
    
    const visibleList = list.filter((user) => user.name.toLowerCase().includes(filterName.toLowerCase()))
    .filter((user) => user.professions.join(',').toLowerCase().includes(filterJob.toLowerCase())).filter((user) => filterMinAge ? user.age >= filterMinAge : true ).filter((user) => filterMaxAge ? user.age <= filterMaxAge : true )

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
                        <div className="data-table-filter">
                          <Form inline>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                              <Input type="text" name="name" id="name" placeholder="Search name" value={filterName}
                                onChange={this.props.updateFilterName} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                              <Input type="text" name="job" id="job" placeholder="Search Job" value={filterJob}
                                onChange={this.props.updateFilterJob} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                              <Input type="number" name="minage" id="minage" placeholder="Min age" value={filterMinAge}
                                onChange={this.props.updateFilterMinAge} />
                            </FormGroup>
                            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                              <Input type="number" name="maxage" id="maxage" placeholder="Max age" value={filterMaxAge}
                                onChange={this.props.updateFilterMaxAge} />
                            </FormGroup>
                          </Form>
                        </div>
                        <GnomesList users={visibleList} />
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
  const { isFetching, lastUpdated, list, filterName, filterMinAge, filterMaxAge, filterJob } = users || {
    isFetching: true,
    list: [],
    filterName: ''
  }
  return {
    list,
    isFetching,
    lastUpdated, 
    filterName,
    filterJob,
    filterMinAge,
    filterMaxAge
  }

}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateFilterName: (e) => dispatch(updateFilterName(e.target.value)),
    updateFilterJob: (e) => dispatch(updateFilterJob(e.target.value)),
    updateFilterMinAge: (e) => dispatch(updateFilterMinAge(e.target.value)),
    updateFilterMaxAge: (e) => dispatch(updateFilterMaxAge(e.target.value)),
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(App)