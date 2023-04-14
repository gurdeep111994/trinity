import messages from './text';
import { updateAbility } from './ability';
import jwt from 'jsonwebtoken';
const LOGIN_PATH = '/login';
const HOME_PATH = '/';
let kToken = localStorage.getItem('authToken') || '';
let keycloak = null;
const getParameterByName = (name, url) => {
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
	const results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export const validateCurrentToken = () => {
	if (location.pathname !== LOGIN_PATH) {
		if (!isCurrentTokenValid()) {
			location.replace(LOGIN_PATH);
		}
	}
};

export const checkTokenFromUrl = () => {
	if (location.pathname === LOGIN_PATH) {
		const token = getParameterByName('token');
		if (token && token !== '') {
			const tokenData = parseJWT(token);

			if (tokenData) {
				const expiration_date = tokenData.exp * 1000;
				if (expiration_date > Date.now()) {
					saveToken({ token, email: tokenData.email, expiration_date });
					location.replace(HOME_PATH);
				} else {
					alert(messages.tokenExpired);
				}
			} else {
				alert(messages.tokenInvalid);
			}
		} else if (isCurrentTokenValid()) {
			location.replace(HOME_PATH);
		}
	}
};

const parseJWT = jwt => {
	try {
		const payload = jwt.split('.')[1];
		const tokenData = JSON.parse(atob(payload));
		return tokenData;
	} catch (e) {
		return null;
	}
};

export const saveToken = data => {
	const { token, email, expiration_date } = data;
	localStorage.setItem('dashboard_token', token);
	localStorage.setItem('dashboard_email', email);
	localStorage.setItem('dashboard_exp', expiration_date);
};

const isCurrentTokenValid = () => {
	if (kToken) {
		const { exp } = jwt.decode(kToken);
		const tokenDate = new Date(exp * 1000);
		return tokenDate > Date.now();
	} else {
		const token = localStorage.getItem('dashboard_token');
		const expiration_date = localStorage.getItem('dashboard_exp');
		return token && expiration_date && expiration_date > Date.now();
	}
};

export const removeToken = () => {
	localStorage.removeItem('dashboard_token');
	localStorage.removeItem('dashboard_email');
	localStorage.removeItem('dashboard_exp');
	localStorage.removeItem('webstore_token');
	localStorage.removeItem('webstore_email');
	localStorage.removeItem('webstore_exp');
	location.replace(LOGIN_PATH);
};

export const removeAuthToken = () => {
	localStorage.removeItem('authToken');
	localStorage.clear();
	kToken = '';
};

export const processToken = token => {
	if (kToken !== token) {
		kToken = token;
		localStorage.setItem('authToken', kToken);
		updateAbility();
	}
};
export const setKeyCloak = val => {
	keycloak = val;
};
