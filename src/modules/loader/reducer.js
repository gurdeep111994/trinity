import * as actionTypes from './actionTypes';

const INTIAL_STATE = {
	loading: false
};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.START_LOADING:
			return { loading: true };

		case actionTypes.STOP_LOADING:
			return { loading: false };

		default:
			return state;
	}
};
