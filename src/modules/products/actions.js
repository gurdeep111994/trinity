import api from 'lib/api';
import messages from 'lib/text';
import moment from 'moment';
import * as t from './actionTypes';
import { apiBaseUrl, getEnv } from 'lib/settings';
import axios from 'axios';

function requestProduct() {
	return {
		type: t.PRODUCT_DETAIL_REQUEST
	};
}

function receiveProduct(item) {
	return {
		type: t.PRODUCT_DETAIL_RECEIVE,
		item
	};
}

function receiveProductError(error) {
	return {
		type: t.PRODUCT_DETAIL_FAILURE,
		error
	};
}

function receiveImages(images) {
	return {
		type: t.PRODUCT_IMAGES_RECEIVE,
		images
	};
}

function receiveVariants(variants) {
	return {
		type: t.PRODUCT_VARIANTS_RECEIVE,
		variants
	};
}

function receiveOptions(options) {
	return {
		type: t.PRODUCT_OPTIONS_RECEIVE,
		options
	};
}

export function cancelProductEdit() {
	return {
		type: t.PRODUCT_DETAIL_ERASE
	};
}

function requestProducts() {
	return {
		type: t.PRODUCTS_REQUEST
	};
}

function requestMoreProducts() {
	return {
		type: t.PRODUCTS_MORE_REQUEST
	};
}

function receiveProductsMore({ has_more, total_count, data }) {
	return {
		type: t.PRODUCTS_MORE_RECEIVE,
		has_more,
		total_count,
		data
	};
}

function receiveProducts({ has_more, total_count, data }) {
	return {
		type: t.PRODUCTS_RECEIVE,
		has_more,
		total_count,
		data
	};
}

function receiveProductsError(error) {
	return {
		type: t.PRODUCTS_FAILURE,
		error
	};
}

export function selectProduct(id) {
	return {
		type: t.PRODUCTS_SELECT,
		productId: id
	};
}

export function deselectProduct(id) {
	return {
		type: t.PRODUCTS_DESELECT,
		productId: id
	};
}

export function deselectAllProduct() {
	return {
		type: t.PRODUCTS_DESELECT_ALL
	};
}

export function selectAllProduct() {
	return {
		type: t.PRODUCTS_SELECT_ALL
	};
}

export function setFilter(filter) {
	return {
		type: t.PRODUCTS_SET_FILTER,
		filter
	};
}

function deleteProductsSuccess() {
	return {
		type: t.PRODUCT_DELETE_SUCCESS
	};
}

function setCategorySuccess() {
	return {
		type: t.PRODUCT_SET_CATEGORY_SUCCESS
	};
}

function requestUpdateProduct() {
	return {
		type: t.PRODUCT_UPDATE_REQUEST
	};
}

function receiveUpdateProduct(item) {
	return {
		type: t.PRODUCT_UPDATE_SUCCESS,
		item
	};
}

function errorUpdateProduct(error) {
	return {
		type: t.PRODUCT_UPDATE_FAILURE,
		error
	};
}

function successCreateProduct(id) {
	return {
		type: t.PRODUCT_CREATE_SUCCESS
	};
}

function imagesUploadStart() {
	return {
		type: t.PRODUCT_IMAGES_UPLOAD_START
	};
}

function imagesUploadEnd() {
	return {
		type: t.PRODUCT_IMAGES_UPLOAD_END
	};
}

const getFilter = (state, offset = 0) => {
	const searchTerm = state.products.filter.search;
	const sortOrder = searchTerm && searchTerm.length > 0 ? 'search' : 'name';

	const filter = {
		limit: 50,
		fields:
			'id,name,category_id,category_ids,category_name,sku,images,enabled,discontinued,stock_status,stock_quantity,price,on_sale,regular_price,url',
		search: searchTerm,
		offset,
		sort: sortOrder
	};

	if (
		state.productCategories.selectedId !== null &&
		state.productCategories.selectedId !== 'all'
	) {
		filter.category_id = state.productCategories.selectedId;
	}

	if (state.products.filter.stockStatus !== null) {
		filter.stock_status = state.products.filter.stockStatus;
	}

	if (state.products.filter.enabled !== null) {
		filter.enabled = state.products.filter.enabled;
	}

	if (state.products.filter.discontinued !== null) {
		filter.discontinued = state.products.filter.discontinued;
	}

	if (state.products.filter.onSale !== null) {
		filter.on_sale = state.products.filter.onSale;
	}

	return filter;
};

export function fetchProducts() {
	return (dispatch, getState) => {
		const state = getState();
		if (state.products.loadingItems) {
			// do nothing
		} else {
			dispatch(requestProducts());
			dispatch(deselectAllProduct());

			const filter = getFilter(state);

			return api.products
				.list(filter)
				.then(({ status, json }) => {
					dispatch(receiveProducts(json));
				})
				.catch(error => {
					dispatch(receiveProductsError(error));
				});
		}
	};
}

export function fetchMoreProducts() {
	return (dispatch, getState) => {
		const state = getState();
		if (!state.products.loadingItems) {
			dispatch(requestMoreProducts());

			const offset = state.products.items.length;
			const filter = getFilter(state, offset);

			return api.products
				.list(filter)
				.then(({ status, json }) => {
					dispatch(receiveProductsMore(json));
				})
				.catch(error => {
					dispatch(receiveProductsError(error));
				});
		}
	};
}

export function deleteCurrentProduct() {
	return (dispatch, getState) => {
		const state = getState();
		const product = state.products.editProduct;
		if (product && product.id) {
			return api.products
				.delete(product.id)
				.then(() => {})
				.catch(err => {
					console.log(err);
				});
		}
	};
}

export function deleteProducts() {
	return (dispatch, getState) => {
		const state = getState();
		const promises = state.products.selected.map(productId =>
			api.products.delete(productId)
		);

		return Promise.all(promises)
			.then(values => {
				dispatch(deleteProductsSuccess());
				dispatch(deselectAllProduct());
				dispatch(fetchProducts());
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function setCategory(category_id) {
	return (dispatch, getState) => {
		const state = getState();
		const promises = state.products.selected.map(productId =>
			api.products.update(productId, { category_id })
		);

		return Promise.all(promises)
			.then(values => {
				dispatch(setCategorySuccess());
				dispatch(deselectAllProduct());
				dispatch(fetchProducts());
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function updateProduct(data) {
	return (dispatch, getState) => {
		dispatch(requestUpdateProduct());

		return api.products
			.update(data.id, data)
			.then(({ status, json }) => {
				const product = fixProductData(json);
				dispatch(receiveUpdateProduct(product));
				dispatch(fetchProducts());
			})
			.catch(error => {
				dispatch(errorUpdateProduct(error));
			});
	};
}

export function createProduct(history) {
	return (dispatch, getState) => {
		const state = getState();

		const productDraft = {
			enabled: false,
			category_id: state.productCategories.selectedId,
			stockType: 'local',
			productType: 'regular'
		};

		return api.products
			.create(productDraft)
			.then(({ status, json }) => {
				dispatch(successCreateProduct(json.id));
				history.push(`/product/${json.id}`);
			})
			.catch(error => {});
	};
}

const fixProductData = product => {
	const saleFrom = moment(product.date_sale_from);
	const saleTo = moment(product.date_sale_to);
	const stockExpected = moment(product.date_stock_expected);

	product.date_sale_from = saleFrom.isValid() ? saleFrom.toDate() : null;
	product.date_sale_to = saleTo.isValid() ? saleTo.toDate() : null;
	product.date_stock_expected = stockExpected.isValid()
		? stockExpected.toDate()
		: null;

	return product;
};

export function fetchProduct(id) {
	return (dispatch, getState) => {
		dispatch(requestProduct());

		return api.products
			.retrieve(id)
			.then(({ status, json }) => {
				const product = fixProductData(json);
				dispatch(receiveProduct(product));
			})
			.catch(error => {
				dispatch(receiveProductError(error));
			});
	};
}

export function fetchImages(productId) {
	return (dispatch, getState) =>
		api.products.images
			.list(productId)
			.then(({ status, json }) => {
				dispatch(receiveImages(json));
			})
			.catch(error => {});
}

export function fetchOptions(productId) {
	return (dispatch, getState) =>
		api.products.options
			.list(productId)
			.then(({ status, json }) => {
				dispatch(receiveOptions(json));
			})
			.catch(error => {});
}

export function fetchVariants(productId) {
	return (dispatch, getState) =>
		api.products.variants
			.list(productId)
			.then(({ status, json }) => {
				dispatch(receiveVariants(json));
			})
			.catch(error => {});
}

export function createVariant(productId) {
	return (dispatch, getState) => {
		const state = getState();
		const {
			regular_price,
			stock_quantity,
			weight
		} = state.products.editProduct;
		const variant = {
			price: regular_price,
			stock_quantity,
			weight
		};

		return api.products.variants
			.create(productId, variant)
			.then(({ status, json }) => {
				dispatch(receiveVariants(json));
			})
			.catch(error => {});
	};
}

export function updateVariant(productId, variantId, variant) {
	return (dispatch, getState) =>
		api.products.variants
			.update(productId, variantId, variant)
			.then(({ status, json }) => {
				dispatch(receiveVariants(json));
			})
			.catch(error => {});
}

export function setVariantOption(productId, variantId, optionId, valueId) {
	return (dispatch, getState) => {
		const option = { option_id: optionId, value_id: valueId };
		return api.products.variants
			.setOption(productId, variantId, option)
			.then(({ status, json }) => {
				dispatch(receiveVariants(json));
			})
			.catch(error => {});
	};
}

export function createOptionValue(productId, optionId, valueName) {
	return (dispatch, getState) =>
		api.products.options.values
			.create(productId, optionId, { name: valueName })
			.then(({ status, json }) => {
				dispatch(fetchOptions(productId));
			})
			.catch(error => {});
}

export function createOption(productId, option) {
	return (dispatch, getState) =>
		api.products.options
			.create(productId, option)
			.then(({ status, json }) => {
				dispatch(receiveOptions(json));
			})
			.catch(error => {});
}

export function updateOptionValue(productId, optionId, valueId, valueName) {
	return (dispatch, getState) =>
		api.products.options.values
			.update(productId, optionId, valueId, { name: valueName })
			.then(({ status, json }) => {
				dispatch(fetchOptions(productId));
			})
			.catch(error => {});
}

export function updateOption(productId, optionId, option) {
	return (dispatch, getState) =>
		api.products.options
			.update(productId, optionId, option)
			.then(({ status, json }) => {
				dispatch(receiveOptions(json));
			})
			.catch(error => {});
}

export function deleteOptionValue(productId, optionId, valueId) {
	return (dispatch, getState) =>
		api.products.options.values
			.delete(productId, optionId, valueId)
			.then(({ status, json }) => {
				dispatch(fetchOptions(productId));
			})
			.catch(error => {});
}

export function deleteOption(productId, optionId) {
	return (dispatch, getState) =>
		api.products.options
			.delete(productId, optionId)
			.then(({ status, json }) => {
				dispatch(receiveOptions(json));
			})
			.catch(error => {});
}

export function deleteVariant(productId, variantId) {
	return (dispatch, getState) =>
		api.products.variants
			.delete(productId, variantId)
			.then(({ status, json }) => {
				dispatch(receiveVariants(json));
			})
			.catch(error => {});
}

export function deleteImage(productId, imageId) {
	return (dispatch, getState) =>
		api.products.images
			.delete(productId, imageId)
			.then(({ status, json }) => {
				dispatch(fetchImages(productId));
			})
			.catch(error => {});
}

export function updateImage(productId, image) {
	return (dispatch, getState) =>
		api.products.images
			.update(productId, image.id, image)
			.then(() => {
				dispatch(fetchImages(productId));
			})
			.catch(error => {});
}

export function updateImages(productId, images) {
	return (dispatch, getState) => {
		const promises = images.map(image =>
			api.products.images.update(productId, image.id, image)
		);

		return Promise.all(promises)
			.then(() => {
				dispatch(fetchImages(productId));
			})
			.catch(error => {});
	};
}

export function uploadImages(productId, form) {
	return (dispatch, getState) => {
		dispatch(imagesUploadStart());
		return api.products.images
			.upload(productId, form)
			.then(() => {
				dispatch(imagesUploadEnd());
				dispatch(fetchImages(productId));
			})
			.catch(error => {
				dispatch(imagesUploadEnd());
			});
	};
}

export function uploadVariantImages(productId, variantId, form) {
	const path = `${productId}/${variantId}`;
	const url = getEnv(apiBaseUrl);
	const headersData = getHeaders();
	headersData.headers['content-type'] = `multipart/form-data`;
	return (dispatch, getState) => {
		dispatch(imagesUploadStart());
		axios
			.post(`${url}/products/${path}/images`, form, headersData)
			.then(res => {
				dispatch(imagesUploadEnd());
				dispatch(fetchVariants(productId));
				dispatch(fetchImages(productId));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

const getHeaders = () => {
	const token = localStorage.getItem('authToken');
	return {
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${token}`
		}
	};
};

export function deleteVariantImages(productId, variantId, imageId) {
	const endPoint = getEnv(apiBaseUrl);
	const url = `${endPoint}/products/${productId}/${variantId}/images/${imageId}`;
	const headers = getHeaders();
	return (dispatch, getState) => {
		axios
			.delete(url, headers)
			.then(res => {
				dispatch(fetchVariants(productId));
			})
			.catch(err => {
				console.log(err);
			});
	};
}

export function updateVariantImage(productId, variantId, image) {
	const endPoint = getEnv(apiBaseUrl);
	const url = `${endPoint}/products/${productId}/${variantId}/images/${image.id}`;
	const headers = getHeaders();
	return (dispatch, getState) => {
		axios
			.put(url, image, headers)
			.then(res => {
				dispatch(fetchVariants(productId));
			})
			.catch(err => {
				console.log(err);
			});
	};
}
