import * as t from './actionTypes';

const initialState = {
	productTypesList: [],
	podProduct: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.PRODUCT_TYPES_LIST: {
			return {
				...state,
				productTypesList: action.data
			};
		}
		case t.GOTO_POD_PRODUCT_PAGE: {
			return {
				...state
			};
		}
		case t.CREATE_POD_PRODUCT: {
			return {
				...state
			};
		}
		default:
			return state;
	}
};
