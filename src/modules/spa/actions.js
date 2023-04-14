import API from '../../lib/feathersApi';
import * as actionTypes from './actionTypes';
import { stopLoader } from '../../modules/loader/actions';

// Fetch local data for bookings
export const fetchSpaLocalBookings = () => {
	return (dispatch, getState) => {
		return API.FetchSpaBookingsLocal()
			.then(res => dispatch(fetchSpaLocalBookingsSuccess(res.data)))
			.catch(err => {
				console.log(err);
				dispatch(fetchSpaLocalBookingsFailure(err));
			});
	};
};

export const fetchSpaLocalBookingsSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.FETCH_SPA_LOCAL_BOOKINGS_SUCCESS,
			data: payload
		});
	};
};
export const fetchSpaLocalBookingsFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.FETCH_SPA_LOCAL_BOOKINGS_FAILURE,
			error: error
		});
	};
};

// End Fetch local data

//*
//*
//*

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
// export const updateBooking = payload => {
// 	return (dispatch, getState) => {
// 		return API.UpdateBooking(payload)
// 			.then(res => dispatch(updateBookingSuccess(res)))
// 			.catch(err => {
// 				console.log(err);
// 				dispatch(updateBookingFailure(err));
// 			});
// 	};
// };
// export const updateBookingSuccess = payload => {
// 	return {
// 		type: actionTypes.UPDATE_BOOKING_SUCCESS,
// 		data: payload
// 	};
// };
// export const updateBookingFailure = error => {
// 	return dispatch => {
// 		dispatch(stopLoader());
// 		dispatch({
// 			type: actionTypes.UPDATE_BOOKING_FAILURE,
// 			error: error
// 		});
// 	};
// };

// SPA Booking Categories
export const fetchAppointment = () => {
	return (dispatch, getState) => {
		return API.FetchAppointment()
			.then(res => dispatch(fetchAppointmentSuccess(res.Programs)))
			.catch(err => {
				console.log(err);
				dispatch(fetchAppointmentFailure(err));
			});
	};
};

export const fetchAppointmentSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_APPOINTMENT_SUCCESS,
			data: payload
		});
	};
};
export const fetchAppointmentFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_APPOINTMENT_FAILURE,
			error: error
		});
	};
};

// SPA Booking Appointments data
export const fetchAppointmentsData = () => {
	return (dispatch, getState) => {
		return API.FetchAppointmentsData()
			.then(res => dispatch(fetchAppointmentsDataSuccess(res.Appointments)))
			.catch(err => {
				console.log(err);
				dispatch(fetchAppointmentsDataFailure(err));
			});
	};
};

export const fetchAppointmentsDataSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_APPOINTMENT_DATA_SUCCESS,
			data: payload
		});
	};
};
export const fetchAppointmentsDataFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_APPOINTMENT_DATA_FAILURE,
			error: error
		});
	};
};

// export const updateBooking = payload => {
// 	return (dispatch, getState) => {
// 		return API.UpdateBooking(payload)
// 			.then(res => dispatch(updateAppointmentSuccess(res)))
// 			.catch(err => {
// 				console.log(err);
// 				dispatch(updateBookingFailure(err));
// 			});
// 	};
// };
// export const updateAppointmentSuccess = payload => {
// 	return {
// 		type: actionTypes.UPDATE_BOOKING_SUCCESS,
// 		data: payload
// 	};
// };
// export const updateBookingFailure = error => {
// 	return dispatch => {
// 		dispatch(stopLoader());
// 		dispatch({
// 			type: actionTypes.UPDATE_BOOKING_FAILURE,
// 			error: error
// 		});
// 	};
// };

// Fetch treatment categories

export const fetchTreatmentCategories = () => {
	return (dispatch, getState) => {
		return API.FetchTreatmentCategories()
			.then(res => dispatch(fetchTreatmentCategoriesSuccess(res.Programs)))
			.catch(err => {
				console.log(err);
				dispatch(fetchTreatmentCategoriesFailure(err));
			});
	};
};

export const fetchTreatmentCategoriesSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TREATMENT_CATEGORIES_SUCCESS,
			data: payload
		});
	};
};
export const fetchTreatmentCategoriesFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TREATMENT_CATEGORIES_FAILURE,
			error: error
		});
	};
};

export const fetchTreatmentData = () => {
	return (dispatch, getState) => {
		return API.FetchTreatmentData()
			.then(res => dispatch(fetchTreatmentDataSuccess(res)))
			.catch(err => {
				console.log(err);
				dispatch(fetchTreatmentDataFailure(err));
			});
	};
};

export const fetchTreatmentDataSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TREATMENT_DATA_SUCCESS,
			data: payload
		});
	};
};
export const fetchTreatmentDataFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TREATMENT_DATA_FAILURE,
			error: error
		});
	};
};

export const fetchTreatmentsOfCategory = programId => {
	return (dispatch, getState) => {
		return API.FetchTreatmentsOfCategory(programId)
			.then(res =>
				dispatch(
					fetchTreatmentsOfCategorySuccess({
						res: res.SessionTypes,
						Id: programId
					})
				)
			)
			.catch(err => {
				console.log(err);
				dispatch(fetchTreatmentsOfCategoryFailure(err));
			});
	};
};

export const fetchTreatmentsOfCategorySuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TREATMENTS_OF_CATEGORY_SUCCESS,
			data: payload
		});
	};
};
export const fetchTreatmentsOfCategoryFailure = error => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_TREATMENTS_OF_CATEGORY_FAILURE,
			error: error
		});
	};
};
