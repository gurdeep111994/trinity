import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import LocationsList from '../../modules/booking/locations/list';
import NewLocation from '../../modules/booking/locations/new';
import EditLocation from '../../modules/booking/locations/edit';

const demo = () => <div>Demo</div>;

const LocationsRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={LocationsList} />
			<Route path={`${props.match.url}/add`} exact component={NewLocation} />
			<Route
				path={`${props.match.url}/edit/:id`}
				exact
				component={EditLocation}
			/>
		</Switch>
	);
};

export default LocationsRoutes;
