import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import RequestList from '../../modules/new-booking/requests/list';

const demo = () => <div>Demo Extra</div>;

const RequestsRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={RequestList} />
		</Switch>
	);
};

export default RequestsRoutes;
