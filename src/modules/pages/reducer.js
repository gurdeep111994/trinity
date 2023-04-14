import * as t from './actionTypes';

const initialState = {
	pages: [],
	pageEdit: null,
	pageId: null,
	open: false
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.PAGES_RECEIVE:
			return Object.assign({}, state, { pages: action.pages });
		case t.PAGE_RECEIVE:
			return Object.assign({}, state, { pageEdit: action.pageEdit });
		case t.OPEN_MODAL:
			return Object.assign({}, state, { pageId: action.pageId, open: true });
		case t.CLOSE_MODAL:
			return Object.assign({}, state, { pageId: null, open: false });
		default:
			return state;
	}
};
