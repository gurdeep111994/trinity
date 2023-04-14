import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import TimeSlotList from '../../modules/new-booking/time-slots/list';
import NewTimeSLot from '../../modules/new-booking/time-slots/new';
import EditTimeSlot from '../../modules/new-booking/time-slots/edit';

const demo = () => <div>Demo</div>;

const AvailabilityRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={TimeSlotList} />
			<Route path={`${props.match.url}/add`} exact component={NewTimeSLot} />
			<Route
				path={`${props.match.url}/edit/:id`}
				exact
				component={EditTimeSlot}
			/>
		</Switch>
	);
};

export default AvailabilityRoutes;
