import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import BookingList from '../../modules/new-booking/bookings/list';
import EditBooking from '../../modules/new-booking/bookings/edit';

const demo = () => <div>Demo Extra</div>;

const ServiceExtrasRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={BookingList} />
		</Switch>
	);
};

export default ServiceExtrasRoutes;
