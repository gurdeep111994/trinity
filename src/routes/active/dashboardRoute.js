import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardActive from '../../modules/active/dashboard';
// import BookingList from '../../modules/new-booking/bookings/list';
// import EditBooking from '../../modules/new-booking/bookings/edit';

const demo = () => <div>DashboardRoutes from Active</div>;

const DashboardRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={DashboardActive} />
		</Switch>
	);
};

export default DashboardRoutes;
