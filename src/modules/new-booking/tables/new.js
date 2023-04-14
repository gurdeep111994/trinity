import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { createTable, fetchRestaurants } from '../actions';
import Loader from '../../../lib/Loader';
import { startLoader, stopLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
	text: {
		marginBottom: '25px',
		width: '100%'
	},
	container: {
		minHeight: '80vh',
		display: 'flex',
		alignItems: 'center'
	}
});

const NewRestaurant = props => {
	const classes = useStyles();
	const [details, setDetails] = useState({
		name: '',
		occupancy: 0,
		count: 0,
		restrauntId: 0
	});

	const isSubmittable = () => {
		return (
			details.name.length > 0 &&
			details.occupancy > 0 &&
			details.count > 0 &&
			details.count != '' &&
			details.restrauntId > 0
		);
	};

	const handleChange = event => {
		setDetails({
			...details,
			[event.target.name]: event.target.value
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		if (!isSubmittable()) {
			toast.error('Please Enter Required Fiedls');
			return;
		}
		if (isSubmittable()) {
			props.startLoader();
			props.createTable({
				...details
			});
		}
	};

	const handleCancel = event => {
		event.preventDefault();
		props.history.goBack();
	};

	useEffect(() => {
		props.fetchRestaurants();
	}, []);

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Table Created Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<Grid container justify="center">
				<Grid item lg={5} md={5} sm={6} xs={12}>
					<div className="addNewForm">
						<h2 className="mainHeading">Add New Table</h2>
						<TextField
							type="text"
							className={classes.text}
							value={details.name}
							name="name"
							label="Table Name"
							onChange={e => handleChange(e)}
						/>
						<TextField
							type="number"
							className={classes.text}
							value={details.occupancy}
							name="occupancy"
							label="Table Occupancy"
							onChange={e => handleChange(e)}
						/>
						<TextField
							type="number"
							className={classes.text}
							value={details.count}
							name="count"
							label="Table Count"
							onChange={e => handleChange(e)}
						/>
						<InputLabel>Select Restaurant</InputLabel>
						<Select
							value={details.restrauntId}
							onChange={e => handleChange(e)}
							className={classes.text}
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
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button
								variant="outlined"
								onClick={e => handleCancel(e)}
								style={{ marginRight: '1rem' }}
							>
								Cancel
							</Button>
							<Button variant="contained" onClick={e => handleSubmit(e)}>
								Save Table
							</Button>
						</div>
						{props.loading ? <Loader /> : ''}
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	success: state.newBooking.createTableSuccess,
	loading: state.loader.loading,
	restaurants: state.newBooking.restaurantsData
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			createTable,
			startLoader,
			stopLoader,
			fetchRestaurants
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewRestaurant)
);
