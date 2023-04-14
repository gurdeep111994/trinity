import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import DashboardRoutes from './dashboardRoute';
import BookingRoutes from './bookingRoute';
import TreatmentRoutes from './treatmentRoute';

const comp = props => {
	return <div> Spa Routes module{props.location.pathname}</div>;
};

const SpaRoutes = props => {
	return (
		<Fragment>
			<Route
				path={`${props.match.url}/dashboard`}
				component={DashboardRoutes}
			/>
			<Route path={`${props.match.url}/booking`} component={BookingRoutes} />
			<Route
				path={`${props.match.url}/treatment`}
				component={TreatmentRoutes}
			/>
		</Fragment>
	);
};

export default SpaRoutes;
