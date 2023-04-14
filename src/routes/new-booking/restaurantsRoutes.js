import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import RestaurantList from '../../modules/new-booking/restaurants/list';
import NewRestaurant from '../../modules/new-booking/restaurants/new';
import EditRestaurant from '../../modules/new-booking/restaurants/edit';

const ServicesRoutes = props => {
	return (
		<Switch>
			<Route path={`${props.match.url}`} exact component={RestaurantList} />
			<Route path={`${props.match.url}/add`} exact component={NewRestaurant} />
			<Route
				path={`${props.match.url}/edit/:id`}
				exact
				component={EditRestaurant}
			/>
		</Switch>
	);
};

export default ServicesRoutes;
