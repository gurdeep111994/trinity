import API from '../../lib/feathersApi';
import * as actionTypes from './actionTypes';
import { stopLoader } from '../../modules/loader/actions';

// Restaurant Actions
export const fetchRestaurants = () => {
	return (dispatch, getState) => {
		return API.FetchRestaurants()
			.then(res => dispatch(fetchRestaurantsSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchRestaurantsFailure(err));
			});
	};
};
export const fetchRestaurantsSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_RESTAURANTS_SUCCESS,
			data: payload.data
		});
	};
};
export const fetchRestaurantsFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_RESTAURANTS_FAILURE,
			error: error
		});
	};
};
export const createRestaurant = payload => {
	return (dispatch, getState) => {
		return API.CreateRestaurant(payload)
			.then(res => dispatch(createRestaurantSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(createRestaurantFailure(err));
			});
	};
};
export const createRestaurantSuccess = payload => {
	return {
		type: actionTypes.CREATE_RESTAURANT_SUCCESS,
		data: payload
	};
};
export const createRestaurantFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.CREATE_RESTAURANT_FAILURE,
			error: error
		});
	};
};
export const updateRestaurant = payload => {
	return (dispatch, getState) => {
		return API.UpdateRestaurant(payload)
			.then(res => dispatch(updateRestaurantSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(updateRestaurantFailure(err));
			});
	};
};
export const updateRestaurantSuccess = payload => {
	return {
		type: actionTypes.UPDATE_RESTAURANT_SUCCESS,
		data: payload
	};
};
export const updateRestaurantFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.UPDATE_RESTAURANT_FAILURE,
			error: error
		});
	};
};
export const deleteRestaurant = payload => {
	return (dispatch, getState) => {
		return API.DeleteRestaurant(payload)
			.then(res => dispatch(deleteRestaurantSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(deleteRestaurantFailure(err));
			});
	};
};
export const deleteRestaurantSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_RESTAURANT_SUCCESS,
			data: payload
		});
	};
};
export const deleteRestaurantFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_RESTAURANT_FAILURE,
			error: error
		});
	};
};

// Tables Actions
export const fetchTables = () => {
	return (dispatch, getState) => {
		return API.FetchTables()
			.then(res => dispatch(fetchTablesSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchTablesFailure(err));
			});
	};
};
export const fetchTablesSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TABLES_SUCCESS,
			data: payload.data
		});
	};
};
export const fetchTablesFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TABLES_FAILURE,
			error: error
		});
	};
};
export const createTable = payload => {
	return (dispatch, getState) => {
		return API.CreateTable(payload)
			.then(res => dispatch(createTableSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(createTableFailure(err));
			});
	};
};
export const createTableSuccess = payload => {
	return {
		type: actionTypes.CREATE_TABLE_SUCCESS,
		data: payload
	};
};
export const createTableFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.CREATE_TABLE_FAILURE,
			error: error
		});
	};
};
export const updateTable = payload => {
	return (dispatch, getState) => {
		return API.UpdateTable(payload)
			.then(res => dispatch(updateTableSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(updateTableFailure(err));
			});
	};
};
export const updateTableSuccess = payload => {
	return {
		type: actionTypes.UPDATE_TABLE_SUCCESS,
		data: payload
	};
};
export const updateTableFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.UPDATE_TABLE_FAILURE,
			error: error
		});
	};
};
export const deleteTable = payload => {
	return (dispatch, getState) => {
		return API.DeleteTable(payload)
			.then(res => dispatch(deleteTableSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(deleteTableFailure(err));
			});
	};
};
export const deleteTableSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_TABLE_SUCCESS,
			data: payload
		});
	};
};
export const deleteTableFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_TABLE_FAILURE,
			error: error
		});
	};
};

// TimeSlots Actions
export const fetchTimeSlots = () => {
	return (dispatch, getState) => {
		return API.FetchTimeSlots()
			.then(res => dispatch(fetchTimeSlotsSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchTimeSlotsFailure(err));
			});
	};
};
export const fetchTimeSlotsSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TIMESLOTS_SUCCESS,
			data: payload.data
		});
	};
};
export const fetchTimeSlotsFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TIMESLOTS_FAILURE,
			error: error
		});
	};
};
export const createTimeSlot = payload => {
	return (dispatch, getState) => {
		return API.CreateTimeSlot(payload)
			.then(res => dispatch(createTimeSlotSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(createTimeSlotFailure(err));
			});
	};
};
export const createTimeSlotSuccess = payload => {
	return {
		type: actionTypes.CREATE_TIMESLOT_SUCCESS,
		data: payload
	};
};
export const createTimeSlotFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.CREATE_TIMESLOT_FAILURE,
			error: error
		});
	};
};
export const updateTimeSlot = payload => {
	return (dispatch, getState) => {
		return API.UpdateTimeSlot(payload)
			.then(res => dispatch(updateTimeSlotSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(updateTimeSlotFailure(err));
			});
	};
};
export const updateTimeSlotSuccess = payload => {
	return {
		type: actionTypes.UPDATE_TIMESLOT_SUCCESS,
		data: payload
	};
};
export const updateTimeSlotFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.UPDATE_TIMESLOT_FAILURE,
			error: error
		});
	};
};
export const deleteTimeSlot = payload => {
	return (dispatch, getState) => {
		return API.DeleteTimeSlot(payload)
			.then(res => dispatch(deleteTimeSlotSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(deleteTimeSlotFailure(err));
			});
	};
};
export const deleteTimeSlotSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_TIMESLOT_SUCCESS,
			data: payload
		});
	};
};
export const deleteTimeSlotFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_TIMESLOT_FAILURE,
			error: error
		});
	};
};

// TimeSlots Actions
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

export const fetchBookingsByStatus = () => {
	return (dispatch, getState) => {
		return API.FetchBookingsByStatus()
			.then(res => dispatch(fetchBookingsByStatusSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchBookingsByStatusFailure(err));
			});
	};
};
export const fetchBookingsByStatusSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_BOOKINGS_BY_STATUS_SUCCESS,
			data: payload.data
		});
	};
};
export const fetchBookingsByStatusFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_BOOKINGS_BY_STATUS_FAILURE,
			error: error
		});
	};
};

//Requests
export const fetchRequestsByStatus = () => {
	return (dispatch, getState) => {
		return API.FetchRequestsByStatus()
			.then(res => dispatch(fetchRequestsByStatusSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchRequestsByStatusFailure(err));
			});
	};
};
export const fetchRequestsByStatusSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_REQUESTS_BY_STATUS_SUCCESS,
			data: payload.data
		});
	};
};
export const fetchRequestsByStatusFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_REQUESTS_BY_STATUS_FAILURE,
			error: error
		});
	};
};

export const updateBooking = payload => {
	return (dispatch, getState) => {
		return API.UpdateBooking(payload)
			.then(res => {
				if (res.code !== 200) {
					dispatch(updateBookingFailure(res));
				}
				if (res.id) {
					dispatch(updateBookingSuccess(res));
				}
			})
			.catch(err => {
				console.log('error', err);
				dispatch(updateBookingFailure(err));
			});
	};
};
export const updateBookingSuccess = payload => {
	return {
		type: actionTypes.UPDATE_BOOKING_SUCCESS,
		data: payload
	};
};
export const updateBookingFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.UPDATE_BOOKING_FAILURE,
			error: error
		});
	};
};
