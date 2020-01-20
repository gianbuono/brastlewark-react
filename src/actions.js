import fetch from 'cross-fetch'
export const REQUEST_USERS = 'REQUEST_USERS'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_FILTER_NAME = 'UPDATE_FILTER_NAME'
export const UPDATE_FILTER_JOB = 'UPDATE_FILTER_JOB'
export const UPDATE_FILTER_MIN_AGE = 'UPDATE_FILTER_MIN_AGE'
export const UPDATE_FILTER_MAX_AGE = 'UPDATE_FILTER_MAX_AGE'

function requestUsers() {
    return {
        type: REQUEST_USERS
    }
}
function receiveUsers(json) {
    return {
        type: RECEIVE_USERS,
        users: json.Brastlewark.map(user => user),
        receivedAt: Date.now()
    }
}

export function fetchUsers() {
    return dispatch => {
        dispatch(requestUsers())
        return fetch(process.env.REACT_APP_BRASTELWARK_CENSUS_DATA)
            .then(response => response.json())
            .then(json => dispatch(receiveUsers(json)))
    }
}

function shouldFetchUsers(state) {
    const users = state.brastelwark.users
    console.log(users)
    if (!users) {
        return true
    } else if (state.brastelwark.isFetching) {
        return false
    }
}
export function fetchPostsIfNeeded() {
    return (dispatch, getState) => {
        if (shouldFetchUsers(getState())) {
            return dispatch(fetchUsers())
        }
    }
}

export function updateFilterName(key) {
    return {
        type: UPDATE_FILTER_NAME,
        data: key,
    };
}

export function updateFilterJob(key) {
    return {
        type: UPDATE_FILTER_JOB,
        data: key,
    };
}

export function updateFilterMinAge(key) {
    return {
        type: UPDATE_FILTER_MIN_AGE,
        data: key,
    };
}

export function updateFilterMaxAge(key) {
    return {
        type: UPDATE_FILTER_MAX_AGE,
        data: key,
    };
}