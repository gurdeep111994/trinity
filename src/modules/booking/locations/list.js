import React, { useEffect, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button } from '@material-ui/core';
import Loader from '../../../lib/Loader';
import { startLoader } from '../../loader/actions';
import { Edit, Delete } from '@material-ui/icons';
import DialogComponent from './../../shared/confirmDeleteDialog';
import toast from '../../../lib/toasts';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
	container: {
		margin: '0 100px'
	}
});

import { fetchLocations, deleteLocation } from '../actions';

const LocationsList = props => {
	const classes = useStyles();

	const [open, setOpen] = useState(false);
	const [data, setData] = useState({});

	const toggle = () => {
		setOpen(!open);
	};

	useEffect(() => {
		props.startLoader();
		props.fetchLocations();
	}, []);

	const handleEdit = (event, data) => {
		event.preventDefault();
		props.history.push(`${props.match.path}/edit/${data.id}`, { ...data });
	};

	const handleDelete = (event, data) => {
		event.preventDefault();
		setData(data);
		toggle();
	};

	useEffect(() => {
		if (props.deleteSuccess) {
			toast.success('Location Deleted Successfully');
			props.fetchLocations();
		}
	}, [props.deleteSuccess]);

	return (
		<div className={classes.container}>
			<h2>Locations List</h2>
			<Button
				variant="outlined"
				onClick={e => {
					e.preventDefault();
					props.history.push('/booking/locations/add');
				}}
			>
				New Location
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
							<TableCell>ID</TableCell>
							<TableCell align="right">Name</TableCell>
							<TableCell align="right">Address</TableCell>
							<TableCell align="right">Status</TableCell>
							<TableCell align="right">Service</TableCell>
							<TableCell align="right">Created At</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.locations &&
							props.locations.length > 0 &&
							props.locations.map(row => (
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
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="right">{row.name}</TableCell>
									<TableCell align="right">{row.address}</TableCell>
									<TableCell align="right">{row.status}</TableCell>
									<TableCell align="right">{row.serviceId}</TableCell>
									<TableCell align="right">{row.createdAt}</TableCell>
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
					delete={props.deleteLocation}
					startLoader={props.startLoader}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	locations: state.booking.locationsData,
	loading: state.loader.loading,
	deleteSuccess: state.booking.deleteLocationsSuccess
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchLocations,
			startLoader,
			deleteLocation
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(LocationsList)
);
