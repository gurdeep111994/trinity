import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { updateTable, fetchRestaurants } from '../actions';
import toast from '../../../lib/toasts';
import { startLoader, stopLoader } from '../../loader/actions';
import Loader from './../../../lib/Loader';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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
		return (
			details.name.length > 0 &&
			details.occupancy > 0 &&
			details.restrauntId > 0
		);
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
			props.updateTable({
				...details
			});
		}
	};

	useEffect(() => {
		props.fetchRestaurants();
	}, []);

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Table Updated Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<h2>Edit Table : {state.name}</h2>
			<TextField
				type="text"
				className={classes.text}
				value={details.name}
				name="name"
				label="Table Name"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="number"
				className={classes.text}
				value={details.occupancy}
				name="occupancy"
				label="Table occupancy"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="number"
				className={classes.text}
				value={details.count}
				name="count"
				label="Table Count"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<InputLabel>Select Restaurant</InputLabel>
			<Select
				value={details.restrauntId}
				onChange={e => handleChange(e)}
				className={classes.text}
				variant="outlined"
				label="Restraunt"
				name="restrauntId"
			>
				<MenuItem key="0" value={0}>
					<em>None</em>
				</MenuItem>
				{props.restaurants &&
					props.restaurants.map((item, index) => {
						return (
							<MenuItem key={index} value={item.id}>
								{item.name}
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
				Save Table Changes
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
	success: state.newBooking.updateTableSuccess,
	loading: state.loader.loading,
	restaurants: state.newBooking.restaurantsData
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			updateTable,
			startLoader,
			stopLoader,
			fetchRestaurants
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditRestaurant)
);
