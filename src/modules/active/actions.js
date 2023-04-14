import API from '../../lib/feathersApi';
import * as actionTypes from './actionTypes';
import { stopLoader } from '../loader/actions';

// Fetch local data for bookings
export const fetchLocalBookings = () => {
	return (dispatch, getState) => {
		return API.FetchActiveBookingsLocal()
			.then(res => dispatch(fetchLocalBookingsSuccess(res.data)))
			.catch(err => {
				console.log(err);
				dispatch(fetchLocalBookingsFailure(err));
			});
	};
};

export const fetchLocalBookingsSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.FETCH_LOCAL_BOOKINGS_SUCCESS,
			data: payload
		});
	};
};
export const fetchLocalBookingsFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.FETCH_LOCAL_BOOKINGS_FAILURE,
			error: error
		});
	};
};

// End Fetch local data

//*
//*
//*

// Classes Actions
export const fetchClasses = () => {
	return (dispatch, getState) => {
		return API.FetchClasses()
			.then(res => dispatch(fetchClassesSuccess(res.Classes)))
			.catch(err => {
				console.log(err);
				dispatch(fetchClassesFailure(err));
			});
	};
};

export const fetchClassesSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_CLASSES_SUCCESS,
			data: payload
		});
	};
};
export const fetchClassesFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_CLASSES_FAILURE,
			error: error
		});
	};
};

// Booking Actions
export const fetchBookings = () => {
	return (dispatch, getState) => {
		return API.FetchBookings()
			.then(res => dispatch(fetchBookingsSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchBookingsFailure(err));
			});
	};
};
export const fetchBookingsSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_BOOKINGS_SUCCESS,
			data: payload.data
		});
	};
};
export const fetchBookingsFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_BOOKINGS_FAILURE,
			error: error
		});
	};
};

// Personal trainers bookings Actions
export const fetchPersonalTrainerBookings = () => {
	return (dispatch, getState) => {
		return API.FetchPersonalTrainerBookings()
			.then(res => dispatch(fetchPersonalTrainerBookingsSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchPersonalTrainerBookingsFailure(err));
			});
	};
};

export const fetchPersonalTrainerBookingsSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_PERSONAL_TRAINERS_BOOKING_SUCCESS,
			data: payload
		});
	};
};

export const fetchPersonalTrainerBookingsFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_PERSONAL_TRAINERS_BOOKING_FAILURE,
			error: error
		});
	};
};

// Personal trainers Actions
export const fetchPersonalTrainer = () => {
	return (dispatch, getState) => {
		return API.FetchPersonalTrainer()
			.then(res => {
				dispatch(stopLoader());
				dispatch({
					type: actionTypes.GET_PERSONAL_TRAINERS_SUCCESS,
					data: res.data
				});
			})
			.catch(err => {
				dispatch(stopLoader());
				dispatch({
					type: actionTypes.GET_PERSONAL_TRAINERS_FAILURE,
					error: err
				});
			});
	};
};
