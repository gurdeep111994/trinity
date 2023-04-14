import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Loader from '../../../lib/Loader';
import toast from '../../../lib/toasts';
import SearchIcon from '@material-ui/icons/Search';
import FontIcon from 'material-ui/FontIcon';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, InputBase, IconButton, FormControl } from '@material-ui/core';

import { fetchSpaLocalBookings } from '../actions';
import { startLoader } from '../../loader/actions';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from 'modules/pagination/tablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import moment from 'moment';
import {
	MuiPickersUtilsProvider,
	DatePicker,
	TimePicker
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const TableCell = withStyles({
	root: {
		borderBottom: 'none',
		wordBreak: 'break-all'
	}
})(MuiTableCell);

const TableHead = withStyles({
	root: {
		backgroundColor: '#FAFAFB',
		borderRadius: 23
	}
})(MuiTableHead);

const useStyles = makeStyles({
	table: {
		width: '99%',
		tablLayout: 'fixed',
		margin: '15px auto'
		// padding: '15px',
		// border: '1px solid black'
	},
	formControl: {
		margin: '8px',
		minWidth: 120,
		backgroundColor: 'white',
		borderRadius: '10px'
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
		background: 'white',
		border: 'none',
		height: '43px',
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
	},
	pagination: {
		border: 'none'
	},

	datepickerInput: {
		padding: '10px 5px',
		height: '20px',
		margin: '0',
		fontFamily: `'Poppins', sans-serif!important`,
		fontSize: '14px',
		fontWeight: 600
	},
	searchBox: {
		marginLeft: '10px',
		fontFamily: 'Roboto-Regular',
		fontSize: '14px'
	}
});

const SpaBookingListLocal = props => {
	const classes = useStyles();
	const [openEdit, setOpenEdit] = useState(false);
	const [editData, setDataEdit] = useState({});
	const tableBooking = props.bookings ? props.bookings : [];

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	let searchVal = React.useRef(null);

	const [tableFilter, setTableFilter] = React.useState([]);

	const [dateValue, setDateValue] = React.useState(null);
	const [filterTratmentName, setFilterTratmentName] = React.useState('');

	const table = props.bookings ? props.bookings : [];

	useEffect(() => {
		if (props.bookings) {
			// setTableFilter(props.bookings);
			allFilteredData();
		}
	}, [props.bookings]);

	useEffect(() => {
		props.startLoader();
		props.fetchSpaLocalBookings();
	}, []);

	const toggleEdit = () => {
		setOpenEdit(!openEdit);
	};

	const handleEdit = (event, data) => {
		event.preventDefault();
	};

	const formatDate = date => {
		return date ? date.split('T')[0] : date;
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const filterElemSelect = tableBooking.filter(
		(ele, id, array) =>
			id ===
			tableBooking.findIndex(elem => elem.TreatmentName == ele.TreatmentName)
	);

	const allRowsPerPage = () => {
		let rowsPage = [5];

		if (tableBooking.length > 10) {
			rowsPage.push(10);
		}
		if (tableBooking.length > 25) {
			rowsPage.push(25);
		}
		if (tableBooking.length < 50) {
			rowsPage.push({ label: 'All', value: tableBooking.length });
		}
		return rowsPage;
	};

	const handleSearchClick = event => {
		setPage(0);

		var table = props.bookings ? props.bookings : [];

		if (event.target.value) {
			table = table.filter(
				data =>
					data.FirstName.toLowerCase().includes(
						event.target.value.toLowerCase()
					) ||
					data.LastName.toLowerCase().includes(event.target.value.toLowerCase())
			);
		}

		if (dateValue) {
			table = table.filter(data => formatDate(data.Date) === dateValue);
		}

		if (filterTratmentName) {
			table = table.filter(data => data.TreatmentName === filterTratmentName);
		}

		setTableFilter(table);
	};

	const selectChangeTreatment = event => {
		setPage(0);
		var table = props.bookings ? props.bookings : [];

		if (event.target.value) {
			table = table.filter(data => data.TreatmentName === event.target.value);
		}

		if (searchVal.current.value) {
			table = table.filter(
				data =>
					data.FirstName.toLowerCase().includes(
						searchVal.current.value.toLowerCase()
					) ||
					data.LastName.toLowerCase().includes(
						searchVal.current.value.toLowerCase()
					)
			);
		}

		if (dateValue) {
			table = table.filter(data => formatDate(data.Date) === dateValue);
		}

		setTableFilter(table);
		setFilterTratmentName(event.target.value);
	};

	const selectChangeDate = event => {
		setPage(0);
		const eventDate = event.format('YYYY-MM-DD');

		var table = props.bookings ? props.bookings : [];

		if (eventDate) {
			table = table.filter(data => formatDate(data.Date) === eventDate);
		}

		if (searchVal.current.value) {
			table = table.filter(
				data =>
					data.FirstName.toLowerCase().includes(
						searchVal.current.value.toLowerCase()
					) ||
					data.LastName.toLowerCase().includes(
						searchVal.current.value.toLowerCase()
					)
			);
		}

		if (filterTratmentName) {
			table = table.filter(data => data.TreatmentName === filterTratmentName);
		}

		setDateValue(eventDate);
		setTableFilter(table);
	};

	const handleResetButton = () => {
		setPage(0);
		var table = props.bookings ? props.bookings : [];

		setDateValue(null);
		setFilterTratmentName('');
		searchVal.current.value = '';

		setTableFilter(table);
	};

	const allFilteredData = () => {
		var table = props.bookings;

		if (searchVal.current.value) {
			table = table.filter(
				data =>
					data.FirstName.toLowerCase().includes(
						searchVal.current.value.toLowerCase()
					) ||
					data.LastName.toLowerCase().includes(
						searchVal.current.value.toLowerCase()
					)
			);
		}

		if (dateValue) {
			table = table.filter(data => formatDate(data.Date) === dateValue);
		}

		if (filterTratmentName) {
			table = table.filter(data => data.TreatmentName === filterTratmentName);
		}

		setTableFilter(table);
	};

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
					{/* <Typography className={classes.header}>Bookings</Typography> */}
					<h2 className="mainHeading">Bookings</h2>
				</Grid>
				<Grid item md={1} sm={1} xs={12}></Grid>
				<Grid item style={{ margin: 'auto 0' }} md={7} sm={7} xs={12}>
					<Grid
						container
						style={{ justifyContent: 'flex-end', width: '100%', margin: '0' }}
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
							<Paper className="searchBtn" style={{ marginRight: 25 }}>
								<InputBase
									style={{ padding: '6px 8px', width: '250px' }}
									placeholder="Type to search"
									className={classes.searchBox}
									inputRef={searchVal}
									onKeyUp={e => handleSearchClick(e)}
								></InputBase>
								<img
									src="/assets/images/apps/search-icon.svg"
									style={{ width: '20px' }}
								/>
							</Paper>
							{table.length ? (
								<FormControl
									variant="outlined"
									className={classes.formControl}
									style={{ marginRight: 25 }}
								>
									<InputLabel
										id="demo-simple-select-outlined-label"
										style={{ background: '#fafafb', top: '-5px' }}
									>
										Treatment
									</InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										value={filterTratmentName}
										onChange={selectChangeTreatment}
										style={{
											padding: '10px 5px',
											height: '40px',
											width: '180px'
										}}
									>
										{props.bookings
											.filter(
												(ele, id, array) =>
													id ===
													props.bookings.findIndex(
														elem => elem.TreatmentName == ele.TreatmentName
													)
											)
											.map(data => (
												<MenuItem value={data.TreatmentName}>
													{data.TreatmentName}
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
											placeholder=" YYYY-MM-DD"
											InputProps={{
												disableUnderline: true,
												fontWeight: '400'
											}}
											variant="inline"
											format="YYYY-MM-DD"
											inputProps={{ className: classes.datepickerInput }}
											value={dateValue}
											// disablePast={true}
											onChange={e => selectChangeDate(e)}
										/>
									</MuiPickersUtilsProvider>
								</FormControl>
							) : null}
							{table.length > 0 ? (
								<FormControl>
									<Button
										variant="contained"
										color="primary"
										onClick={handleResetButton}
										className={classes.resetButton}
									>
										Reset
									</Button>
								</FormControl>
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
								<TableHead
									className="tableHead"
									style={{ borderRadius: '20px' }}
								>
									<TableRow>
										<TableCell style={{ width: '70px', textAlign: 'left' }}>
											Id
										</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Email</TableCell>
										<TableCell>Phone</TableCell>
										<TableCell>Treatment Category</TableCell>
										<TableCell>Treatment Name</TableCell>
										<TableCell>InstructorName</TableCell>
										<TableCell>Booking Date</TableCell>
										<TableCell>Booking Time</TableCell>
										<TableCell>Created At</TableCell>
										<TableCell style={{ width: '50px' }} align="right">
											Action
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody className="tableBody">
									{(rowsPerPage > 0
										? tableFilter.slice(
												page * rowsPerPage,
												page * rowsPerPage + rowsPerPage
										  )
										: tableFilter
									).map(data => (
										<TableRow key={data.id}>
											<TableCell style={{ width: '70px', textAlign: 'left' }}>
												{data.id}
											</TableCell>
											<TableCell>
												{data.Title + ' '} {data.FirstName + ' '}{' '}
												{data.LastName}
											</TableCell>
											<TableCell>{data.Email}</TableCell>
											<TableCell>{data.PhoneNumber}</TableCell>
											<TableCell>{data.TreatmentCategory}</TableCell>
											<TableCell>{data.TreatmentName}</TableCell>
											<TableCell>{data.InstructorName}</TableCell>

											<TableCell>
												<TableCell align="left">
													{formatDate(data.Date)}
												</TableCell>
											</TableCell>
											<TableCell align="left">{data.Time}</TableCell>
											<TableCell>{formatDate(data.createdAt)}</TableCell>
											<TableCell style={{ width: '50px' }} align="right">
												<FontIcon
													style={{ transform: 'rotate(90deg)' }}
													className="material-icons"
												>
													more_vert
												</FontIcon>
											</TableCell>
										</TableRow>
									))}
									{(!tableFilter || (tableFilter && !tableFilter.length)) && (
										<TableRow>
											<TableCell colSpan={11} style={{ textAlign: 'center' }}>
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
												colSpan={11}
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
												ActionsComponent={TablePaginationActions}
											/>
										</TableRow>
									</TableFooter>
								) : null}
							</Table>
						</Paper>
					</div>
				)}
			</Grid>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		// bookings: state.newBooking.bookingsData,
		success: state.spa.localDataSpaSuccess,
		bookings: state.spa.localDataSpaBooking,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchSpaLocalBookings,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SpaBookingListLocal)
);
