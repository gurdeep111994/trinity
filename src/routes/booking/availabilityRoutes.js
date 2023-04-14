import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import AvailabilityList from '../../modules/booking/availability/list';
import NewAvailability from '../../modules/booking/availability/new';

const demo = () => <div>Demo</div>;

const AvailabilityRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={AvailabilityList} />
			<Route
				path={`${props.match.url}/add`}
				exact
				component={NewAvailability}
			/>
			<Route path={`${props.match.url}/edit`} exact component={demo} />
		</Switch>
	);
};

export default AvailabilityRoutes;
