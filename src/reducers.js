import { combineReducers } from 'redux'
import {
    REQUEST_USERS,
    RECEIVE_USERS
} from './actions'


function users(
    state = {
        isFetching: true,
        users: []
    },
    action
) {
    switch (action.type) {
        case REQUEST_USERS:
            return Object.assign({}, state, {
                isFetching: true,
            })
        case RECEIVE_USERS:
            return Object.assign({}, state, {
                isFetching: false,
                users: action.users,
                lastUpdated: action.receivedAt
            })
        default:
            return state
    }
}
function bw(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
        case REQUEST_USERS:
            return Object.assign({}, state, {
               state: users(state.users, action)
            })
        default:
            return state
    }
}
const rootReducer = combineReducers({
    bw
})
export default rootReducer