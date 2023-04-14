import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { gotoPodProductPage } from 'modules/productDesigner/actions';
import {
	setFilter,
	fetchProducts,
	fetchMoreProducts,
	selectProduct,
	deselectProduct,
	selectAllProduct,
	deselectAllProduct,
	createProduct,
	updateProduct
} from '../actions';
import List from './components/list';

const mapStateToProps = (state, ownProps) => ({
	settings: state.settings.settings,
	items: state.products.items,
	selected: state.products.selected,
	loadingItems: state.products.loadingItems,
	hasMore: state.products.hasMore,
	totalCount: state.products.totalCount
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onLoad: () => {
		dispatch(fetchProducts());
	},
	onSelect: event => {
		const productId = event.target.value;
		const { checked } = event.target;

		if (checked) {
			dispatch(selectProduct(productId));
		} else {
			dispatch(deselectProduct(productId));
		}
	},
	onSelectAll: checked => {
		if (checked) {
			dispatch(selectAllProduct());
		} else {
			dispatch(deselectAllProduct());
		}
	},
	loadMore: () => {
		dispatch(fetchMoreProducts());
	},
	onCreate: () => {
		dispatch(createProduct(ownProps.history));
	},
	setSearch: (event, value) => {
		dispatch(setFilter({ search: value }));
		dispatch(fetchProducts());
	},
	changeVisiblity: data => {
		dispatch(updateProduct(data));
	},
	onPodProductCreate: () => {
		dispatch(gotoPodProductPage(ownProps.history));
	}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));
