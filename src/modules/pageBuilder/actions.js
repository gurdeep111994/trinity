import api from 'lib/api';
import * as t from './actionTypes';

// Get store indexes
// eslint-disable-next-line import/prefer-default-export
export const fetchStoreIndexes = () => dispatch =>
	api.visualMerchandiser
		.listIndexes()
		.then(({ json }) => {
			dispatch({ type: t.STORE_INDEXES_RECEIVE, data: json });
		})
		.catch(err => {
			throw err;
		});
