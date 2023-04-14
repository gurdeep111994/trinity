import * as actionTypes from './actionTypes';

const INTIAL_STATE = {
	// Bookings
	bookingsSuccess: false,
	bookingsError: null,
	bookingsData: [],
	updateBookingSuccess: false,
	updateBookingData: [],
	updateBookingError: null,

	// Appointments
	appointments: null,
	appointmentsError: null,

	// Appointments Data
	appointmentsData: null,
	appointmentsDataError: null,

	// Treatment
	treatmentCategories: null,
	treatmentCategoriesError: null,

	treatmentData: null,
	treatmentDataError: null,

	treatmentOfCategory: {},
	treatmentOfCategoryError: null,

	// local data
	localDataSpaSuccess: false,
	localDataSpaBooking: null,
	localDataSpaBookingError: null
};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
		// Bookings
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
		// Spa appointments
		case actionTypes.GET_APPOINTMENT_SUCCESS:
			return {
				...state,
				appointments: action.data
			};
		case actionTypes.GET_APPOINTMENT_FAILURE:
			return {
				...state,
				appointmentsError: action.data
			};
		case actionTypes.GET_APPOINTMENT_DATA_SUCCESS:
			return {
				...state,
				appointmentsData: action.data
			};
		case actionTypes.GET_APPOINTMENT_DATA_FAILURE:
			return {
				...state,
				appointmentsDataError: action.data
			};
		case actionTypes.GET_TREATMENT_CATEGORIES_SUCCESS:
			return {
				...state,
				treatmentCategories: action.data
			};
		case actionTypes.GET_TREATMENT_CATEGORIES_FAILURE:
			return {
				...state,
				treatmentCategoriesError: action.data
			};
		case actionTypes.GET_TREATMENT_DATA_SUCCESS:
			return {
				...state,
				treatmentData: action.data
			};
		case actionTypes.GET_TREATMENT_DATA_FAILURE:
			return {
				...state,
				treatmentDataError: action.data
			};
		case actionTypes.GET_TREATMENTS_OF_CATEGORY_SUCCESS:
			return {
				...state,
				treatmentOfCategory: {
					...state.treatmentOfCategory,
					[action.data.Id]: action.data.res
				}
			};
		case actionTypes.GET_TREATMENTS_OF_CATEGORY_FAILURE:
			return {
				...state,
				treatmentOfCategoryError: action.data
			};

		// For Local data
		case actionTypes.FETCH_SPA_LOCAL_BOOKINGS_SUCCESS:
			return {
				...state,
				localDataSpaSuccess: true,
				localDataSpaBooking: action.data
			};
		case actionTypes.FETCH_SPA_LOCAL_BOOKINGS_FAILURE:
			return {
				...state,
				localDataSpaBookingError: action.data
			};

		default:
			return state;
	}
};
