import React from 'react';
import { Route, Redirect, withRouter } from 'react-router';
import { withKeycloak } from 'react-keycloak';
const PrivateRoute = ({ component: Component, exact, path, keycloak }) => {
	return (
		<Route
			exact={exact}
			path={path}
			render={props => <Component {...props} />}
		/>
	);
};

export default withKeycloak(withRouter(PrivateRoute));
