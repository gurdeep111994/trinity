import * as t from './actionTypes';

const initialState = {
	editProductImages: null,
	editProductOptions: null,
	editProductVariants: null,
	editProduct: null,
	items: [],
	selected: [],
	hasMore: false,
	totalCount: 0,

	isUpdating: false,
	loadingItems: false,
	uploadingImages: false,

	errorFetchEdit: null,
	errorLoadingItems: null,
	errorUpdate: null,

	filter: {
		search: '',
		enabled: null,
		discontinued: false,
		onSale: null,
		stockStatus: null
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case t.PRODUCT_DETAIL_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});
		case t.PRODUCT_DETAIL_RECEIVE:
			return Object.assign({}, state, {
				editProduct: action.item,
				loadingItems: false
			});
		case t.PRODUCT_DETAIL_ERASE:
			return Object.assign({}, state, {
				isUpdating: false,
				editProduct: null,
				editProductImages: null,
				editProductOptions: null,
				editProductVariants: null,
				loadingItems: false
			});
		case t.PRODUCT_DETAIL_FAILURE:
			return Object.assign({}, state, {
				errorFetchEdit: action.error
			});
		case t.PRODUCTS_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});
		case t.PRODUCTS_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: action.data
			});
		case t.PRODUCTS_FAILURE:
			return Object.assign({}, state, {
				errorLoadingItems: action.error
			});
		case t.PRODUCTS_SELECT:
			return Object.assign({}, state, {
				selected: [...state.selected, action.productId]
			});
		case t.PRODUCTS_DESELECT:
			return Object.assign({}, state, {
				selected: state.selected.filter(id => id !== action.productId)
			});
		case t.PRODUCTS_DESELECT_ALL:
			return Object.assign({}, state, {
				selected: []
			});
		case t.PRODUCTS_SELECT_ALL:
			const selected = state.items.map(item => item.id);
			return Object.assign({}, state, {
				selected
			});
		case t.PRODUCTS_SET_FILTER:
			const newFilter = Object.assign({}, state.filter, action.filter);
			return Object.assign({}, state, {
				filter: newFilter
			});
		case t.PRODUCTS_MORE_REQUEST:
			return Object.assign({}, state, {
				loadingItems: true
			});
		case t.PRODUCTS_MORE_RECEIVE:
			return Object.assign({}, state, {
				loadingItems: false,
				hasMore: action.has_more,
				totalCount: action.total_count,
				items: [...state.items, ...action.data]
			});
		case t.PRODUCT_VARIANTS_RECEIVE:
			return Object.assign({}, state, {
				editProductVariants: action.variants,
				isUpdating: false
			});
		case t.PRODUCT_OPTIONS_RECEIVE:
			return Object.assign({}, state, {
				editProductOptions: action.options,
				isUpdating: false
			});
		case t.PRODUCT_IMAGES_RECEIVE:
			return Object.assign({}, state, {
				editProductImages: action.images
			});
		case t.PRODUCT_UPDATE_REQUEST:
			return Object.assign({}, state, {
				isUpdating: true,
				loadingItems: true
			});
		case t.PRODUCT_UPDATE_FAILURE:
			return Object.assign({}, state, {
				isUpdating: false,
				loadingItems: false
			});
		case t.PRODUCT_UPDATE_SUCCESS:
			return Object.assign({}, state, {
				isUpdating: false,
				editProduct: action.item,
				loadingItems: false
			});
		case t.PRODUCT_IMAGES_UPLOAD_START:
			return Object.assign({}, state, {
				uploadingImages: true
			});
		case t.PRODUCT_IMAGES_UPLOAD_END:
			return Object.assign({}, state, {
				uploadingImages: false
			});
		case t.PRODUCT_SET_CATEGORY_SUCCESS:
			return Object.assign({}, state, {
				isUpdating: false
			});
		case t.PRODUCT_DELETE_SUCCESS:
			return Object.assign({}, state, {
				isUpdating: false
			});
		default:
			return state;
	}
};
