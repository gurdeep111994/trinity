import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardSpa from '../../modules/spa/dashboard';
// import EditBooking from '../../modules/new-booking/bookings/edit';

const demo = () => <div>DashboardRoutes from spa</div>;

const DashboardRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={DashboardSpa} />
		</Switch>
	);
};

export default DashboardRoutes;
