import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';
import ServicesRoutes from './servicesRoutes';
import LocationsRoutes from './locationsRoutes';
import AvailabilityRoutes from './availabilityRoutes';
import ServiceExtrasRoutes from './serviceExtrasRoutes';

const comp = props => {
	return <div> HELLO{props.location.pathname}</div>;
};

const BookingRoutes = props => {
	return (
		<Fragment>
			<Route path={`${props.match.url}/services`} component={ServicesRoutes} />
			<Route
				path={`${props.match.url}/locations`}
				component={LocationsRoutes}
			/>
			<Route
				path={`${props.match.url}/service-extras`}
				component={ServiceExtrasRoutes}
			/>
			<Route
				path={`${props.match.url}/availability`}
				component={AvailabilityRoutes}
			/>
		</Fragment>
	);
};

export default BookingRoutes;
