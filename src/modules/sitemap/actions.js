import api from 'lib/api';
import * as t from './actionTypes';

// Get store indexes
// eslint-disable-next-line import/prefer-default-export
export const fetchSitemap = () => dispatch =>
	api.sitemap
		.list()
		.then(({ json }) => {
			dispatch({ type: t.SITEMAP_RECEIVE, data: json });
		})
		.catch(err => {
			throw err;
		});
