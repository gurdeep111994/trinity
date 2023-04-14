import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Doughnut } from 'react-chartjs-2';
import { Line, Bar } from 'react-chartjs-2';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fontFace } from 'glamor';
import FontIcon from 'material-ui/FontIcon';
import { fetchBookings, fetchRestaurants } from '../actions';
import BookingGraph from './bookingChart';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import logo from '../../../assets/access_time.svg'

const TableCell = withStyles({
	root: {
		padding: '8px 12px',
		wordBreak: 'break-all'
	}
})(MuiTableCell);

const useStyles = makeStyles({
	// root: {
	// 	flexGrow: 1
	// },

	paper: {
		textAlign: 'center'
	},
	container: {
		// margin: '0 10px',
		display: 'flex',
		flexDirection: 'column'
	},
	dashboardHeading: {
		fontSize: '24px',
		letterSpacing: '0.1px',
		color: '#171725',
		opacity: '1'
	},
	selectRestaurent: {
		background: '#00998C 0% 0% no-repeat padding-box',
		opacity: '1',
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px',
		margin: '0'
	},
	poppinsSemiBold: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 500
	},
	pendingtable: {
		marginTop: '30px',
		// minHeight: '150px',
		border: '1px solid #E2E2EA;',
		borderRadius: '23'
	},
	pTopHeading: {
		fontSize: '16px',
		color: '#696974'
	},
	pHeading: {
		fontSize: '16px',
		color: '#171725'
	},
	noneBorder: {
		border: 'none',
		fontSize: '14px',
		color: '#92929D',
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 400
	},
	rowColor: {
		backgroundColor: 'white',
		paddingLeft: 10
	},
	cardsPadding: {
		padding: '15px'
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
	}
});

const Dashboard = props => {
	const classes = useStyles();
	const data = [20, 45, 36, 25];
	const [chartData, useData] = useState({
		dataLine: {
			labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
			datasets: [
				{
					label: 'My First dataset',
					fill: true,
					lineTension: 0.3,
					backgroundColor: 'rgba(225, 204,230, .3)',
					borderColor: 'rgb(205, 130, 158)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgb(205, 130,1 58)',
					pointBackgroundColor: 'rgb(255, 255, 255)',
					pointBorderWidth: 10,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgb(0, 0, 0)',
					pointHoverBorderColor: 'rgba(220, 220, 220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: [65, 59, 80, 81, 56, 55, 40]
				}
			]
		}
	});

	const [barChartData, setBarChartData] = useState({
		dataBar: {
			labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			datasets: [
				{
					label: '% of Votes',
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(255, 134,159,0.4)',
						'rgba(98,  182, 239,0.4)',
						'rgba(255, 218, 128,0.4)',
						'rgba(113, 205, 205,0.4)',
						'rgba(170, 128, 252,0.4)',
						'rgba(255, 177, 101,0.4)'
					],
					borderWidth: 2,
					borderColor: [
						'rgba(255, 134, 159, 1)',
						'rgba(98,  182, 239, 1)',
						'rgba(255, 218, 128, 1)',
						'rgba(113, 205, 205, 1)',
						'rgba(170, 128, 252, 1)',
						'rgba(255, 177, 101, 1)'
					]
				}
			]
		},
		barChartOptions: {
			responsive: true,
			maintainAspectRatio: true,
			scales: {
				xAxes: [
					{
						barPercentage: 1,
						gridLines: {
							display: true,
							color: 'rgba(0, 0, 0, 0.1)'
						}
					}
				],
				yAxes: [
					{
						gridLines: {
							display: true,
							color: 'rgba(0, 0, 0, 0.1)'
						},
						ticks: {
							beginAtZero: true
						}
					}
				]
			}
		}
	});
	const [labelWidth, setLabelWidth] = React.useState(0);

	const [details, setDetails] = useState({
		restaurentName: 'Restaurant #1'
	});

	const [bookingsFilterdata, setBookingData] = useState([]);
	const [selectedId, setSelectedRestaurant] = useState(0);

	const handleChange = event => {
		event.preventDefault();
	};

	useEffect(() => {
		props.fetchBookings();
		props.fetchRestaurants();
	}, []);

	useEffect(() => {
		if (props.bookings) {
			// let dates = [];
			// props.bookings.forEach(booking => {
			// 	if (dates.indexOf(booking.forDate) === -1) {
			// 		dates.push(booking.forDate);
			// 	}
			// });
			// setDateArray(dates);
			setBookingData(props.bookings);
		}
	}, [props.bookings]);

	const selectChange = e => {
		e.preventDefault();

		const value = e.target.value;
		setSelectedRestaurant(value);
		filterbookingByRestaurant(value);
	};

	const filterbookingByRestaurant = selectedId => {
		// let filteredDates = [];
		let filteredData = [];
		if (selectedId == 0) {
			setBookingData(props.bookings);
			// props.bookings.forEach(booking => {
			// 	if (filteredDates.indexOf(booking.forDate) === -1) {
			// 		filteredDates.push(booking.forDate);
			// 	}
			// });
		} else {
			filteredData = props.bookings.filter(
				item => item.restrauntId == selectedId
			);
			// filteredData.forEach(item => {
			// 	if (filteredDates.indexOf(item.forDate) === -1)
			// 		filteredDates.push(item.forDate);
			// });
			setBookingData(filteredData);
		}

		// setDateArray(filteredDates);
	};

	return (
		// <div className={classes.container}>
		<Grid className="dashboard_container" fixed>
			<Grid
				container
				direction="column"
				style={{ margin: '0px', width: '100%' }}
			>
				<Grid
					container
					direction="row"
					style={{ paddingBottom: '20px', justifyContent: 'space-between' }}
				>
					<Grid item md={8} sm={8} xs={12}>
						{/* <Typography
							className={`${classes.dashboardHeading} ${classes.poppinsSemiBold}`}
						>
							Dining overview
						</Typography> */}
						<h2 className="mainHeading">Dining overview</h2>
					</Grid>
					{/* <Grid item md={1} sm={1} xs={12}></Grid> */}
					<Grid
						item
						md={4}
						sm={4}
						xs={12}
						style={{
							maxWidth: '195px'
						}}
						className="slectorWbgBox"
					>
						<p className="selectorWbgText">Show: </p>
						<FormControl variant="outlined">
							<select
								value={selectedId}
								className={classes.headerSelect}
								onChange={e => selectChange(e)}
							>
								<option value={0} key={0}>
									Select all
								</option>
								{props.restaurants.map(item => (
									<option value={item.id} key={item.id}>
										{item.name}
									</option>
								))}
							</select>
						</FormControl>
						<div className="caretBox"></div>
					</Grid>
				</Grid>

				<Grid container spacing={3}>
					<Grid item md={8} xs={12} style={{ minHeight: '150px' }}>
						<Paper
							elevation={0}
							style={{ borderRadius: '20px' }}
							className={classes.cardsPadding}
						>
							<Typography
								style={{ marginBottom: '10px' }}
								className="graphHeading"
							>
								Booking Report
							</Typography>
							<div>
								<Bar
									data={barChartData.dataBar}
									options={barChartData.barChartOptions}
									height="150px"
								/>
							</div>
						</Paper>
					</Grid>
					<Grid item md={4} xs={12} style={{ minHeight: '150px' }}>
						<Grid container spacing={3} direction="column">
							<Grid item xs>
								<Paper
									elevation={0}
									style={{ borderRadius: '20px' }}
									className={classes.cardsPadding}
								>
									<Typography className="graphHeading">
										Hourly Report
									</Typography>
									{/* <Doughnut data={chartData.data} /> */}
									<div style={{ marginTop: '15px' }}>
										<Line
											data={chartData.dataLine}
											options={{ responsive: true }}
											height="240"
										/>
									</div>
								</Paper>
							</Grid>
							<Grid item xs>
								<Paper
									elevation={0}
									style={{
										minHeight: '70px',
										borderRadius: '20px',
										padding: '20px'
									}}
								>
									<Typography className="graphHeading">Sales</Typography>
									<Grid
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											margin: '52px 0px'
										}}
									>
										<Typography
											style={{
												fontFamily: ['Poppins', 'sans-sarif'],
												fontSize: '28px',
												color: '#171725',
												fontWeight: '600'
											}}
										>
											$27632
										</Typography>
										<Typography
											style={{
												fontFamily: ['Poppins', 'sans-sarif'],
												fontSize: '16px',
												color: '#3DD598',
												fontWeight: '600'
											}}
										>
											+2.5
										</Typography>
									</Grid>
									<Typography
										style={{
											fontFamily: ['Roboto', 'sans-sarif'],
											fontSize: '14px',
											color: '#696974',
											fontWeight: 400
										}}
									>
										Compared to ($21340 last year)
									</Typography>
								</Paper>
							</Grid>
						</Grid>
					</Grid>
				</Grid>

				<Grid
					container
					spacing={3}
					style={{
						border: '1px solid #ddd',
						borderRadius: '10px',
						padding: '20px',
						marginTop: 20
					}}
				>
					{/* <Grid item xs={12}  m={5}> */}
					<Typography
						className={`${classes.pTopHeading} ${classes.poppinsSemiBold}`}
					>
						Pending
					</Typography>
					<Grid container spacing={3} direction="column">
						<Grid item xs>
							{/* <Paper elevation={0} style={{ borderRadius: '20px' }}> */}
							<Table className={classes.table} aria-label="simple table">
								{/* <TableHead>
											<TableRow>
												<TableCell align="left" style={{ width: 100 }}>Couple Table</TableCell>
												<TableCell align="left">Customer Name</TableCell>
											</TableRow>
										</TableHead> */}
								<TableBody>
									{bookingsFilterdata && bookingsFilterdata.length ? (
										bookingsFilterdata.map(booking => {
											return (
												<div>
													<TableRow
														style={{
															display: 'flex',
															justifyContent: 'space-between',
															alignItems: 'center',
															borderRadius: '20px'
														}}
														className={classes.rowColor}
													>
														<TableCell
															style={{ minWidth: 150 }}
															className={classes.noneBorder}
														>
															{/* {' '} */}
															<Typography
																className={`${classes.pHeading} ${classes.poppinsSemiBold}`}
															>
																{booking.tableDetails.name}
															</Typography>
															{booking.restrauntDetails.name}
														</TableCell>
														<TableCell className={classes.noneBorder}>
															{booking.customerTitle} {booking.customerName}
														</TableCell>
														<TableCell className={classes.noneBorder}>
															{/* Monday, January 28 */}
															{booking.forDate}
														</TableCell>
														<TableCell className={classes.noneBorder}>
															{booking.slotDetails.from}
														</TableCell>
														<TableCell className={classes.noneBorder}>
															2/4
														</TableCell>
														{/* <TableCell className={classes.noneBorder}>
															{booking.customerEmail}
														</TableCell> */}
														<TableCell className={classes.noneBorder}>
															{/* +44 3069 990227 */}
															{booking.customerPhone}
														</TableCell>
														<TableCell className={classes.noneBorder}>
															{/* stan.smith@gmail.com */}
															{booking.customerEmail}
														</TableCell>
														{/* <TableCell className={classes.noneBorder}>
															<FontIcon
																style={{ transform: 'rotate(90deg)' }}
																className="material-icons"
															></FontIcon>
														</TableCell> */}
														<TableCell
															className={classes.noneBorder}
															style={{ width: 50, textAlign: 'center' }}
														>
															<FontIcon
																style={{ transform: 'rotate(90deg)' }}
																className="material-icons"
															>
																more_vert
															</FontIcon>
														</TableCell>
													</TableRow>
													<TableRow style={{ height: '10px' }}></TableRow>
												</div>
											);
										})
									) : (
										<TableRow>
											<TableCell className={classes.noneBorder} colSpan={8}>
												No Pending Bookings
											</TableCell>
										</TableRow>
									)}
								</TableBody>
							</Table>
							{/* </Paper> */}
						</Grid>
					</Grid>
					{/* </Grid> */}
				</Grid>
			</Grid>
		</Grid>
		//{' '}
		// </div>
	);
};

const mapStateToProps = (state, ownProps) => {
	const pendingBookings = !state.newBooking.bookingsData
		? []
		: state.newBooking.bookingsData.filter(item => item.status === 'pending');
	return {
		bookings: pendingBookings,
		restaurants: state.newBooking.restaurantsData
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchBookings,
			fetchRestaurants
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
