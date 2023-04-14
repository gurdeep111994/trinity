import React from 'react';
import CustomersList from 'modules/customers/list';
import Groups from 'modules/customerGroups/list';

export default () => (
	<div className="row products-box">
		<div className="sidebar">
			<h1>Customers</h1>
			<Groups showAll showRoot={false} showManage />
		</div>
		<div className="content-area">
			<CustomersList />
		</div>
	</div>
);
