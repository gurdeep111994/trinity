import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, FormControl, InputLabel, Select } from '@material-ui/core';

import { fetchServices, fetchLocations, updateServiceExtras } from '../actions';

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

const EditServiceExtras = props => {
	const classes = useStyles();
	const { state } = props.location;
	const [details, setDetails] = useState(state);

	const isSubmittable = () => Object.keys(details).length > 0;

	const handleChange = event => {
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
		if (isSubmittable())
			props.updateServiceExtras({
				...details,
				price: Number(details.price)
			});
	};

	useEffect(() => {
		if (props.success) props.history.goBack();
	}, [props.success]);

	console.log('State in Service extras', details, state);
	return (
		<div className={classes.container}>
			<h2>Edit Service Extras: {state.name}</h2>

			<TextField
				type="text"
				className={classes.text}
				value={details.name}
				name="name"
				label="Service Extra Name"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

			<TextField
				type="text"
				className={classes.text}
				value={details.price}
				name="price"
				label="Service Extra Price"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

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
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	success: state.booking.updateServiceExtrasSuccess
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			updateServiceExtras,
			fetchServices,
			fetchLocations
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditServiceExtras)
);
