import * as t from './actionTypes';

const initialState = {
	sitemap: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.SITEMAP_RECEIVE: {
			return {
				...state,
				sitemap: action.data
			};
		}
		default:
			return state;
	}
};
