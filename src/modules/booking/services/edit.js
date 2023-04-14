import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { updateService } from '../actions';
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

const EditService = props => {
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
		if (isSubmittable()) {
			props.startLoader();
			props.updateService({
				...details,
				price: Number(details.price),
				tags: [],
				categoryId: 3
			});
		}
	};

	useEffect(() => {
		if (props.success) {
			props.stopLoader();
			toast.success('Service Updated Successfully');
			props.history.goBack();
		}
	}, [props.success]);

	return (
		<div className={classes.container}>
			<h2>Edit Service: {state.name}</h2>
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
	success: state.booking.updateServiceSuccess,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			updateService,
			startLoader,
			stopLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditService)
);
