import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { createRestaurant } from '../actions';
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
		address: ''
	});

	const isSubmittable = () => {
		return details.name.length > 0 && details.address.length > 0;
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
			props.createRestaurant({
				...details
			});
		}
	};

	const handleCancel = event => {
		event.preventDefault();
		props.history.goBack();
	};

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('restaurant Created Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<Grid container justify="center">
				<Grid item lg={4} md={5} sm={6} xs={12}>
					<div className="addNewForm">
						<h2 className="mainHeading">Add New Restaurant</h2>
						<TextField
							type="text"
							className={classes.text}
							value={details.name}
							name="name"
							label="Restaurant Name"
							onChange={e => handleChange(e)}
						/>
						<TextField
							type="text"
							className={classes.text}
							multiline
							rows="4"
							value={details.address}
							name="address"
							label="Restaurant Address"
							onChange={e => handleChange(e)}
						/>
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button
								variant="outlined"
								onClick={e => handleCancel(e)}
								style={{ marginRight: '1rem' }}
							>
								Cancel
							</Button>
							<Button variant="contained" onClick={e => handleSubmit(e)}>
								Save Restaurant
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
	success: state.newBooking.createRestaurantSuccess,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			createRestaurant,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewRestaurant)
);
