import * as actionTypes from './actionTypes';

export const startLoader = () => ({
	type: actionTypes.START_LOADING
});

export const stopLoader = () => ({
	type: actionTypes.STOP_LOADING
});
