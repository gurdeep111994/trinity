import React, { useEffect } from 'react';
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
import { fetchAvailability } from '../actions';
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

const AvailabilityList = props => {
	const classes = useStyles();

	useEffect(() => {
		props.startLoader();
		props.fetchAvailability();
	}, []);

	return (
		<div className={classes.container}>
			<h2>Availability List</h2>
			<Button
				variant="outlined"
				onClick={e => {
					e.preventDefault();
					props.history.push('/booking/availability/add');
				}}
			>
				New Availability
			</Button>
			{props.loading === true ? (
				<Loader />
			) : (
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell align="right">Service</TableCell>
							<TableCell align="right">Availiability</TableCell>
							<TableCell align="right">From</TableCell>
							<TableCell align="right">To</TableCell>
							<TableCell align="right">Location</TableCell>
							<TableCell align="right">Created At</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{props.availability.length > 0 &&
							props.availability.map(row => (
								<TableRow
									key={row.id}
									onClick={e => {
										e.preventDefault();
										console.log(row);
									}}
								>
									<TableCell component="th" scope="row">
										{row.id}
									</TableCell>
									<TableCell align="right">{row.serviceId}</TableCell>
									<TableCell align="right">
										{row.availiability ? 'Available' : 'Not Available'}
									</TableCell>
									<TableCell align="right">{row.from}</TableCell>
									<TableCell align="right">{row.to}</TableCell>
									<TableCell align="right">{row.locationId}</TableCell>
									<TableCell align="right">{row.createdAt}</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			)}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => ({
	availability: state.booking.availabilityData,
	loading: state.loader.loading
});

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchAvailability,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AvailabilityList)
);
