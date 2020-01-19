import { createSelector } from 'reselect';

/**
 * Direct selector to the contacts state domain
 */
const selectorUsers = state => state.bw.state.users

// const getKeyword = (state) => state.get('contacts').get('searchKey')

export {
    selectorUsers,
};