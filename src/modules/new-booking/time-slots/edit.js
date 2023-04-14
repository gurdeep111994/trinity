import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import {
	MuiPickersUtilsProvider,
	DatePicker,
	TimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputLabel from '@material-ui/core/InputLabel';
import { updateTimeSlot, fetchRestaurants } from '../actions';
import toast from '../../../lib/toasts';
import { startLoader, stopLoader } from '../../loader/actions';
import Loader from './../../../lib/Loader';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';

const useStyles = makeStyles({
	text: {
		minWidth: 400,
		margin: '20px auto'
	},
	container: {
		margin: 'auto',
		maxWidth: 600
	},
	time: {
		flexDirection: 'row'
	},
	from: {
		width: 190,
		marginRight: 20
	},
	to: {
		width: 190
	},
	label: {
		marginTop: 20
	}
});

const EditTimeSlot = props => {
	const classes = useStyles();
	const { state } = props.location;
	const [details, setDetails] = useState(state);

	const isSubmittable = () => {
		return (
			details.name.length > 0 &&
			details.from !== null &&
			details.to !== null &&
			details.restrauntId > 0
		);
	};

	const setFormatedTime = time => {
		let selected = moment();
		let t = time.split(':');
		selected.set({ h: t[0], m: t[1], s: t[2] });

		return selected.format('YYYY-MM-DD HH:mm:ss');
	};

	const handleChange = event => {
		setDetails({
			...details,
			[event.target.name]: event.target.value
		});
	};

	// const handleDateChange = date => {
	// 	setDetails({
	// 		...details,
	// 		forDate: date.format('YYYY-MM-DD HH:mm:ss')
	// 	});
	// };

	const handleTimeChange = (time, type) => {
		setDetails({
			...details,
			[type]: time.format('YYYY-MM-DD HH:mm:ss')
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
			props.updateTimeSlot({
				...details
			});
		}
	};

	useEffect(() => {
		props.fetchRestaurants();
		console.log(details);

		setDetails({
			...details,
			from: setFormatedTime(details.from),
			to: setFormatedTime(details.to)
		});
	}, []);

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Time Slot Updated Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<h2>Edit Time Slot : {state.name}</h2>
			<TextField
				type="text"
				className={classes.text}
				value={details.name}
				name="name"
				label="Name"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<FormControl variant="outlined" className={classes.time}>
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<TimePicker
						disablePast={true}
						className={classes.from}
						variant="inline"
						inputVariant="outlined"
						label="From"
						value={details.from}
						initialFocusedDate={details.from}
						onChange={time => handleTimeChange(time, 'from')}
					/>
					<TimePicker
						disablePast={true}
						className={classes.to}
						variant="inline"
						inputVariant="outlined"
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
			<Button
				variant="contained"
				color="primary"
				className={classes.text}
				onClick={e => handleSubmit(e)}
			>
				Save Time Slot Changes
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
	success: state.newBooking.updateTimeSlotSuccess,
	loading: state.loader.loading,
	restaurants: state.newBooking.restaurantsData
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			updateTimeSlot,
			fetchRestaurants,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditTimeSlot)
);
