import React from 'react';
import OrdersList from 'modules/orders/list';
import OrdersFilter from 'modules/orders/listFilter';
import Statuses from 'modules/orderStatuses/list';

export default () => (
	<div className="row row--no-gutter col-full-height products-box">
		<div className="sidebar ">
			<h1>Orders</h1>
			<Statuses showAll showManage />
			<OrdersFilter />
		</div>
		<div className="content-area ">
			<div className="product-list">
				<OrdersList />
			</div>
		</div>
	</div>
);
