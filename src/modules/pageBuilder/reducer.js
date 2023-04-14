import * as t from './actionTypes';

const initialState = {
	storeIndexes: []
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.STORE_INDEXES_RECEIVE: {
			return {
				...state,
				storeIndexes: action.data
			};
		}
		default:
			return state;
	}
};
