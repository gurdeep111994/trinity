import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import Paper from '@material-ui/core/Paper';
import FontIcon from 'material-ui/FontIcon';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTable from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
	Grid,
	InputBase,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button
} from '@material-ui/core';
import Loader from '../../../lib/Loader';
import { startLoader } from '../../loader/actions';
import { fetchLocalBookings } from '../actions';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../../modules/pagination/tablePagination';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const TableCellHeader = withStyles({
	root: {
		borderBottom: 'none',
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600,
		fontSize: 10,
		color: '#44444F',
		textTransform: 'uppercase',
		wordBreak: 'break-all'
	}
})(MuiTableCell);

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

const Table = withStyles({
	root: {
		padding: 5,
		margin: 5
	}
})(MuiTable);

const useStyles = makeStyles({
	table: {
		width: '99%',
		tablLayout: 'fixed',
		margin: '15px auto'
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
	statusConfirm: {
		fontFamily: 'Poppins-Medium',
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
		// opacity: '0.25',
		background: '#ff984a1a 0% 0% no-repeat padding-box'
	},
	searchBox: {
		marginLeft: '10px',
		fontFamily: 'Roboto-Regular',
		fontSize: '14px'
	},
	pagination: {
		border: 'none'
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
	},
	paperContainer: {
		marginLeft: 'auto',
		boxShadow: 'none',
		maxWidth: '260px',
		borderRadius: '10px',
		border: '1px solid #E2E2EA',
		display: 'flex',
		marginRight: '15px'
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
	}
});

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

// ----------------- START --------------------- //
const ActiveBookingListLocal = props => {
	const classes = useStyles();

	const [searchClass, setClassEdit] = useState('');
	const [searchDate, setDateEdit] = useState(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [searchVal, setSearchVal] = React.useState('');
	const [tableFilter, setTableFilter] = React.useState([]);

	const table = props.bookings ? props.bookings : [];

	let textSearch = useRef(null);

	useEffect(() => {
		props.startLoader();
		props.fetchLocalBookings();
	}, []);

	useEffect(() => {
		if (props.bookings) {
			// setTableFilter(props.bookings);
			allFilteredData();
		}
	}, [props.bookings]);

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

	// handle search input change
	// - search by input value
	// - check if there are searchClass and searchDate set in constant state
	// - set tableFilter variable as filtered bookings
	const handleSearchClick = event => {
		setSearchVal(event.target.value);
		setPage(0);

		var filtered = props.bookings;

		if (event.target.value) {
			filtered = filtered.filter(booking =>
				booking.Username.toLowerCase().includes(
					event.target.value.toLowerCase()
				)
			);
		}
		if (searchClass) {
			filtered = filtered.filter(booking =>
				booking.ClassName.toLowerCase().includes(searchClass.toLowerCase())
			);
		}

		if (searchDate) {
			filtered = filtered.filter(booking => booking.Date === searchDate);
		}

		setTableFilter(filtered);
	};

	// handle select class change
	// - filter by class selected
	// - then check if there are searchVal and searchDate set in constant state
	// - set tableFilter variable as filtered bookings
	const selectClassChange = event => {
		setClassEdit(event.target.value);
		setPage(0);

		var filtered = props.bookings;

		if (event.target.value) {
			filtered = filtered.filter(booking =>
				booking.ClassName.toLowerCase().includes(
					event.target.value.toLowerCase()
				)
			);
		}
		if (searchVal && textSearch.current.value === searchVal) {
			filtered = filtered.filter(booking =>
				booking.Username.toLowerCase().includes(searchVal.toLowerCase())
			);
		}
		if (searchDate) {
			filtered = filtered.filter(booking => booking.Date === searchDate);
		}

		setTableFilter(filtered);
	};

	// handle date picker change
	// - filter by date selected
	// - then check if there are searchVal and searchClass set in constant state
	// - set tableFilter variable as filtered bookings
	const selectDateChange = event => {
		const date = event.format('YYYY-MM-DD');
		setDateEdit(date);
		setPage(0);

		var filtered = props.bookings;
		if (date) {
			filtered = filtered.filter(booking => booking.Date === date);
		}
		if (searchVal && textSearch.current.value === searchVal) {
			filtered = filtered.filter(booking =>
				booking.Username.toLowerCase().includes(searchVal.toLowerCase())
			);
		}
		if (searchClass) {
			filtered = filtered.filter(booking =>
				booking.ClassName.toLowerCase().includes(searchClass.toLowerCase())
			);
		}

		setTableFilter(filtered);
	};

	// reset all filters: searchVal, searchDate, searchClass and set tableFilter to initial props.bookings
	const resetFilters = () => {
		setPage(0);
		setDateEdit(null);
		setClassEdit('');
		setSearchVal('');
		textSearch.current.value = null;
		setTableFilter(props.bookings);
	};

	// create array with all rows per page posibilities
	const allRowsPerPage = () => {
		let rowsPage = [5];
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

	// Verify if table has filters active and use it when page is loading
	const allFilteredData = () => {
		var filtered = props.bookings;

		if (searchVal) {
			filtered = filtered.filter(booking =>
				booking.Username.toLowerCase().includes(searchVal.toLowerCase())
			);
		}
		if (searchClass) {
			filtered = filtered.filter(booking =>
				booking.ClassName.toLowerCase().includes(searchClass.toLowerCase())
			);
		}

		if (searchDate) {
			filtered = filtered.filter(booking => booking.Date === searchDate);
		}

		setTableFilter(filtered);
	};

	// ------------------- RETURN ----------------- //
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
					{/* <Typography className={classes.header}>Bookings Data</Typography> */}
					<h2 className="mainHeading">Bookings Data</h2>
				</Grid>
				<Grid item style={{ margin: 'auto 0' }} md={8} sm={8} xs={12}>
					<Grid
						container
						style={{ justifyContent: 'flex-end', width: '100%', margin: '0' }}
					>
						<Grid item md={4} sm={4} xs={12}>
							{/* <Paper className="searchBtn">
								<InputBase
									style={{ padding: '6px 8px', width: '250px' }}
									placeholder="Type to search"
									className={classes.searchBox}
									onKeyUp={handleSearchClick}
									inputRef={textSearch}
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
							md={8}
							sm={8}
							xs={12}
							style={{
								float: 'right',
								display: 'flex',
								flexDirection: 'row',
								maxWidth: '100%'
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
								<Paper className="searchBtn">
									<InputBase
										style={{ padding: '6px 8px', width: '250px' }}
										placeholder="Type to search"
										className={classes.searchBox}
										onKeyUp={handleSearchClick}
										inputRef={textSearch}
									>
										{' '}
									</InputBase>
									<img
										src="/assets/images/apps/search-icon.svg"
										style={{ width: '20px' }}
									/>
								</Paper>
								{table.length > 0 ? (
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
										<InputLabel
											id="demo-simple-select-outlined-label"
											style={{ background: '#fafafb', top: '-5px' }}
										>
											Class Name
										</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={searchClass}
											onChange={selectClassChange}
											style={{
												padding: '10px 5px',
												height: '40px',
												width: '180px'
											}}
										>
											{table
												.filter(
													(ele, id, array) =>
														id ===
														props.bookings.findIndex(
															elem => elem.ClassName == ele.ClassName
														)
												)
												.map(data => (
													<MenuItem value={data.ClassName}>
														{data.ClassName}
													</MenuItem>
												))}
										</Select>
									</FormControl>
								) : null}
								{table.length > 0 ? (
									<FormControl
										variant="outlined"
										className={classes.formControl}
									>
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
												InputProps={{
													disableUnderline: true,
													fontWeight: '400'
												}}
												format="YYYY-MM-DD"
												disablePast={true}
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
										onClick={resetFilters}
										className={classes.resetButton}
									>
										Reset Filters
									</Button>
								) : null}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			{props.loading === true ? (
				<Loader />
			) : (
				<div>
					<Paper elevation={0} style={{ borderRadius: '20px' }}>
						<Table className={classes.table} aria-label="simple table" m={5}>
							<TableHead style={{ borderRadius: '20px' }}>
								<TableRow style={{ background: '#fafafb', borderRadius: 20 }}>
									<TableCellHeader style={{ width: 50, textAlign: 'left' }}>
										{' '}
										Id{' '}
									</TableCellHeader>
									<TableCellHeader>Name</TableCellHeader>
									<TableCellHeader>Class Name</TableCellHeader>
									<TableCellHeader>Class Category</TableCellHeader>
									<TableCellHeader>Room Name</TableCellHeader>
									<TableCellHeader>Instructor Name</TableCellHeader>
									<TableCellHeader>Date</TableCellHeader>
									<TableCellHeader>Time</TableCellHeader>
									<TableCellHeader>Created At</TableCellHeader>
									{/*<TableCellHeader align="right">Action</TableCellHeader>*/}
								</TableRow>
							</TableHead>
							<TableBody>
								{(rowsPerPage > 0
									? tableFilter.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: tableFilter
								).map(data => {
									return (
										<TableRow key={data.id}>
											<TableCell style={{ width: 50, textAlign: 'left' }}>
												{data.id}
											</TableCell>
											<TableCell>
												{data.Username ? data.Username : '-'}
											</TableCell>
											<TableCell>
												{data.ClassName ? data.ClassName : '-'}
											</TableCell>
											<TableCell>
												{data.ClassCategory ? data.ClassCategory : '-'}
											</TableCell>
											<TableCell>
												{data.RoomName ? data.RoomName : '-'}
											</TableCell>
											<TableCell>
												{data.InstructorName ? data.InstructorName : '-'}
											</TableCell>

											<TableCell>{formatDate(data.Date)}</TableCell>
											<TableCell>{data.Time}</TableCell>
											<TableCell>{formatDate(data.createdAt)}</TableCell>
											{/*<TableCell align="right">*/}
											{/*	<FontIcon*/}
											{/*		style={{ transform: 'rotate(90deg)' }}*/}
											{/*		className="material-icons"*/}
											{/*	>*/}
											{/*		more_vert*/}
											{/*	</FontIcon>*/}
											{/*</TableCell>*/}
										</TableRow>
									);
								})}
								{(!tableFilter || (tableFilter && !tableFilter.length)) && (
									<TableRow>
										<TableCell colSpan={9} className={classes.noData}>
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
											colSpan={9}
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
							) : (
								''
							)}
						</Table>
					</Paper>
				</div>
			)}
		</div>
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
	connect(mapStateToProps, mapDispatchToProps)(ActiveBookingListLocal)
);
