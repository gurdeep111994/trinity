import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ServicesList from '../../modules/booking/services/list';
import NewService from '../../modules/booking/services/new';
import EditService from '../../modules/booking/services/edit';

const ServicesRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={ServicesList} />
			<Route path={`${props.match.url}/add`} exact component={NewService} />
			<Route
				path={`${props.match.url}/edit/:id`}
				exact
				component={EditService}
			/>
		</Switch>
	);
};

export default ServicesRoutes;
