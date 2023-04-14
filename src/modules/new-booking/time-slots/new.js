import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import {
	MuiPickersUtilsProvider,
	DatePicker,
	TimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { createTimeSlot, fetchRestaurants } from '../actions';
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
	},
	time: {
		flexDirection: 'row'
	},
	from: {
		width: '48%',
		marginRight: '1%'
	},
	to: {
		width: '48%',
		marginLeft: '1%'
	},
	label: {
		marginTop: 20
	}
});

const NewRestaurant = props => {
	const classes = useStyles();
	const [details, setDetails] = useState({
		name: '',
		from: null,
		to: null,
		restrauntId: 0
	});

	useEffect(() => {
		props.fetchRestaurants();
	}, []);

	const isSubmittable = () => {
		return (
			details.name != '' &&
			details.from !== null &&
			details.to !== null &&
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
			props.createTimeSlot({
				...details
			});
		}
	};

	const handleCancel = event => {
		event.preventDefault();
		props.history.goBack();
	};

	// const handleDateChange = date => {
	// 	setDetails({
	// 		...details,
	// 		forDate: date.format('YYYY-MM-DD')
	// 	});
	// };

	const handleTimeChange = (time, type) => {
		setDetails({
			...details,
			[type]: time.format('YYYY-MM-DD HH:mm:ss')
		});
	};

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Time Slot Created Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<Grid container justify="center">
				<Grid item lg={4} md={5} sm={6} xs={12}>
					<div className="addNewForm">
						<h2 className="mainHeading">Add New Time Slot</h2>
						<TextField
							type="text"
							className={classes.text}
							value={details.name}
							name="name"
							label="Name"
							onChange={e => handleChange(e)}
						/>
						<FormControl variant="outlined" className={classes.time}>
							<MuiPickersUtilsProvider utils={MomentUtils}>
								<TimePicker
									disablePast={true}
									className={classes.from}
									variant="inline"
									label="From"
									value={details.from}
									initialFocusedDate={details.from}
									onChange={time => handleTimeChange(time, 'from')}
								/>
								<TimePicker
									disablePast={true}
									className={classes.to}
									variant="inline"
									label="To"
									value={details.to}
									initialFocusedDate={details.to}
									onChange={time => handleTimeChange(time, 'to')}
								/>
							</MuiPickersUtilsProvider>
						</FormControl>
						<InputLabel className={classes.label}>Select Restaurant</InputLabel>
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
						{/* <FormControl variant="outlined" className={classes.text}>
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
			</FormControl> */}
						<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<Button
								variant="outlined"
								onClick={e => handleCancel(e)}
								style={{ marginRight: '1rem' }}
							>
								Cancel
							</Button>
							<Button variant="contained" onClick={e => handleSubmit(e)}>
								Save Time Slot
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
	success: state.newBooking.createTimeSlotSuccess,
	restaurants: state.newBooking.restaurantsData,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			createTimeSlot,
			startLoader,
			stopLoader,
			fetchRestaurants
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewRestaurant)
);
