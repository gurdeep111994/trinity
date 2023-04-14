import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TablesList from '../../modules/new-booking/tables/list';
import NewTable from '../../modules/new-booking/tables/new';
import EditTable from '../../modules/new-booking/tables/edit';

const demo = () => <div>Demo</div>;

const TablesRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={TablesList} />
			<Route path={`${props.match.url}/add`} exact component={NewTable} />
			<Route path={`${props.match.url}/edit/:id`} exact component={EditTable} />
		</Switch>
	);
};

export default TablesRoutes;
