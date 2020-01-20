import { combineReducers } from 'redux'
import { fromJS } from 'immutable';

import {
    REQUEST_USERS,
    RECEIVE_USERS,
    UPDATE_FILTER_NAME,
    UPDATE_FILTER_JOB,
    UPDATE_FILTER_MIN_AGE,
    UPDATE_FILTER_MAX_AGE
} from './actions'

const initialState = fromJS({
    isFetching: true,
    list: [],
    filterName: '',
    filterJob: ''
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
        case UPDATE_FILTER_NAME:
            return state.set('filterName', action.data);
        case UPDATE_FILTER_JOB:
            return state.set('filterJob', action.data);
        case UPDATE_FILTER_MIN_AGE:
            return state.set('filterMinAge', Number(action.data) > 0 ? Number(action.data) : undefined);
        case UPDATE_FILTER_MAX_AGE:
            return state.set('filterMaxAge', Number(action.data) > 0 ? Number(action.data) : undefined);
        default:
            return state
    }
}

const rootReducer = combineReducers({
    users
})
export default rootReducer