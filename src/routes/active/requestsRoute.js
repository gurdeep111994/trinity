import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RequestsList from '../../modules/active/requests/list';

const demo = () => <div>RequestsRoutes from Active</div>;

const RequestsRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={RequestsList} />
		</Switch>
	);
};

export default RequestsRoutes;
