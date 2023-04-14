import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import ActiveClassesList from '../../modules/active/classes/list';

const demo = () => <div>Demo ClassesRoutes</div>;

const ClassesRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={ActiveClassesList} />
		</Switch>
	);
};

export default ClassesRoutes;
