import * as actionTypes from './actionTypes';

const INTIAL_STATE = {
	servicesSuccess: false,
	servicesError: null,
	servicesData: [],
	createServiceSuccess: false,
	createServiceData: [],
	updateServiceSuccess: false,
	updateServiceData: [],
	deleteServiceSuccess: false,
	deleteServiceData: [],

	locationsSuccess: false,
	locationsError: null,
	locationsData: [],
	updateLocationsSuccess: false,
	updateLocationsData: [],

	servicesExtraSuccess: false,
	servicesExtraError: null,
	servicesExtraData: [],

	availabilitySuccess: false,
	availabilityError: null,
	availabilityData: [],
	createAvailabitySuccess: false,
	createAvailabiltyData: []
};

export default (state = INTIAL_STATE, action) => {
	switch (action.type) {
		case actionTypes.GET_SERVICES_SUCCESS:
			return {
				...INTIAL_STATE,
				servicesSuccess: true,
				servicesData: action.services
			};
		case actionTypes.CREATE_SERVICE_SUCCESS:
			return {
				...state,
				createServiceSuccess: true,
				createServiceData: action.data
			};
		case actionTypes.UPDATE_SERVICE_SUCCESS:
			return {
				...state,
				updateServiceSuccess: true,
				updateServiceData: action.data
			};
		case actionTypes.DELETE_SERVICE_SUCCESS:
			return {
				...state,
				deleteServiceSuccess: true,
				deleteServiceData: action.data
			};
		case actionTypes.GET_LOCATIONS_SUCCESS:
			return {
				...INTIAL_STATE,
				locationsSuccess: true,
				locationsData: action.locations
			};
		case actionTypes.CREATE_LOCATIONS_SUCCESS:
			return {
				...state,
				createLocationSuccess: true,
				createLocationData: action.data
			};
		case actionTypes.DELETE_LOCATION_SUCCESS:
			return {
				...state,
				deleteLocationsSuccess: true,
				deleteLocationsData: action.data
			};
		case actionTypes.UPDATE_LOCATION_SUCCESS:
			return {
				...state,
				updateLocationsSuccess: true,
				updateLocationsData: action.data
			};
		case actionTypes.GET_SERVICES_EXTRA_SUCCESS:
			return {
				...INTIAL_STATE,
				servicesExtraSuccess: true,
				servicesExtraData: action.servicesExtra
			};
		case actionTypes.CREATE_SERVICES_EXTRA_SUCCESS:
			return {
				...state,
				createServiceExtrasSuccess: true,
				createServiceExtrasData: action.data
			};
		case actionTypes.UPDATE_SERVICE_EXTRAS_SUCCESS:
			return {
				...state,
				updateServiceExtrasSuccess: true,
				updateServiceExtrasData: action.data
			};
		case actionTypes.GET_AVAILABILITY_SUCCESS:
			return {
				...INTIAL_STATE,
				availabilitySuccess: true,
				availabilityData: action.availability
			};
		case actionTypes.CREATE_AVAILABILITY_SUCCESS:
			return {
				...state,
				createAvailabitySuccess: true,
				createAvailabityData: action.availability
			};

		case actionTypes.DELETE_SERVICE_EXTRA_SUCCESS:
			return {
				...state,
				deleteServicesExtraSuccess: true,
				deleteServicesExtraData: action.data
			};

		default:
			return state;
	}
};
