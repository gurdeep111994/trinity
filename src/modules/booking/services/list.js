import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Edit, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import DialogComponent from './../../shared/confirmDeleteDialog';
import Loader from '../../../lib/Loader';
import { fetchServices, deleteService } from '../actions';
import { startLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
	container: {
		margin: '0 100px'
	}
});

const ServicesList = props => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({});

	useEffect(() => {
		props.startLoader();
		props.fetchServices();
	}, []);

	const handleEdit = (event, data) => {
		event.preventDefault();
		props.history.push(`${props.match.path}/edit/${data.id}`, { ...data });
	};

	const toggle = () => {
		setOpen(!open);
	};

	const handleDelete = (event, data) => {
		event.preventDefault();
		setData(data);
		toggle();
	};

	useEffect(() => {
		if (props.deleteSuccess) {
			toast.success('Service Deleted Successfully');
			props.fetchServices();
		}
	}, [props.deleteSuccess]);

	return (
		<div className={classes.container}>
			<h2>Services List</h2>
			<Button
				variant="outlined"
				onClick={e => {
					e.preventDefault();
					props.history.push('/booking/services/add');
				}}
			>
				New Service
			</Button>
			{props.loading === true ? (
				<Loader />
			) : (
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell style={{ width: 65 }} align="left">
								Actions
							</TableCell>
							<TableCell align="left">ID</TableCell>
							<TableCell align="left">Name</TableCell>
							<TableCell align="left">Description</TableCell>
							<TableCell align="left">Price</TableCell>
							<TableCell align="left">Created At</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.services.length > 0 &&
							props.services.map(row => (
								<TableRow key={row.id}>
									<TableCell>
										<Edit
											style={{
												color: 'blue',
												fontSize: 32,
												cursor: 'pointer'
											}}
											onClick={e => handleEdit(e, row)}
										/>
										<Delete
											style={{
												color: 'red',
												fontSize: 32,
												cursor: 'pointer'
											}}
											onClick={e => handleDelete(e, row)}
										/>
									</TableCell>
									<TableCell align="left" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="left">{row.name}</TableCell>
									<TableCell align="left">{row.description}</TableCell>
									<TableCell align="left">{row.price}</TableCell>
									<TableCell align="left">{row.createdAt}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			)}
			{open ? (
				<DialogComponent
					open={open}
					handleClose={toggle}
					data={data}
					delete={props.deleteService}
					startLoader={props.startLoader}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		services: state.booking.servicesData,
		deleteSuccess: state.booking.deleteServiceSuccess,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchServices,
			deleteService,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ServicesList)
);
