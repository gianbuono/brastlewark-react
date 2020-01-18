import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  fetchUsers
} from './actions'

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
    const { users, isFetching, lastUpdated } = this.props
    return (
      <div>
        <p>
        <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {JSON.stringify(this.props)}
          </div>
          {lastUpdated && (
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.{' '}
            </span>
          )}
          {!isFetching && (
            <button onClick={this.handleRefreshClick}>Refresh</button>
          )}
        </p>
        {isFetching && users.length === 0 && <h2>Loading...</h2>}
        {!isFetching && users.length === 0 && <h2>Empty.</h2>}
        {users.length > 0 && (
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            {JSON.stringify(this.props)}
          </div>
        )}
      </div>
    )
  }
}
App.propTypes = {
  users: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}
function mapStateToProps(state) {
  const { bw } = state
  const { isFetching, lastUpdated, users } = bw.state || {
    isFetching: true,
    users: []
  }

  return {
    users,
    isFetching,
    lastUpdated
  }

}
export default connect(mapStateToProps)(App)