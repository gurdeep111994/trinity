import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { withKeycloak } from 'react-keycloak';

import AppBar from './components/appBar';

const mapStateToProps = state => {
	const productCategory = state.productCategories.items.find(
		item => item.id === state.productCategories.selectedId
	);
	const customerGroup = state.customerGroups.items.find(
		item => item.id === state.customerGroups.selectedId
	);
	const orderStatus = state.orderStatuses.items.find(
		item => item.id === state.orderStatuses.selectedId
	);
	const orderNumber = state.orders.editOrder
		? state.orders.editOrder.number
		: null;

	return {
		productsSelectedCount: state.products.selected.length,
		customersSelectedCount: state.customers.selected.length,
		ordersSelectedCount: state.orders.selected.length,
		productCategoryName: productCategory ? productCategory.name : null,
		customerGroupName: customerGroup ? customerGroup.name : null,
		orderStatusName: orderStatus ? orderStatus.name : null,
		orderNumber
	};
};

const mapDispatchToProps = dispatch => ({});

export default withRouter(
	withKeycloak(connect(mapStateToProps, mapDispatchToProps)(AppBar))
);
