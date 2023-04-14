import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// import SpaBookingList from '../../modules/spa/booking/list';
import SpaBookingListLocal from '../../modules/spa/booking/listNew'; // For Local Data

// import EditBooking from '../../modules/new-booking/bookings/edit';

const demo = () => <div>BookingRoutes from spa</div>;

const BookingRoutes = props => {
	return (
		<Switch>
			<Route
				path={`${props.match.url}`}
				exact
				component={SpaBookingListLocal}
			/>
		</Switch>
	);
};

export default BookingRoutes;
