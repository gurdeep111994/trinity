import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import ClassesRoutes from './classesRoutes';
import BookingRoutes from './bookingRoute';
import DashboardRoutes from './dashboardRoute';
import RequestsRoutes from './requestsRoute';

const comp = props => {
	return <div> HELLO{props.location.pathname}</div>;
};

const ActiveRoutes = props => {
	return (
		<Fragment>
			<Route path={`${props.match.url}/classes`} component={ClassesRoutes} />
			<Route path={`${props.match.url}/booking`} component={BookingRoutes} />
			<Route
				path={`${props.match.url}/dashboard`}
				component={DashboardRoutes}
			/>
			<Route path={`${props.match.url}/requests`} component={RequestsRoutes} />
		</Fragment>
	);
};

export default ActiveRoutes;
