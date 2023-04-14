import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DialogComponentEdit from './edit';
import Loader from '../../../lib/Loader';
import {
	fetchBookings,
	updateBooking,
	fetchBookingsByStatus
} from '../actions';
import { startLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import FormControl from '@material-ui/core/FormControl';
import FontIcon from 'material-ui/FontIcon';
import {
	Grid,
	Paper,
	InputBase,
	Select,
	MenuItem,
	InputLabel,
	Button
} from '@material-ui/core';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../../modules/pagination/tablePagination';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const TableCell = withStyles({
	root: {
		borderBottom: 'none',
		textAlign: 'center'
	}
})(MuiTableCell);

const useStyles = makeStyles(theme => ({
	table: {
		width: '99%',
		tablLayout: 'fixed',
		margin: '15px auto'
	},
	container: {
		margin: '0 10px'
	},
	textTransform: {
		textTransform: 'capitalize'
	},
	noData: {
		textAlign: 'center !important',
		margin: 30
	},
	tableCustom: {
		border: '1px solid #E2E2EA',
		borderRadius: '20px',
		opacity: '1',
		margin: '10px auto'
	},
	confirmed: {
		fontFamily: `'Roboto', sans-serif!important`,
		textTransform: 'capitalize',
		fontWeight: 500,
		padding: 3,
		fontSize: '12px',
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#30D796',
		border: '1px solid rgba(48, 215, 150, .5)',
		borderRadius: '5px'
	},
	pending: {
		fontFamily: `'Roboto', sans-serif!important`,
		textTransform: 'capitalize',

		fontWeight: 500,
		padding: 3,
		fontSize: '12px',
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#FF974A',
		border: '1px solid rgba(255, 151, 74, .5)',
		borderRadius: '5px'
	},

	completed: {
		fontFamily: `'Roboto', sans-serif!important`,
		textTransform: 'capitalize',

		fontWeight: 500,
		padding: 3,
		fontSize: '12px',
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#FC5A5A',
		border: '1px solid rgba(252, 90, 90, .5) ',
		borderRadius: '5px'
	},
	selectRestaurent: {
		background: '#00998C 0% 0% no-repeat padding-box',
		// borderRadius: '10px',
		opacity: '1',
		borderTopLeftRadius: '10px',
		borderBottomLeftRadius: '10px',
		margin: '0'
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		backgroundColor: 'white',
		borderRadius: '10px'
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	},
	headerSelect: {
		width: '140px',
		border: 'none',
		height: '42px',
		borderTopRightRadius: '10px',
		borderBottomRightRadius: '10px',
		color: '#FFFFFF',
		backgroundColor: '#00998C',
		fontSize: '14px'
	},
	datepickerInput: {
		padding: '10px 5px',
		height: '20px',
		margin: '0',
		fontFamily: `'Poppins', sans-serif!important`,
		fontSize: '14px',
		fontWeight: 600
	},
	outlined: {
		top: '-5px'
	},
	pagination: {
		border: 'none'
	},
	resetButton: {
		marginLeft: '7px',
		color: '#fff',
		background: '#00978b',
		border: '1px solid #00978b',
		borderRadius: '10px',
		fontFamily: `'Poppins', sans-serif!important`,
		fontSize: '14px'
	},

	gridFilters: {
		background: '#fafafb'
	}
}));

// return Pagination Page Numbers and Actions for change rows per page and page number
function Actions(handleChangePage, page, rowsPerPage, count) {
	return (
		<TablePaginationActions
			onChangePage={handleChangePage}
			page={page}
			rowsPerPage={rowsPerPage}
			count={count}
		/>
	);
}

// -----------------------------------------------------------------------------
const TablesList = props => {
	const classes = useStyles();
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setDataEdit] = useState({});
	const [tableFilter, setTableFilter] = useState([]);
	const [searchVal, setSearchVal] = React.useState('');
	const [searchRestaurant, setSearchRestaurant] = React.useState('');
	const [searchDate, setDateEdit] = useState(null);
	const textSearch = React.useRef(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const table = props.bookingsByStatus ? props.bookingsByStatus : [];

	useEffect(() => {
		props.startLoader();
		// props.fetchBookings();
		props.fetchBookingsByStatus();
	}, []);

	const toggleEdit = () => {
		setOpenEdit(!openEdit);
	};

	useEffect(() => {
		if (props.bookingsByStatus) {
			// setTableFilter(props.bookingsByStatus);
			allFilteredData();
		}
	}, [props.bookingsByStatus]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const handleEdit = (event, data) => {
		setDataEdit(data);
		toggleEdit();
	};

	useEffect(() => {
		if (props.updateSuccess) {
			toast.success('Booking Updated Successfully');
			toggleEdit();
			props.fetchBookingsByStatus();
		}
	}, [props.updateSuccess]);

	// handle search input change
	// - search by input value
	// - check if there are searchRestaurant and searchDate set in constant state
	// - set tableFilter variable as filtered bookings
	const handleSearchCustomer = event => {
		setSearchVal(event.target.value);
		setPage(0);

		var filtered = props.bookingsByStatus;

		if (event.target.value) {
			filtered = filtered.filter(
				booking =>
					booking.customerName
						.toLowerCase()
						.includes(event.target.value.toLowerCase()) ||
					booking.customerEmail
						.toLowerCase()
						.includes(event.target.value.toLowerCase())
			);
		}
		if (searchRestaurant) {
			filtered = filtered.filter(booking =>
				booking.restrauntDetails.name
					.toLowerCase()
					.includes(searchRestaurant.toLowerCase())
			);
		}
		if (searchDate) {
			filtered = filtered.filter(booking => booking.forDate === searchDate);
		}
		setTableFilter(filtered);
	};

	// create array with all rows per page posibilities
	const allRowsPerPage = () => {
		let rowsPage = [1];
		if (tableFilter.length > 10) {
			rowsPage.push(10);
		}
		if (tableFilter.length > 25) {
			rowsPage.push(25);
		}
		if (tableFilter.length < 50) {
			rowsPage.push({ label: 'All', value: tableFilter.length });
		}
		return rowsPage;
	};

	// handle restaurant selected change
	// - search by new restaurant selected
	// - check if there are searchVal and searchDate set in constant state
	// - set tableFilter variable as filtered bookings
	const selectRestaurantChange = event => {
		setSearchRestaurant(event.target.value);

		var filtered = props.bookingsByStatus;

		if (event.target.value) {
			filtered = filtered.filter(booking =>
				booking.restrauntDetails.name
					.toLowerCase()
					.includes(event.target.value.toLowerCase())
			);
		}
		if (searchVal && textSearch.current.value === searchVal) {
			filtered = filtered.filter(booking =>
				booking.customerName.toLowerCase().includes(searchVal.toLowerCase())
			);
		}
		if (searchDate) {
			filtered = filtered.filter(booking => booking.forDate === searchDate);
		}

		setTableFilter(filtered);
	};

	// handle booking date changed
	// - search by date selected
	// - check if there are searchRestaurant and searchVal set in constant state
	// - set tableFilter variable as filtered bookings
	const selectDateChange = event => {
		const date = event.format('YYYY-MM-DD');
		setDateEdit(date);

		var filtered = props.bookingsByStatus;
		if (date) {
			filtered = filtered.filter(booking => booking.forDate === date);
		}
		if (searchRestaurant) {
			filtered = filtered.filter(booking =>
				booking.restrauntDetails.name
					.toLowerCase()
					.includes(searchRestaurant.toLowerCase())
			);
		}
		if (searchVal && textSearch.current.value === searchVal) {
			filtered = filtered.filter(booking =>
				booking.customerName.toLowerCase().includes(searchVal.toLowerCase())
			);
		}

		setTableFilter(filtered);
	};

	// reset all filters: searchVal, searchDate, searchRestaurant and set tableFilter to initial props.bookings
	const resetFilters = () => {
		setDateEdit(null);
		setSearchRestaurant('');
		setSearchVal('');
		textSearch.current.value = null;
		setTableFilter(props.bookingsByStatus);
	};

	// Verify if table has filters active and use it when page is loading
	const allFilteredData = () => {
		var filtered = props.bookingsByStatus;

		if (searchRestaurant) {
			filtered = filtered.filter(booking =>
				booking.restrauntDetails.name
					.toLowerCase()
					.includes(searchRestaurant.toLowerCase())
			);
		}
		if (searchVal && textSearch.current.value === searchVal) {
			filtered = filtered.filter(booking =>
				booking.customerName.toLowerCase().includes(searchVal.toLowerCase())
			);
		}
		if (searchDate) {
			filtered = filtered.filter(booking => booking.forDate === searchDate);
		}

		setTableFilter(filtered);
	};

	// RETURN DOM
	return (
		<div className={classes.container} style={{ paddingBottom: '2rem' }}>
			<Grid
				container
				style={{
					justifyContent: 'space-between',
					padding: ' 0 1rem 0.8rem 0'
				}}
			>
				<Grid item md={4} sm={4} xs={12}>
					<h2 className="mainHeading">Bookings</h2>
				</Grid>
				<Grid
					item
					md={8}
					sm={8}
					xs={12}
					style={{
						justifyContent: 'flex-end',
						display: 'flex',
						width: '100%',
						margin: '0'
					}}
				>
					<Grid item md={3} sm={3} xs={12}>
						{/* <Paper className="searchBtn">
							<InputBase
								style={{ padding: '6px 8px', width: '250px' }}
								placeholder="Type to search"
								className={classes.searchBox}
								onKeyUp={handleSearchCustomer}
								ref={textSearch}
							>
								{' '}
								
							</InputBase><img
							src="/assets/images/apps/search-icon.svg"
							style={{ width: '20px' }}
						/>
						</Paper> */}
					</Grid>
					<Grid
						item
						md={9}
						sm={9}
						xs={12}
						style={{}}
						className={`sortWbgBox ${classes.gridFilters}`}
					>
						<Paper className="searchBtn">
							<InputBase
								style={{ padding: '6px 8px', width: '250px' }}
								placeholder="Type to search"
								className={classes.searchBox}
								onKeyUp={handleSearchCustomer}
								ref={textSearch}
							>
								{' '}
							</InputBase>
							<img
								src="/assets/images/apps/search-icon.svg"
								style={{ width: '20px' }}
							/>
						</Paper>
						{table.length ? (
							<FormControl className={classes.formControl}>
								{/* <InputLabel
									id="demo-simple-select-outlined-label"
									style={{fontSize: '14px', fontWeight: '400', color: '#92929D', fontFamily: `'Roboto', sans-serif` ,paddingLeft: '8px'}}
								>
									Restaurant
								</InputLabel> */}

								<Select
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={searchRestaurant}
									onChange={selectRestaurantChange}
									placeholder="Restaurant"
									displayEmpty
									disableUnderline
									style={{
										padding: '10px 15px',
										height: '40px',
										width: '200px',
										fontSize: '14px',
										fontWeight: '400',
										color: '#92929D',
										fontFamily: `'Roboto', sans-serif`
									}}
								>
									{table
										.filter(
											(ele, id, array) =>
												id ===
												props.bookingsByStatus.findIndex(
													elem =>
														elem.restrauntDetails.name ==
														ele.restrauntDetails.name
												)
										)
										.map(data => (
											<MenuItem value={data.restrauntDetails.name}>
												{data.restrauntDetails.name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						) : null}

						{table.length > 0 ? (
							<FormControl className={classes.formControl}>
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<DatePicker
										style={{
											fontSize: '14px',
											fontWeight: '400',
											color: '#92929D',
											fontFamily: `'Roboto', sans-serif`
										}}
										variant="inline"
										disableUnderline
										placeholder=" YYYY-MM-DD"
										format="YYYY-MM-DD"
										disablePast={true}
										InputProps={{
											disableUnderline: true,
											fontWeight: '400'
										}}
										inputProps={{ className: classes.datepickerInput }}
										value={searchDate}
										onChange={selectDateChange}
									/>
								</MuiPickersUtilsProvider>
							</FormControl>
						) : null}
						{table.length > 0 ? (
							<Button
								variant="contained"
								color="primary"
								className={classes.resetButton}
								onClick={resetFilters}
							>
								Reset Filters
							</Button>
						) : null}
					</Grid>
				</Grid>
			</Grid>
			{props.loading === true ? (
				<Loader />
			) : (
				<div>
					<Paper
						elevation={0}
						style={{ borderRadius: '20px', padding: '10px' }}
					>
						<Table className="table" aria-label="simple table" m={5}>
							<Fragment>
								<TableHead
									className="tableHead"
									style={{ borderRadius: '20px' }}
								>
									<TableRow>
										<TableCell style={{ width: 150 }}>Customer Name</TableCell>
										<TableCell>Phone</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Restaurant</TableCell>
										<TableCell>Table</TableCell>
										<TableCell>Occupancy</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>Time</TableCell>
										<TableCell>Status</TableCell>
										<TableCell align="right">Action</TableCell>
									</TableRow>
								</TableHead>
								<TableBody
									className="tableBody"
									style={{ wordBreak: 'break-all' }}
								>
									{(rowsPerPage > 0
										? tableFilter.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
										: tableFilter
									).map(row => (
										<TableRow key={row.id}>
											<TableCell style={{ textAlign: 'left' }}>
												{' '}
												{row.customerName}
											</TableCell>
											<TableCell>{row.customerPhone}</TableCell>
											<TableCell>{row.customerEmail}</TableCell>
											<TableCell>
												{row.restrauntDetails && row.restrauntDetails.name
													? row.restrauntDetails.name
													: row.restrauntId}
											</TableCell>
											<TableCell>
												{row.tableDetails && row.tableDetails.name
													? row.tableDetails.name
													: row.tableId}
											</TableCell>
											<TableCell>
												{row.tableDetails && row.tableDetails.occupancy
													? row.tableDetails.occupancy
													: '-'}
											</TableCell>
											<TableCell>{row.forDate}</TableCell>
											<TableCell>
												{' '}
												{row.slotDetails
													? row.slotDetails.from + ' - ' + row.slotDetails.to
													: ''}{' '}
											</TableCell>
											<TableCell>
												<div className={classes[row.status]}> {row.status}</div>
											</TableCell>
											<TableCell align="left" onClick={e => handleEdit(e, row)}>
												<FontIcon
													style={{
														transform: 'rotate(90deg)',
														color: '#92929D'
													}}
													className="material-icons"
												>
													more_vert
												</FontIcon>
											</TableCell>
										</TableRow>
									))}
									{(!tableFilter || (tableFilter && !tableFilter.length)) && (
										<TableRow>
											<TableCell colSpan={10} className={classes.noData}>
												No Data Available
											</TableCell>
										</TableRow>
									)}
								</TableBody>
								{tableFilter.length > 0 ? (
									<TableFooter>
										<TableRow>
											<TablePagination
												rowsPerPageOptions={allRowsPerPage()}
												colSpan={10}
												count={tableFilter.length}
												rowsPerPage={rowsPerPage}
												page={page}
												SelectProps={{
													inputProps: { 'aria-label': 'rows per page' },
													native: true
												}}
												classes={{
													root: classes.pagination
												}}
												onChangePage={handleChangePage}
												onChangeRowsPerPage={handleChangeRowsPerPage}
												ActionsComponent={() =>
													Actions(
														handleChangePage,
														page,
														rowsPerPage,
														tableFilter ? tableFilter.length : 0
													)
												}
											/>
										</TableRow>
									</TableFooter>
								) : null}
							</Fragment>
						</Table>
					</Paper>
				</div>
			)}
			{openEdit ? (
				<DialogComponentEdit
					open={openEdit}
					handleClose={toggleEdit}
					data={editData}
					edit={props.updateBooking}
					startLoader={props.startLoader}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = state => {
	return {
		bookings: state.newBooking.bookingsData,
		bookingsByStatus: state.newBooking.bookingsByStatusData,
		deleteSuccess: state.newBooking.deleteBookingSuccess,
		updateSuccess: state.newBooking.updateBookingSuccess,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			fetchBookings,
			fetchBookingsByStatus,
			updateBooking,
			startLoader
		},
		dispatch
	);
export default connect(mapStateToProps, mapDispatchToProps)(TablesList);
