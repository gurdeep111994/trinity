import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import {
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel
} from '@material-ui/core';

import { fetchServices, fetchLocations, createServiceExtras } from '../actions';

const useStyles = makeStyles({
	text: {
		minWidth: 400,
		margin: '20px auto'
	},
	container: {
		margin: 'auto',
		maxWidth: 600
	}
});

const NewServiceExtra = props => {
	const classes = useStyles();

	const [details, setDetails] = useState({
		name: '',
		price: '',
		serviceId: 0,
		locationId: 0
	});

	useEffect(() => {
		props.fetchServices();
	}, []);

	useEffect(() => {
		if (details.serviceId !== 0) props.fetchLocations(details.serviceId);
	}, [details.serviceId]);

	const isSubmittable = () => {
		return (
			details.name.length > 0 &&
			details.price.length > 0 &&
			details.serviceId > 0 &&
			details.locationId > 0
		);
	};

	const handleSubmit = event => {
		console.log('details', details);
		event.preventDefault();
		// if (isSubmittable())
		props.createServiceExtras({
			...details,
			price: Number(details.price)
		});
	};

	const handleCancel = event => {
		event.preventDefault();
		props.history.goBack();
	};

	const handleChange = event => {
		setDetails({
			...details,
			[event.target.name]: event.target.value
		});
	};

	useEffect(() => {
		if (props.success) props.history.goBack();
	}, [props.success]);

	return (
		<div className={classes.container}>
			<h2>Add New Service: </h2>
			<TextField
				type="text"
				className={classes.text}
				value={details.name}
				name="name"
				label="Service Extras Name"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="text"
				className={classes.text}
				value={details.price}
				name="price"
				label="Service Extras Price"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

			<FormControl variant="outlined" className={classes.text}>
				<InputLabel>Service</InputLabel>
				<Select
					value={details.serviceId}
					name="serviceId"
					onChange={e => handleChange(e)}
				>
					<MenuItem key="0" value={0}>
						<em>None</em>
					</MenuItem>
					{props.services.length > 0 &&
						props.services.map(service => (
							<MenuItem key={service.id} value={service.id}>
								{service.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>
			<FormControl variant="outlined" className={classes.text}>
				<InputLabel>Location</InputLabel>
				<Select
					value={details.locationId}
					name="locationId"
					onChange={e => handleChange(e)}
				>
					<MenuItem key="0" value={0}>
						<em>None</em>
					</MenuItem>
					{props.locations.length > 0 &&
						props.locations.map(location => (
							<MenuItem key={location.id} value={location.id}>
								{location.name}
							</MenuItem>
						))}
				</Select>
			</FormControl>

			<Button
				variant="contained"
				color="primary"
				className={classes.text}
				onClick={e => handleSubmit(e)}
			>
				Add Service Extras
			</Button>
			<Button
				variant="contained"
				color="secondary"
				className={classes.text}
				onClick={handleCancel}
			>
				Cancel
			</Button>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	services: state.booking.servicesData,
	locations: state.booking.locationsData,
	success: state.booking.createServiceExtrasSuccess
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchServices,
			fetchLocations,
			createServiceExtras
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewServiceExtra)
);
