import API from '../../lib/feathersApi';
import * as actionTypes from './actionTypes';
import { stopLoader } from '../../modules/loader/actions';

// Service Actions
export const fetchServices = () => {
	return (dispatch, getState) => {
		return API.FetchServices()
			.then(res => dispatch(fetchServicesSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const fetchServicesSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_SERVICES_SUCCESS,
			services: payload.data
		});
	};
};

export const createService = payload => {
	return (dispatch, getState) => {
		return API.CreateService(payload)
			.then(res => dispatch(createServiceSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const createServiceSuccess = payload => {
	return {
		type: actionTypes.CREATE_SERVICE_SUCCESS,
		data: payload
	};
};

export const deleteService = payload => {
	return (dispatch, getState) => {
		return API.DeleteService(payload)
			.then(res => dispatch(deleteServiceSuccess(res)))
			.catch(err => console.log(err));
	};
};

// Service Extras
export const fetchServiceExtras = () => {
	return (dispatch, getState) => {
		return API.FetchServicesExtra()
			.then(res => dispatch(fetchServicesExtraSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const fetchServicesExtraSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_SERVICES_EXTRA_SUCCESS,
			servicesExtra: payload.data
		});
	};
};

export const createServiceExtras = payload => {
	return (dispatch, getState) => {
		return API.CreateServiceExtras(payload)
			.then(res => dispatch(createServiceExtrasSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const createServiceExtrasSuccess = payload => {
	return {
		type: actionTypes.CREATE_SERVICES_EXTRA_SUCCESS,
		data: payload
	};
};

export const updateServiceExtras = payload => {
	console.log('updateServiceExtras', payload);
	return (dispatch, getState) => {
		return API.UpdateServiceExtras(payload)
			.then(res => dispatch(updateServiceExtrasSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const updateServiceExtrasSuccess = payload => {
	return {
		type: actionTypes.UPDATE_SERVICE_EXTRAS_SUCCESS,
		data: payload
	};
};

// Location Actions
export const fetchLocations = (payload = undefined) => {
	return (dispatch, getState) => {
		return API.FetchLocations(payload)
			.then(res => dispatch(fetchLocationsSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const createLocation = payload => {
	return (dispatch, getState) => {
		return API.CreateLocation(payload)
			.then(res => dispatch(createLocationSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const createLocationSuccess = payload => {
	return {
		type: actionTypes.CREATE_LOCATIONS_SUCCESS,
		data: payload
	};
};

export const deleteLocation = payload => {
	return (dispatch, getState) => {
		return API.DeleteLocation(payload)
			.then(res => dispatch(deleteLocationSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const deleteLocationSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_LOCATION_SUCCESS,
			data: payload
		});
	};
};

export const updateLocation = payload => {
	return (dispatch, getState) => {
		return API.UpdateLocation(payload)
			.then(res => dispatch(updateLocationSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const updateLocationSuccess = payload => {
	return {
		type: actionTypes.UPDATE_LOCATION_SUCCESS,
		data: payload
	};
};

export const updateService = payload => {
	return (dispatch, getState) => {
		return API.UpdateService(payload)
			.then(res => dispatch(updateServiceSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const fetchLocationsSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_LOCATIONS_SUCCESS,
			locations: payload
		});
	};
};

// Availability Actions
export const fetchAvailability = () => {
	return (dispatch, getState) => {
		return API.FetchAvailability()
			.then(res => dispatch(fetchAvailabilitySuccess(res)))
			.catch(err => console.log(err));
	};
};

export const createAvailability = payload => {
	return (dispatch, getState) => {
		return API.CreateAvailability(payload)
			.then(res => dispatch(createAvailabilitySuccess(res)))
			.catch(err => console.log(err));
	};
};

export const fetchAvailabilitySuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.GET_AVAILABILITY_SUCCESS,
			availability: payload.data
		});
	};
};

export const createAvailabilitySuccess = payload => {
	return {
		type: actionTypes.CREATE_AVAILABILITY_SUCCESS,
		data: payload
	};
};

export const updateServiceSuccess = payload => {
	return {
		type: actionTypes.UPDATE_SERVICE_SUCCESS,
		data: payload
	};
};

export const deleteServiceSuccess = payload => {
	return dispatch => {
		dispatch(stopLoader());
		dispatch({
			type: actionTypes.DELETE_SERVICE_SUCCESS,
			data: payload
		});
	};
};

export const deleteServiceExtras = id => {
	return (dispatch, getState) => {
		return API.DeleteServiceExtras(id)
			.then(res => dispatch(deleteServiceExtrasSuccess(res)))
			.catch(err => console.log(err));
	};
};

export const deleteServiceExtrasSuccess = payload => {
	return {
		type: actionTypes.DELETE_SERVICE_EXTRA_SUCCESS,
		data: payload
	};
};
