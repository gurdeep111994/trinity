import * as actionTypes from './actionTypes';

const INTIAL_STATE = {
	// Classes
	classesSuccess: false,
	classesData: [],
	classesError: null,

	// local data
	localDataSuccess: false,
	localDataBooking: null,
	localDataBookingError: null
};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.GET_CLASSES_SUCCESS:
			return {
				...state,
				classesSuccess: true,
				classesData: action.data
			};
		//Bookings
		case actionTypes.GET_BOOKINGS_SUCCESS:
			return {
				...state,
				bookingsSuccess: true,
				bookingsData: action.data,
				updateBookingSuccess: false,
				bookingsError: null
			};

		case actionTypes.GET_BOOKINGS_FAILURE:
			return {
				...state,
				bookingsError: action.data
			};

		case actionTypes.UPDATE_BOOKING_SUCCESS:
			return {
				...state,
				updateBookingSuccess: true,
				updateBookingData: action.data
			};

		case actionTypes.UPDATE_BOOKING_FAILURE:
			return {
				...state,
				bookingsError: action.data
			};
		// For Local data
		case actionTypes.FETCH_LOCAL_BOOKINGS_SUCCESS:
			return {
				...state,
				localDataSuccess: true,
				localDataBooking: action.data
			};
		case actionTypes.FETCH_LOCAL_BOOKINGS_FAILURE:
			return {
				...state,
				localDataBookingError: action.data
			};

		case actionTypes.GET_PERSONAL_TRAINERS_BOOKING_SUCCESS:
			return {
				...state,
				personalTrainerBookingsSuccess: true,
				personalTrainerBookingsData: action.data
			};

		case actionTypes.GET_PERSONAL_TRAINERS_SUCCESS:
			return {
				...state,
				personalTrainersSuccess: true,
				personalTrainersData: action.data
			};
		default:
			return state;
	}
};
