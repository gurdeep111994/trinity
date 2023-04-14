import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { updateRestaurant } from '../actions';
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

const EditRestaurant = props => {
	const classes = useStyles();
	const { state } = props.location;
	const [details, setDetails] = useState(state);

	const isSubmittable = () => {
		return details.name.length > 0 && details.address.length > 0;
	};

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
		if (!isSubmittable()) {
			toast.error('Please Enter Required Fiedls');
			return;
		}
		if (isSubmittable()) {
			props.startLoader();
			props.updateRestaurant({
				...details
			});
		}
	};

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Restaurant Updated Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<h2>Edit Restaurant: {state.name}</h2>
			<TextField
				type="text"
				className={classes.text}
				value={details.name}
				name="name"
				label="Restaurant Name"
				variant="outlined"
				onChange={e => handleChange(e)}
				required
			/>
			<TextField
				type="text"
				className={classes.text}
				multiline
				rows="4"
				value={details.address}
				name="address"
				label="Restaurant Address"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>

			<Button
				variant="contained"
				color="primary"
				className={classes.text}
				onClick={e => handleSubmit(e)}
			>
				Save Restaurant Changes
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
	success: state.newBooking.updateRestaurantSuccess,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			updateRestaurant,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditRestaurant)
);
