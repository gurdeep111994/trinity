import React from 'react';

import messages from 'lib/text';
import Paper from 'material-ui/Paper';
import style from './style.css';

import OrderTotals from './totals';
import OrderSummary from './summary';
import OrderItems from './items';
import OrderCustomer from './customer';

export default class OrderDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchData();
	}

	componentWillUnmount() {
		this.props.clearData();
	}

	render() {
		const {
			order,
			settings,
			onItemDelete,
			onItemUpdate,
			onShippingAddressUpdate,
			onOrderSummaryUpdate,
			onCheckout,
			processingCheckout
		} = this.props;
		if (!order) return null;

		return (
			<div className="row row--no-gutter  ">
				<div className="col-xs-12 col-sm-5 col-md-4  ">
					<OrderSummary
						order={order}
						settings={settings}
						onOrderSummaryUpdate={onOrderSummaryUpdate}
						onCheckout={onCheckout}
						processingCheckout={processingCheckout}
					/>
					<OrderCustomer
						order={order}
						settings={settings}
						onShippingAddressUpdate={onShippingAddressUpdate}
					/>
				</div>
				<div className="col-xs-12 col-sm-7 col-md-8 ">
					<Paper
						className="paper-box"
						zDepth={1}
						style={{ height: 'calc(100% - 42px)' }}
					>
						<OrderItems
							order={order}
							settings={settings}
							onItemDelete={onItemDelete}
							onItemUpdate={onItemUpdate}
						/>
						<div className={style.innerBox}>
							<div className="row">
								<div className="col-xs-6" />
								<div className="col-xs-6">
									<OrderTotals order={order} settings={settings} />
								</div>
							</div>
						</div>
					</Paper>
				</div>
			</div>
		);
	}
}
