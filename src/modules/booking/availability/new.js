import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, input } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
	MuiPickersUtilsProvider,
	DatePicker,
	TimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { fetchServices, fetchLocations, createAvailability } from '../actions';
import { startLoader, stopLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import Loader from '../../../lib/Loader';

const useStyles = makeStyles({
	text: {
		minWidth: 400,
		margin: '20px auto'
	},
	time: {
		flexDirection: 'row'
	},
	container: {
		margin: 'auto',
		maxWidth: 600
	},
	timeFrom: {
		width: 190,
		marginRight: 20
	},
	timeTo: {
		width: 190
	}
});

const NewAvailability = props => {
	const classes = useStyles();
	const [details, setDetails] = useState({
		serviceId: 0,
		locationId: 0,
		forDate: null,
		availiability: 0,
		from: null,
		to: null
	});

	useEffect(() => {
		props.fetchServices();
	}, []);

	useEffect(() => {
		if (details.serviceId !== 0) {
			props.fetchLocations(details.serviceId);
		}
	}, [details.serviceId]);

	const isSubmittable = () => {
		return (
			details.serviceId > 0 &&
			details.locationId > 0 &&
			details.forDate !== null &&
			details.from !== null &&
			details.to !== null
		);
	};

	const handleChange = event => {
		setDetails({
			...details,
			[event.target.name]: event.target.value
		});
	};

	const handleDateChange = date => {
		setDetails({
			...details,
			forDate: date.format('YYYY-MM-DD')
		});
	};

	const handleTimeChange = (time, type) => {
		setDetails({
			...details,
			[type]: time.format('YYYY-MM-DD HH:mm:ss')
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (isSubmittable()) {
			props.startLoader();
			props.createAvailability(details);
		}
	};

	const handleCancel = event => {
		event.preventDefault();
		props.history.goBack();
	};

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Availablity Created Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<h2>Add New Availability</h2>
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
			<FormControl variant="outlined" className={classes.text}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<DatePicker
						variant="inline"
						inputVariant="outlined"
						label="Date"
						format="YYYY-MM-DD"
						disablePast={true}
						value={details.forDate}
						onChange={handleDateChange}
					/>
				</MuiPickersUtilsProvider>
			</FormControl>
			<FormControl variant="outlined" className={classes.time}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<TimePicker
						disablePast={true}
						className={classes.timeFrom}
						variant="inline"
						inputVariant="outlined"
						label="From"
						value={details.from}
						initialFocusedDate={details.forDate}
						onChange={time => handleTimeChange(time, 'from')}
					/>
					<TimePicker
						disablePast={true}
						className={classes.timeTo}
						variant="inline"
						inputVariant="outlined"
						label="To"
						value={details.to}
						initialFocusedDate={details.forDate}
						onChange={time => handleTimeChange(time, 'to')}
					/>
				</MuiPickersUtilsProvider>
			</FormControl>
			<TextField
				type="number"
				className={classes.text}
				value={details.name}
				name="availiability"
				label="Service Availability"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<Button
				variant="contained"
				color="primary"
				className={classes.text}
				onClick={e => handleSubmit(e)}
			>
				Create Availability
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
	services: state.booking.servicesData,
	locations: state.booking.locationsData,
	success: state.booking.createAvailabitySuccess,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchServices,
			fetchLocations,
			createAvailability,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewAvailability)
);
