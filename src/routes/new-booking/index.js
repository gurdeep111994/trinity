import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import RestaurantsRoutes from './restaurantsRoutes';
import TablesRoutes from './tablesRoutes';
import TimeSlotsRoutes from './timeSlotsRoutes';
import BookingsRoutes from './bookingsRoutes';
import RequestsRoutes from './requestsRoutes';
import DashboardRoutes from './dashboardRoutes';

const comp = props => {
	return <div> HELLO{props.location.pathname}</div>;
};

const BookingRoutes = props => {
	return (
		<Fragment>
			<Route
				path={`${props.match.url}/dashboard`}
				component={DashboardRoutes}
			/>
			<Route
				path={`${props.match.url}/restaurants`}
				component={RestaurantsRoutes}
			/>
			<Route path={`${props.match.url}/tables`} component={TablesRoutes} />
			<Route
				path={`${props.match.url}/time-slots`}
				component={TimeSlotsRoutes}
			/>
			<Route path={`${props.match.url}/bookings`} component={BookingsRoutes} />
			<Route path={`${props.match.url}/requests`} component={RequestsRoutes} />
		</Fragment>
	);
};

export default BookingRoutes;
