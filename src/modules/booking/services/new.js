import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';

import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { createService } from '../actions';
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

const NewService = props => {
	const classes = useStyles();
	const [details, setDetails] = useState({
		name: '',
		description: '',
		price: 0
	});

	const isSubmittable = () => {
		return (
			details.name.length > 0 &&
			details.description.length > 0 &&
			details.price.length > 0
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
		if (isSubmittable()) {
			props.startLoader();
			props.createService({
				...details,
				price: Number(details.price),
				tags: [],
				categoryId: 3
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
			toast.success('Service Created Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.conItainer}>
			<h2>Add New Service</h2>
			<TextField
				type="text"
				className={classes.text}
				value={details.name}
				name="name"
				label="Service Name"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="text"
				className={classes.text}
				multiline
				rows="4"
				value={details.description}
				name="description"
				label="Service Description"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
			<TextField
				type="number"
				className={classes.text}
				value={details.price}
				name="price"
				label="Service Price"
				variant="outlined"
				onChange={e => handleChange(e)}
			/>
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
				onClick={e => handleCancel(e)}
			>
				Cancel
			</Button>
			{props.loading ? <Loader /> : ''}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	success: state.booking.createServiceSuccess,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			createService,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewService)
);
