import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Spinner from 'react-spinner-material';

class Spinners extends React.Component {
	render() {
		return (
			<Spinner
				size={120}
				spinnerColor={'rgb(17, 161, 146)'}
				spinnerWidth={2}
				visible={this.props.isLoading}
			/>
		);
	}
}
const mapStateToProps = (state, ownProps) => {
	const isLoading =
		state.products.loadingItems ||
		state.products.isUpdating ||
		state.orders.loadingItems ||
		state.orderStatuses.isFetching ||
		state.customers.loadingItems;
	return { isLoading };
};

const mapDispatchToProps = (dispatch, ownProps) => ({});
export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Spinners)
);
