import * as actionTypes from './actionTypes';

const INTIAL_STATE = {
	restaurantsSuccess: false,
	restaurantsError: null,
	restaurantsData: [],
	createRestaurantSuccess: false,
	createRestaurantData: [],
	createRestaurantError: null,
	updateRestaurantSuccess: false,
	updateRestaurantData: [],
	updateRestaurantError: null,
	deleteRestaurantSuccess: false,

	// Tables
	tablesSuccess: false,
	tablesError: null,
	tablesData: [],
	createTableSuccess: false,
	createTableData: [],
	createTableError: null,
	updateTableSuccess: false,
	updateTableData: [],
	updateTableError: null,
	deleteTableSuccess: false,

	// Time slots
	timeSlotsSuccess: false,
	timeSlotsError: null,
	timeSlotsData: [],
	createTimeSlotSuccess: false,
	createTimeSlotData: [],
	createTimeSlotError: null,
	updateTimeSlotSuccess: false,
	updateTimeSlotData: [],
	updateTimeSlotError: null,
	deleteTimeSlotSuccess: false,

	// Bookings
	bookingsSuccess: false,
	bookingsError: null,
	bookingsData: [],
	updateBookingSuccess: false,
	updateBookingData: [],
	updateBookingError: null,

	bookingsByStatusSuccess: false,
	bookingsByStatusData: [],
	bookingsByStatusError: null,

	//Requests
	requestsByStatusSuccess: false,
	requestsByStatusData: [],
	requestsByStatusError: null
};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.GET_RESTAURANTS_SUCCESS:
			return {
				...state,
				restaurantsSuccess: true,
				restaurantsData: action.data,
				createRestaurantSuccess: false,
				updateRestaurantSuccess: false,
				deleteRestaurantSuccess: false,
				restaurantsError: null
			};

		case actionTypes.GET_RESTAURANTS_FAILURE:
			return {
				...state,
				restaurantsError: action.data
			};

		case actionTypes.CREATE_RESTAURANT_SUCCESS:
			return {
				...state,
				createRestaurantSuccess: true,
				createRestaurantData: action.data
			};
		case actionTypes.CREATE_RESTAURANT_FAILURE:
			return {
				...state,
				restaurantsError: action.data
			};
		case actionTypes.UPDATE_RESTAURANT_SUCCESS:
			return {
				...state,
				updateRestaurantSuccess: true,
				updateRestaurantData: action.data
			};

		case actionTypes.UPDATE_RESTAURANT_FAILURE:
			return {
				...state,
				restaurantsError: action.data
			};
		case actionTypes.DELETE_RESTAURANT_SUCCESS:
			return {
				...state,
				deleteRestaurantSuccess: true,
				deleteRestaurantData: action.data
			};
		case actionTypes.DELETE_RESTAURANT_FAILURE:
			return {
				...state,
				restaurantsError: action.data
			};

		// Tables
		case actionTypes.GET_TABLES_SUCCESS:
			return {
				...state,
				tablesSuccess: true,
				tablesData: action.data,
				createTableSuccess: false,
				updateTableSuccess: false,
				deleteTableSuccess: false,
				tablesError: null
			};

		case actionTypes.GET_TABLES_FAILURE:
			return {
				...state,
				tablesError: action.data
			};

		case actionTypes.CREATE_TABLE_SUCCESS:
			return {
				...state,
				createTableSuccess: true,
				createTableData: action.data
			};
		case actionTypes.CREATE_TABLE_FAILURE:
			return {
				...state,
				tablesError: action.data
			};
		case actionTypes.UPDATE_TABLE_SUCCESS:
			return {
				...state,
				updateTableSuccess: true,
				updateTableData: action.data
			};

		case actionTypes.UPDATE_TABLE_FAILURE:
			return {
				...state,
				tablesError: action.data
			};
		case actionTypes.DELETE_TABLE_SUCCESS:
			return {
				...state,
				deleteTableSuccess: true,
				deleteTableData: action.data
			};
		case actionTypes.DELETE_TABLE_FAILURE:
			return {
				...state,
				tablesError: action.data
			};

		// Time Slots
		case actionTypes.GET_TIMESLOTS_SUCCESS:
			return {
				...state,
				timeSlotsSuccess: true,
				timeSlotsData: action.data,
				createTimeSlotSuccess: false,
				updateTimeSlotSuccess: false,
				deleteTimeSlotSuccess: false,
				timeSlotsError: null
			};

		case actionTypes.GET_TIMESLOTS_FAILURE:
			return {
				...state,
				timeSlotsError: action.data
			};

		case actionTypes.CREATE_TIMESLOT_SUCCESS:
			return {
				...state,
				createTimeSlotSuccess: true,
				createTimeSlotData: action.data
			};
		case actionTypes.CREATE_TABLE_FAILURE:
			return {
				...state,
				timeSlotsError: action.data
			};
		case actionTypes.UPDATE_TIMESLOT_SUCCESS:
			return {
				...state,
				updateTimeSlotSuccess: true,
				updateTimeSlotData: action.data
			};

		case actionTypes.UPDATE_TIMESLOT_FAILURE:
			return {
				...state,
				timeSlotsError: action.data
			};
		case actionTypes.DELETE_TIMESLOT_SUCCESS:
			return {
				...state,
				deleteTimeSlotSuccess: true,
				deleteTimeSlotData: action.data
			};
		case actionTypes.DELETE_TIMESLOT_FAILURE:
			return {
				...state,
				timeSlotsError: action.data
			};

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

		case actionTypes.GET_BOOKINGS_BY_STATUS_SUCCESS:
			return {
				...state,
				bookingsByStatusSuccess: true,
				bookingsByStatusData: action.data,
				updateBookingSuccess: false,
				bookingsByStatusError: null
			};

		case actionTypes.GET_BOOKINGS_BY_STATUS_FAILURE:
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

		// Requests
		case actionTypes.GET_REQUESTS_BY_STATUS_SUCCESS:
			return {
				...state,
				requestsByStatusSuccess: true,
				requestsByStatusData: action.data,
				updateBookingSuccess: false,
				bookingsByStatusError: null
			};

		case actionTypes.GET_REQUESTS_BY_STATUS_FAILURE:
			return {
				...state,
				bookingsError: action.data
			};

		default:
			return state;
	}
};
