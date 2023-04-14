import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// import BookingList from '../../modules/new-booking/bookings/list';
import Dashboard from '../../modules/new-booking/dashboard';

const demo = () => <div>DashboardRoutes Demo Component</div>;

const DashboardRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={Dashboard} />
		</Switch>
	);
};

export default DashboardRoutes;
