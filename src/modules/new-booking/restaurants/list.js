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
import {
	Button,
	Grid,
	Paper,
	InputBase,
	IconButton,
	Typography
} from '@material-ui/core';
import DialogComponent from './../../shared/confirmDeleteDialog';
import Loader from '../../../lib/Loader';
import { fetchRestaurants, deleteRestaurant } from '../actions';
import { startLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import SearchIcon from '@material-ui/icons/Search';
import ProgressBar from './progressBar';
import FontIcon from 'material-ui/FontIcon';
const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
	container: {
		margin: '0 5px'
	},
	noData: {
		textAlign: 'center',
		margin: 30
	},
	searchBox: {
		marginLeft: '10px',
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 400,
		fontSize: '14px'
	},
	addButton: {
		cursor: 'pointer',
		width: '100px',
		height: '100px',
		background: 'rgba(22, 195, 166, 0.1) 0% 0% no-repeat padding-box',
		// opacity: '0.1',
		borderRadius: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	paperDiv: {
		display: 'flex',
		flexDirection: 'column',
		justifycontent: 'center',
		alignItems: 'center',
		marginTop: '80px'
	},
	plusIcon: {
		fontSize: '100px',
		color: '#16C3A6'
	},
	addNewText: {
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 400,
		fontSize: '14px',
		color: '#92929D'
	},
	addNewTextHeader: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600,
		fontSize: '18px',
		color: '#171725',
		marginTop: '40px'
	},
	paperOuter: {
		padding: '20px',
		borderRadius: '25px'
	},

	// hotel data paper

	paperOuterAll: {
		padding: '20px',
		borderRadius: '20px'
	},
	hotelName: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 500,
		fontSize: '17px'
	},
	logoSpace: {
		height: '120px',
		// backgroundColor: 'red',
		marginTop: '20px',
		marginBottom: '20px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	addressTitel: {
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 500,
		fontSize: '14px',
		textAlign: 'left',
		color: '#171725'
	},
	addressText: {
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 400,
		fontSize: '14px',
		textAlign: 'left',
		color: '#92929D'
	},
	bookedTitel: {
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 500,
		fontSize: '14px',
		textAlign: 'left',
		color: '#171725',
		float: 'left'
	},
	progressText: {
		fontFamily: ['Roboto', 'sans-sarif'],
		fontWeight: 400,
		fontSize: '14px',
		textAlign: 'right',
		color: '#92929D',
		float: 'right'
	},
	progressBar: {
		marginTop: '5px'
	}
});

const RestaurantsList = props => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({});

	useEffect(() => {
		props.startLoader();
		props.fetchRestaurants();
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
			toast.success('Restaurant Deleted Successfully');
			props.fetchRestaurants();
		}
	}, [props.deleteSuccess]);

	console.log('Restaurent', props.restaurants);
	return (
		<div className={classes.container}>
			{/* headnf grid */}
			<Grid
				container
				style={{ justifyContent: 'space-between', marginBottom: '18px' }}
			>
				<Grid item md={9} sm={9} xs={12}>
					<h2 className="mainHeading">Restaurants</h2>
				</Grid>
				<Grid
					item
					md={3}
					sm={3}
					xs={12}
					style={{
						margin: 'auto 0',
						display: 'flex',
						justifyContent: 'flex-end'
					}}
				>
					<Paper className="searchBtn ">
						<InputBase
							style={{ padding: '6px 8px', width: '250px' }}
							placeholder="Type to search"
							className={classes.searchBox}
						></InputBase>
						<img src="/assets/images/apps/search-icon.svg" />
						{/* <IconButton style={{ padding: '6px',float: 'right' }}>
																
								</IconButton> */}
					</Paper>
					{/* <Paper style={{ margin: 25 }}>
						<InputBase
							placeholder="Type to search"
							className={classes.searchBox}
						></InputBase>
						<IconButton style={{ padding: '5px', float: 'right' }}>
							<SearchIcon />
						</IconButton>
					</Paper> */}
				</Grid>
			</Grid>

			{/* <Button
				variant="outlined"
				onClick={e => {
					e.preventDefault();
					props.history.push('/bookings/restaurants/add');
				}}
			>
				New Restaurant
			</Button> */}
			{props.loading === true ? (
				<Loader />
			) : (
				<div>
					{/* add resturant grid */}
					<Grid container spacing={2}>
						<Grid item lg={3} md={6} sm={12} xs={12}>
							{/* add resturant card */}
							<Paper
								className={classes.paperOuter}
								style={{ boxShadow: '0px 6px 29px 0px rgba(0, 0, 0, 0.04)' }}
							>
								<div className={classes.paperDiv}>
									<div
										className={classes.addButton}
										onClick={e => {
											e.preventDefault();
											props.history.push('/bookings/restaurants/add');
										}}
									>
										{/* <Typography	component="h4" varient="h4" className={classes.plusIcon}>+</Typography> */}
										<img src={'/assets/images/addrestcon.png'} alt=" +" />
									</div>
									<div>
										<Typography
											component="h4"
											varient="h4"
											className={classes.addNewTextHeader}
										>
											Add new restaurant
										</Typography>
									</div>
								</div>
								<div style={{ textAlign: 'center', marginBottom: '37px' }}>
									<Typography component="p" className={classes.addNewText}>
										Add new restaurant and start manage bookings, tables and
										slots
									</Typography>
								</div>
							</Paper>
						</Grid>

						{/* daynamic data grid */}

						{props.restaurants.length > 0 &&
							props.restaurants.map(card => (
								<Grid id={card.id} item lg={3} md={6} sm={12} xs={12}>
									<Paper
										className={classes.paperOuterAll}
										style={{
											boxShadow: '0px 6px 29px 0px rgba(0, 0, 0, 0.04)'
										}}
									>
										<div
											style={{
												display: ' flex',
												justifyContent: 'space-between'
											}}
										>
											<Typography
												component="p"
												varient="h4"
												className={classes.hotelName}
											>
												{card.name}
												{/* Fuzen at Hale */}
											</Typography>
											<FontIcon className="material-icons" color={'#92929D'}>
												more_vert
											</FontIcon>
										</div>
										<div className={classes.logoSpace}>
											{/* <Typography component="h5" varient="h5"> Restaurant Logo </Typography> */}
											<img
												src={'/assets/images/halelogo.png'}
												className="resurant-logo"
												alt=" Restaurant Logo"
											/>
										</div>
										<div>
											<Typography
												component="h5"
												varient="h5"
												className={classes.addressTitel}
											>
												Address:
											</Typography>
											<Typography
												component="p"
												varient="p"
												className={classes.addressText}
											>
												100 Henley Road BOWCOMBE, P0301AR
											</Typography>
										</div>
										<div
											style={{
												display: ' flex',
												justifyContent: 'space-between',
												marginTop: '10px'
											}}
										>
											<Typography
												className={classes.bookedTitel}
												component="h5"
												varient="h5"
											>
												Booked
											</Typography>
											<Typography
												className={classes.progressText}
												component="p"
												varient="p"
											>
												80/100
											</Typography>
										</div>
										<div className={classes.progressBar}>
											<ProgressBar />
										</div>
										<div
											style={{
												display: ' flex',
												justifyContent: 'center',
												marginTop: '16px'
											}}
										>
											<button className="btn-default veiwBookbtn">
												View Bookings
											</button>
										</div>
									</Paper>
								</Grid>
							))}
					</Grid>
					{/* <Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow>
								<TableCell style={{ width: 65 }} align="left">
									Actions
								</TableCell>
								<TableCell align="left">ID</TableCell>
								<TableCell align="left">Name</TableCell>
								<TableCell align="left">Address</TableCell>
								<TableCell align="left">Created At</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{props.restaurants.length > 0 &&
								props.restaurants.map(row => (
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
										<TableCell align="left">{row.address}</TableCell>
										<TableCell align="left">{row.createdAt}</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table> */}
					{(!props.restaurants ||
						(props.restaurants && !props.restaurants.length)) && (
						<div className={classes.noData}>No Data Available</div>
					)}
				</div>
			)}
			{open ? (
				<DialogComponent
					open={open}
					handleClose={toggle}
					data={data}
					delete={props.deleteRestaurant}
					startLoader={props.startLoader}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		restaurants: state.newBooking.restaurantsData,
		deleteSuccess: state.newBooking.deleteRestaurantSuccess,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchRestaurants,
			deleteRestaurant,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(RestaurantsList)
);
