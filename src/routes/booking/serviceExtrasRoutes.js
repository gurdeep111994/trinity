import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ServiceExrasList from '../../modules/booking/serviceExtras/list';
import NewServiceExtra from '../../modules/booking/serviceExtras/new';
import EditServiceExtras from '../../modules/booking/serviceExtras/edit';

const demo = () => <div>Demo Extra</div>;

const ServiceExtrasRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={ServiceExrasList} />
			<Route
				path={`${props.match.url}/add`}
				exact
				component={NewServiceExtra}
			/>
			<Route
				path={`${props.match.url}/edit/:id`}
				exact
				component={EditServiceExtras}
			/>
		</Switch>
	);
};

export default ServiceExtrasRoutes;
