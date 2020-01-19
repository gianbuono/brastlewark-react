import { combineReducers } from 'redux'
import { fromJS } from 'immutable';

import {
    REQUEST_USERS,
    RECEIVE_USERS
} from './actions'

const initialState = fromJS({
    isFetching: true,
    list: [],
    searchKey: '',
});

function users(
    state = initialState,
    action
) {
    switch (action.type) {
        case REQUEST_USERS:
            return state.set('isFetching', true);
        case RECEIVE_USERS:
            return state.set('isFetching', false)
                .set('list', action.users)
                .set('lastUpdated', action.receivedAt)
        default:
            return state
    }
}
// function bw(state = {}, action) {
//     switch (action.type) {
//         case RECEIVE_USERS:
//         case REQUEST_USERS:
//             return Object.assign({}, state,
//                 users(state.users, action)
//             )
//         default:
//             return state
//     }
// }
const rootReducer = combineReducers({
    users
})
export default rootReducer