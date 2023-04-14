import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import { fetchServices, createLocation } from '../actions';
import Loader from './../../../lib/Loader';
import { startLoader, stopLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';

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

const NewLocation = props => {
	const classes = useStyles();
	const [details, setDetails] = useState({
		name: '',
		address: '',
		lat: 0,
		long: 0,
		serviceId: ''
	});

	const isSubmittable = () => {
		return (
			details.name.length > 0 &&
			details.address.length > 0 &&
			details.lat > 0 &&
			details.long > 0 &&
			details.serviceId > 0
		);
	};

	useEffect(() => {
		props.fetchServices();
	}, []);

	const handleChange = event => {
		setDetails({
			...details,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		const data = {
			name: details.name,
			address: details.address,
			location: {
				type: 'Point',
				coordinates: [details.lat, details.long]
			},
			serviceId: details.serviceId
		};

		if (isSubmittable()) {
			props.startLoader();
			props.createLocation(data);
		}
	};

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Location Created Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	const handleCancel = event => {
		console.log('Add Location handleCancel');
		event.preventDefault();
		props.history.goBack();
	};

	return (
		<div className={classes.container}>
			<h2>New Location</h2>
			<TextField
				type="text"
				className={classes.text}
				value={details.name}
				name="name"
				label="Name"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

			<TextField
				type="text"
				className={classes.text}
				value={details.address}
				multiline
				rows="3"
				name="address"
				label="Address"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

			<TextField
				type="text"
				className={classes.text}
				value={details.lat}
				name="lat"
				label="Latitude"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

			<TextField
				type="text"
				className={classes.text}
				value={details.long}
				name="long"
				label="Longitude"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

			<Select
				value={details.serviceId}
				onChange={e => handleChange(e)}
				className={classes.text}
				variant="outlined"
				name="serviceId"
			>
				{props.services &&
					props.services.map((serviceId, ind) => {
						return (
							<MenuItem key={ind} value={serviceId.id}>
								{' '}
								{serviceId.id}{' '}
							</MenuItem>
						);
					})}
			</Select>

			<Button
				variant="contained"
				color="primary"
				className={classes.text}
				onClick={e => handleSubmit(e)}
			>
				Save Service
			</Button>
			<Button
				variant="contained"
				color="secondary"
				className={classes.text}
				onClick={handleCancel}
			>
				Cancel
			</Button>
			{props.loading ? <Loader /> : ''}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	services: state.booking.servicesData,
	success: state.booking.createLocationSuccess,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchServices,
			createLocation,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewLocation)
);
