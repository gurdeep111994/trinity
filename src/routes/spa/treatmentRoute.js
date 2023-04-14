import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import SpaTreatmentList from '../../modules/spa/treatment/list';
// import BookingList from '../../modules/new-booking/bookings/list';
// import EditBooking from '../../modules/new-booking/bookings/edit';

const demo = () => <div>TreatmentRoutes From Spa</div>;

const TreatmentRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={SpaTreatmentList} />
		</Switch>
	);
};

export default TreatmentRoutes;
