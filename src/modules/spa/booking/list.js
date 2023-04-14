import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
// import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
// import DialogComponentEdit from './edit';
import Loader from '../../../lib/Loader';
import { fetchAppointment, fetchAppointmentsData } from '../actions';
// import { fetchBookings, updateBooking } from '../actions';
import { startLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import { Grid, InputBase, IconButton, FormControl } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import FontIcon from 'material-ui/FontIcon';

const TableCell = withStyles({
	root: {
		borderBottom: 'none'
	}
})(MuiTableCell);

const TableCellHeader = withStyles({
	root: {
		borderBottom: 'none',
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600,
		fontSize: 10,
		color: '#44444F',
		textTransform: 'uppercase'
	}
})(MuiTableCell);

const useStyles = makeStyles({
	table: {
		width: '99%',
		tablLayout: 'fixed',
		margin: '15px auto'
		// padding: '15px',
		// border: '1px solid black'
	},
	container: {
		margin: '0 10px'
	},
	textTransform: {
		textTransform: 'capitalize'
	},
	noData: {
		textAlign: 'center',
		margin: 30
	},
	tableCustom: {
		border: '1px solid #E2E2EA',
		borderRadius: '20px',
		opacity: '1',
		margin: '10px auto'
	},
	statusConfirm: {
		fontFamily: 'Poppins',
		fontWeight: 500,
		padding: 10,
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#36D698',
		border: '1px solid #30d7961a',
		borderRadius: '10px',
		background: '#3dd5981a 0% 0% no-repeat padding-box'
	},
	statusPending: {
		padding: 10,
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#FF984A',
		border: '1px solid #ff9a4d1a',
		borderRadius: '10px',
		background: '#ff984a1a 0% 0% no-repeat padding-box'
	},
	headerSelect: {
		width: '140px',
		// backgroundColor: 'white',
		border: 'none',
		height: '42px',
		borderTopRightRadius: '10px',
		borderBottomRightRadius: '10px',
		color: '#FFFFFF',
		backgroundColor: '#00998C',
		fontSize: '14px'
	},
	selectRestaurent: {
		background: '#00998C 0% 0% no-repeat padding-box',
		// borderRadius: '10px',
		opacity: '1',
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px',
		margin: '0'
	},
	header: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600,
		fontSize: '24px',
		marginTop: 20
	}
});

const SpaBookingList = props => {
	const classes = useStyles();
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setDataEdit] = useState({});
	const [datesArray, setDatesArray] = useState([]);

	useEffect(() => {
		props.startLoader();
		props.fetchAppointment();
	}, []);

	const toggleEdit = () => {
		setOpenEdit(!openEdit);
	};

	const handleEdit = (event, data) => {
		event.preventDefault();
		console.log('Edit Data', data);
		// setDataEdit(data);
		// toggleEdit();
	};

	useEffect(() => {
		if (props.appointments) {
			// toast.success('Booking Updated Successfully');
			// toggleEdit();
			props.fetchAppointmentsData();
			// let unique = props.appointmentsData.filter((item, i, ar) => ar.indexOf(item) === i);
		}
	}, [props.appointments]);

	useEffect(() => {
		if (props.appointmentsData) {
			let dates = [];
			props.appointmentsData.forEach(item => {
				if (dates.indexOf(formatDate(item.StartDateTime)) === -1)
					dates.push(formatDate(item.StartDateTime));
			});
			setDatesArray(dates);
		}
	}, [props.appointmentsData]);

	const formatDate = date => {
		return date ? date.split('T')[0] : date;
	};

	return (
		<div className={classes.container}>
			<Grid
				container
				style={{
					justifyContent: 'space-between'
				}}
			>
				<Grid item md={6} sm={6} xs={12}>
					<Typography className={classes.header}>Bookings</Typography>
				</Grid>
				<Grid item md={1} sm={1} xs={12}></Grid>
				<Grid item style={{ margin: 'auto 0' }} md={5} sm={5} xs={12}>
					<Grid
						container
						style={{ justifyContent: 'flex-end', width: '100%', margin: '0' }}
					>
						<Grid item md={6} sm={6} xs={12}>
							<Paper
								style={{
									marginLeft: 'auto',
									boxShadow: 'none',
									maxWidth: '260px',
									borderRadius: '10px',
									border: '1px solid #E2E2EA',
									display: 'flex',
									marginRight: '15px'
								}}
							>
								<InputBase
									style={{ padding: '6px 8px' }}
									placeholder="Type to search"
									className={classes.searchBox}
								></InputBase>
								<IconButton style={{ padding: '6px' }}>
									<SearchIcon />
								</IconButton>
							</Paper>
						</Grid>
						<Grid
							item
							md={6}
							sm={6}
							xs={12}
							style={{
								float: 'right',
								display: 'flex',
								flexDirection: 'row',
								maxWidth: '220px'
							}}
						>
							<Grid
								item
								xs={12}
								style={{
									justifyContent: 'flex-end',
									display: 'flex',
									flexDirection: 'row',
									alignItems: 'center',
									borderRadius: '20px'
								}}
							>
								<p
									className={classes.selectRestaurent}
									style={{
										padding: '12px 0px 12px 12px',
										fontFamily: ['Roboto', 'sans-sarif'],
										color: '#FAFAFB'
									}}
								>
									Sort by:
								</p>
								<FormControl variant="outlined">
									<select
										className={classes.headerSelect}
										onChange={e => selectChange(e)}
									>
										<option value="Treatment #1">Treatment1</option>
										<option value="Treatment #2">Treatment2</option>
										<option value="Treatment #3">Treatment3</option>
									</select>
								</FormControl>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{props.loading === true ? (
				<Loader />
			) : (
				<div>
					{/* <div className={classes.tableCustom}> */}
					<Paper elevation={0} style={{ borderRadius: '20px' }}>
						{props.appointments &&
							props.appointmentsData &&
							props.appointments.length > 0 &&
							datesArray.map(row => {
								return (
									<Table
										className={classes.table}
										aria-label="simple table"
										m={5}
										key={row}
									>
										<TableHead style={{ borderRadius: '20px' }}>
											<TableRow key="date">
												<TableCell
													style={{
														marginLeft: '15px',
														marginTop: '10px',
														textAlign: 'left'
													}}
													colSpan="7"
												>
													{row}
												</TableCell>
											</TableRow>
											<TableRow
												style={{ background: '#fafafb', borderRadius: 20 }}
											>
												<TableCellHeader
													style={{ width: 150, textAlign: 'left' }}
												>
													Id
												</TableCellHeader>
												<TableCellHeader>Duration</TableCellHeader>
												<TableCellHeader>Client Id</TableCellHeader>
												{/* <TableCellHeader>Restaurant</TableCellHeader> */}
												<TableCellHeader>Treatment</TableCellHeader>
												<TableCellHeader>Date & Time</TableCellHeader>
												<TableCellHeader>Status</TableCellHeader>
												<TableCellHeader align="right">Action</TableCellHeader>
											</TableRow>
										</TableHead>
										<TableBody>
											{props.appointmentsData.length &&
												props.appointmentsData
													.filter(data => formatDate(data.StartDateTime) == row)
													.map(data => {
														return (
															<TableRow key={data.Id}>
																<TableCell
																	style={{ width: 150, textAlign: 'left' }}
																>
																	{data.Id}
																</TableCell>
																<TableCell>{data.Duration}</TableCell>
																<TableCell>{data.ClientId}</TableCell>
																<TableCell>{data.ProgramId}</TableCell>
																<TableCell>{data.StartDateTime}</TableCell>
																<TableCell>
																	<div className={classes[data.Status]}>
																		{data.Status}
																	</div>
																</TableCell>
																<TableCell>
																	<FontIcon
																		style={{ transform: 'rotate(90deg)' }}
																		className="material-icons"
																	>
																		more_vert
																	</FontIcon>
																</TableCell>
															</TableRow>
															// <TableRow>
															// 	<TableCell
															// 		style={{ width: 150, textAlign: 'left' }}
															// 	>
															// 		Stan Smith
															// 	</TableCell>
															// 	<TableCell>+44 3069 990227</TableCell>
															// 	<TableCell>stan.smith@gmail.com</TableCell>
															// 	{/* <TableCell>Restaurant #1</TableCell> */}
															// 	<TableCell>Medical Treatment</TableCell>
															// 	<TableCell>Jan 29, 2020, 3:30pm</TableCell>
															// 	<TableCell>
															// 		<div className={classes.statusConfirm}>
															// 			Confirmed
															// 		</div>
															// 	</TableCell>
															// 	<TableCell
															// 		align="right"
															// 		onClick={e => handleEdit(e, row)}
															// 	>
															// 		<FontIcon
															// 			style={{ transform: 'rotate(90deg)' }}
															// 			className="material-icons"
															// 		>
															// 			more_vert
															// 		</FontIcon>
															// 	</TableCell>
															// </TableRow>
														);
													})}
										</TableBody>
									</Table>
								);
							})}
					</Paper>
					{/* </div> */}
					{/* <Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: 65 }} align="left">
									Actions
								</TableCell>
								<TableCell align="left">ID</TableCell>
								<TableCell align="left">Customer Name</TableCell>
								<TableCell align="left">Email</TableCell>
								<TableCell align="left">Phone</TableCell>
								<TableCell align="left">Restaurant </TableCell>
								<TableCell align="left">Table</TableCell>
								<TableCell align="left">Time Slot</TableCell>
								<TableCell align="left">For Date</TableCell>
								<TableCell align="left">Status</TableCell>
								<TableCell align="left">Created At</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.bookings &&
								props.bookings.length > 0 &&
								props.bookings.map(row => (
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
										</TableCell>
										<TableCell align="left" scope="row">
											{row.id}
										</TableCell>
										<TableCell align="left">{row.customerName}</TableCell>
										<TableCell align="left">{row.customerEmail}</TableCell>
										<TableCell align="left">{row.customerPhone}</TableCell>
										<TableCell align="left">
											{row.restrauntDetails && row.restrauntDetails.name
												? row.restrauntDetails.name
												: row.restrauntId}
										</TableCell>
										<TableCell align="left">
											{row.tableDetails && row.tableDetails.name
												? row.tableDetails.name
												: row.tableId}
										</TableCell>
										<TableCell align="left">
											{row.slotDetails && row.slotDetails.name
												? row.slotDetails.name
												: row.slotId}
										</TableCell>
										<TableCell align="left">{row.forDate}</TableCell>
										<TableCell align="left" className={classes.textTransform}>
											{row.status}
										</TableCell>
										<TableCell align="left">{row.createdAt}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table> */}

					{(!props.bookings || (props.bookings && !props.bookings.length)) && (
						<div className={classes.noData}>No Data Available</div>
					)}
				</div>
			)}
			{/* {openEdit ? (
				<DialogComponentEdit
					open={openEdit}
					handleClose={toggleEdit}
					data={editData}
					edit={props.updateBooking}
					startLoader={props.startLoader}
				/>
			) : null} */}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		bookings: state.newBooking.bookingsData,
		appointments: state.spa.appointments,
		appointmentsData: state.spa.appointmentsData,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchAppointment,
			fetchAppointmentsData,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SpaBookingList)
);
