import { getEnv, productDesignerApiUrl } from 'lib/settings';
import api from 'lib/api';
import * as t from './actionTypes';

// Get all Product Types
export const getProductTypes = () => dispatch => {
	fetch(`${getEnv(productDesignerApiUrl)}/product-types`, {
		method: 'GET'
	})
		.then(res => res.json())
		.then(response => {
			dispatch({ type: t.PRODUCT_TYPES_LIST, data: response });
		})
		.catch(err => {
			throw err;
		});
};

// Goto POD product page
export const gotoPodProductPage = history => dispatch => {
	dispatch({ type: t.GOTO_POD_PRODUCT_PAGE, data: {} });
	history.push('/pod-product');
};

// Create POD product
export const createPodProduct = (podProductData, history) => dispatch => {
	return (
		api.products
			.createPod(podProductData)
			// eslint-disable-next-line no-unused-vars
			.then(({ status, json }) => {
				dispatch({ type: t.CREATE_POD_PRODUCT, data: json });
				history.push(`/product/${json.id}`);
			})
			// eslint-disable-next-line no-unused-vars
			.catch(err => {})
	);
};
