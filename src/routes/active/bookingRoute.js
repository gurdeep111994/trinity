import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// import ActiveBookingList from '../../modules/active/bookings/list';
import ActiveBookingListLocal from '../../modules/active/bookings/listNew'; // For Local data

// import BookingList from '../../modules/new-booking/bookings/list';
// import EditBooking from '../../modules/new-booking/bookings/edit';

const demo = () => <div>BookingRoutes from Active</div>;

const BookingRoutes = props => {
	return (
		<Switch>
			<Route
				path={`${props.match.url}`}
				exact
				component={ActiveBookingListLocal}
			/>
		</Switch>
	);
};

export default BookingRoutes;
