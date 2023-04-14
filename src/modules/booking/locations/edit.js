import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';
import { fetchServices, updateLocation } from '../actions';
import toast from '../../../lib/toasts';
import { startLoader, stopLoader } from '../../loader/actions';
import Loader from './../../../lib/Loader';

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

const EditLocation = props => {
	const classes = useStyles();

	const data = props.location.state;
	const [details, setDetails] = useState({});

	useEffect(() => {
		props.fetchServices();
		setDetails({
			id: data.id,
			lat: data.location.coordinates[0],
			long: data.location.coordinates[1],
			serviceId: data.serviceId,
			name: data.name,
			address: data.address
		});
	}, []);

	const isSubmittable = () => Object.keys(details).length > 0;

	const handleChange = event => {
		console.log('value', event.target.value);
		setDetails({
			...details,
			[event.target.name]: event.target.value
		});
	};

	const handleCancel = event => {
		event.preventDefault();
		props.history.goBack();
	};

	const handleSubmit = event => {
		event.preventDefault();
		const dtoObj = {
			id: details.id,
			name: details.name,
			address: details.address,
			serviceId: details.serviceId,
			location: {
				type: 'Point',
				coordinates: [details.lat, details.long]
			}
		};
		if (isSubmittable()) {
			props.startLoader();
			props.updateLocation(dtoObj);
			console.log('update loc details', dtoObj);
		}
	};

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Location Updated Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<h2>Edit Service: {details.name}</h2>
			<TextField
				type="text"
				className={classes.text}
				value={details.name || ''}
				name="name"
				label="Service Name"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="text"
				className={classes.text}
				multiline
				rows="3"
				value={details.address || ''}
				name="address"
				label="Address"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="text"
				className={classes.text}
				value={details.lat || 0}
				name="lat"
				label="Latitude"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="text"
				className={classes.text}
				value={details.long || 0}
				name="long"
				label="Longitude"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<Select
				value={details.serviceId || 0}
				onChange={e => handleChange(e)}
				className={classes.text}
				variant="outlined"
				name="serviceId"
			>
				{props.services &&
					props.services.map((serviceId, ind) => {
						console.log('service id', serviceId);
						return (
							<MenuItem key={ind} value={serviceId.id}>
								{' '}
								{serviceId.name}{' '}
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
				Save Service Changes
			</Button>
			<Button
				variant="contained"
				color="secondary"
				className={classes.text}
				onClick={e => handleCancel(e)}
			>
				Cancel
			</Button>
			{props.loading ? <Loader /> : ''}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	success: state.booking.updateLocationsSuccess,
	services: state.booking.servicesData,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			updateLocation,
			fetchServices,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditLocation)
);
