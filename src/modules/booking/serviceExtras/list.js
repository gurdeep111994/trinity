import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Loader from '../../../lib/Loader';
import { fetchServiceExtras, deleteServiceExtras } from '../actions';
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

const ServiceExrasList = props => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({});

	useEffect(() => {
		props.startLoader();
		props.fetchServiceExtras();
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
			toast.success('Service Extra Deleted Successfully');
			props.fetchServiceExtras();
		}
	}, [props.deleteSuccess]);

	return (
		<div className={classes.container}>
			<h2>Services Extra List</h2>
			<Button
				variant="outlined"
				onClick={e => {
					e.preventDefault();
					props.history.push('/booking/service-extras/add');
				}}
			>
				New Service Extra
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
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Created At</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{props.services.length > 0 &&
							props.services.map(row => (
								<TableRow
									key={row.id}
									onClick={e => {
										e.preventDefault();
										console.log(row);
									}}
								>
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
									<TableCell align="right">{row.price}</TableCell>
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
					delete={props.deleteServiceExtras}
					startLoader={props.startLoader}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	services: state.booking.servicesExtraData,
	deleteSuccess: state.booking.deleteServicesExtraSuccess,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchServiceExtras,
			deleteServiceExtras,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ServiceExrasList)
);
