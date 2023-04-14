import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Line, Bar } from 'react-chartjs-2';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MuiTableCell from '@material-ui/core/TableCell';
import { startLoader } from '../../loader/actions';
import { fetchLocalBookings } from '../actions';

const TableCell = withStyles({
	root: {
		padding: '8px 12px',
		border: 'none',
		fontSize: '14px',
		color: '#92929D',
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 400,
		wordBreak: 'break-all'
	}
})(MuiTableCell);

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
		width: '100%'
	},
	paper: {
		textAlign: 'center'
	},
	container: {
		// margin: '0 10px',
		display: 'flex',
		flexDirection: 'column'
	},
	heading: {
		letterSpacing: '0.1px',
		color: '#171725',
		opacity: '1'
	},
	selectRestaurent: {
		background: '#FFFFFF 0% 0% no-repeat padding-box',
		borderRadius: '10px',
		opacity: '1'
	},
	rowColor: {
		backgroundColor: 'white',
		paddingLeft: 10
	},
	pHeading: {
		fontSize: '16px',
		color: '#171725'
	},
	pendingtable: {
		marginTop: '30px',
		minHeight: '150px',
		border: '1px solid #E2E2EA;',
		borderRadius: '23'
	},
	dashboardHeading: {
		fontSize: '24px',
		letterSpacing: '0.1px',
		color: '#171725',
		opacity: 1
	},
	cardsPadding: {
		padding: '15px',
		borderRadius: '20px'
	},
	pTopHeading: {
		fontSize: '16px',
		color: '#696974'
	},
	poppinsSemiBold: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 500
	}
});

const DashboardActive = props => {
	const classes = useStyles();
	const [chartData] = useState({
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

	const [barChartData] = useState({
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

	useEffect(() => {
		props.startLoader();
		props.fetchLocalBookings();
	}, []);

	return (
		// <div className={classes.container}>
		<Grid className="dashboard_container" fixed>
			<Grid container direction="column" spacing={3}>
				<Grid container direction="row" style={{ paddingBottom: '20px' }}>
					<Grid item>
						{/* <Typography
							className={`${classes.dashboardHeading} ${classes.poppinsSemiBold}`}
						>
							Active overview
						</Typography> */}
						<h2 className="mainHeading">Active overview</h2>
					</Grid>
				</Grid>

				<Grid container spacing={3}>
					<Grid item md={8} xs={12} style={{ minHeight: '150px' }}>
						<Paper elevation={0} className={classes.cardsPadding}>
							<Typography
								className="graphHeading"
								style={{ marginBottom: '10px' }}
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
								<Paper elevation={0} className={classes.cardsPadding}>
									<Typography className="graphHeading">
										Hourly Report
									</Typography>
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
											className={classes.poppinsSemiBold}
											style={{
												fontSize: '28px',
												color: '#171725'
											}}
										>
											$27632
										</Typography>
										<Typography
											className={classes.poppinsSemiBold}
											style={{
												fontSize: '16px',
												color: '#3DD598'
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
			</Grid>
		</Grid>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		bookings: state.active.localDataBooking,
		success: state.active.localDataSuccess
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchLocalBookings,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DashboardActive)
);
