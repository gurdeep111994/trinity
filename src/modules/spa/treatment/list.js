import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

import Loader from '../../../lib/Loader';
import {
	fetchTreatmentCategories,
	fetchTreatmentData,
	fetchTreatmentsOfCategory
} from '../actions';
import { startLoader } from '../../loader/actions';
import { Grid, InputBase, IconButton, FormControl } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from 'modules/pagination/tablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const TableCell = withStyles({
	root: {
		borderBottom: 'none',
		fontFamily: ['Roboto', 'sans-sarif'],
		fontSize: '14px',
		wordBreak: 'break-all'
		// font: 'Regular 14px/21px Roboto'
	}
})(MuiTableCell);

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

const useStyles = makeStyles({
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
		fontWeight: '500',
		padding: 10,
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#30D796',
		border: '1px solid #30D796',
		borderRadius: '10px',
		opacity: '0.25'
	},
	statusPending: {
		padding: 10,
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#FF974A',
		border: '1px solid #FF974A',
		borderRadius: '10px',
		opacity: '0.25'
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
	pagination: {
		border: 'none'
	},
	header: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600,
		fontSize: '24px',
		marginTop: 20
	}
});

const SpaTreatmentList = props => {
	const classes = useStyles();

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	let searchVal = React.useRef('');

	const [tableFilter, setTableFilter] = React.useState([]);
	const [categories, setCategories] = React.useState([]);

	const [filterCategory, setFilterCategory] = React.useState('');

	const table = props.treatments ? props.treatments.SessionTypes : [];

	useEffect(() => {
		props.startLoader();
		props.fetchTreatmentCategories();
		props.fetchTreatmentData();
	}, []);

	useEffect(() => {
		if (props.categories) {
			setCategories(props.categories);
		}
	}, [props.categories]);

	useEffect(() => {
		if (props.treatments) {
			// setTableFilter(props.treatments.SessionTypes);
			allFilteredData();
		}
	}, [props.treatments]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

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

	const handleSearchClick = event => {
		setPage(0);

		var table = props.treatments.SessionTypes
			? props.treatments.SessionTypes
			: [];

		if (event.target.value) {
			table = table.filter(data =>
				data.Name.toLowerCase().includes(event.target.value.toLowerCase())
			);
		}

		if (filterCategory) {
			table = table.filter(data => data.ProgramId === filterCategory);
		}

		setTableFilter(table);
	};

	const selectChangeCategory = event => {
		setPage(0);
		var table = props.treatments.SessionTypes
			? props.treatments.SessionTypes
			: [];

		if (event.target.value) {
			table = table.filter(data => data.ProgramId === event.target.value);
		}

		if (searchVal.current.value) {
			table = table.filter(data =>
				data.Name.toLowerCase().includes(event.target.value.toLowerCase())
			);
		}

		setTableFilter(table);
		setFilterCategory(event.target.value);
	};

	const handleResetButton = () => {
		setPage(0);
		var table = props.treatments.SessionTypes
			? props.treatments.SessionTypes
			: [];

		setFilterCategory('');
		searchVal.current.value = '';

		setTableFilter(table);
	};

	const renderToDo = (rowsPerPage > 0
		? tableFilter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
		: tableFilter
	).map(data => {
		var categoryId = data.ProgramId;
		const treatmentCategory = categories.filter(
			category => category.Id == categoryId
		);

		return (
			<TableRow key={data.Id}>
				<TableCell>{data.Name ? data.Name : '-'}</TableCell>
				<TableCell>
					{data.DefaultTimeLength ? data.DefaultTimeLength : '-'}
				</TableCell>
				<TableCell>{data.Type ? data.Type : ''}</TableCell>
				<TableCell>
					{treatmentCategory.length > 0 ? treatmentCategory[0].Name : '-'}
				</TableCell>
				<TableCell>-</TableCell>
				<TableCell>-</TableCell>
				<TableCell>-</TableCell>
			</TableRow>
		);
	});

	const allCategories = () => {
		var items = [];

		if (props.treatments) {
			props.treatments.SessionTypes.map(data => {
				var categoryId = data.ProgramId;
				if (props.categories) {
					props.categories.map(category => {
						if (category.Id == categoryId) {
							items.push(category);
						}
					});
				}
			});
		}

		return items;
	};

	const allFilteredData = () => {
		var tableData = props.treatments.SessionTypes;

		if (searchVal.current.value) {
			tableData = table.filter(data =>
				data.Name.toLowerCase().includes(searchVal.current.value.toLowerCase())
			);
		}

		if (filterCategory) {
			tableData = table.filter(data => data.ProgramId === filterCategory);
		}

		setTableFilter(tableData);
	};

	return (
		<div className={classes.container} style={{ paddingBottom: '2rem' }}>
			<Grid
				container
				style={{
					justifyContent: 'flex-end',
					padding: ' 0 1rem 0.8rem 0'
				}}
			>
				<Grid item md={4} sm={4} xs={12}>
					{/* <Typography className={classes.header}>Treatments</Typography> */}
					<h2 className="mainHeading">Treatments</h2>
				</Grid>
				<Grid
					item
					md={8}
					sm={8}
					xs={12}
					style={{ margin: 'auto 0', float: 'right' }}
				>
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
							<Paper className="searchBtn">
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
										Category
									</InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										value={filterCategory}
										onChange={selectChangeCategory}
										style={{
											padding: '10px 5px',
											height: '40px',
											width: '180px'
										}}
									>
										{allCategories()
											.filter(
												(ele, id, array) =>
													id ===
													allCategories().findIndex(
														elem => elem.Name == ele.Name
													)
											)
											.map(data => (
												<MenuItem value={data.Id}>{data.Name}</MenuItem>
											))}
									</Select>
								</FormControl>
							) : null}
							{table.length ? (
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
							) : (
								''
							)}
						</Grid>
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
							<TableHead className="tableHead" style={{ borderRadius: '20px' }}>
								<TableRow style={{ background: '#fafafb', borderRadius: 20 }}>
									<TableCellHeader style={{ width: 150 }}>
										Therapy name
									</TableCellHeader>
									<TableCellHeader>Duration</TableCellHeader>
									<TableCellHeader>SessionType</TableCellHeader>
									<TableCellHeader>Category</TableCellHeader>
									<TableCellHeader>Description</TableCellHeader>
									<TableCellHeader>Members Price</TableCellHeader>
									<TableCellHeader>Non-members price</TableCellHeader>
								</TableRow>
							</TableHead>
							<TableBody>
								{renderToDo}

								{(!tableFilter || (tableFilter && !tableFilter.length)) && (
									<TableRow>
										<TableCell colSpan={7} style={{ textAlign: 'center' }}>
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
											colSpan={7}
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
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.spa.treatmentCategories,
		treatmentsData: state.spa.treatmentOfCategory,
		treatments: state.spa.treatmentData,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchTreatmentCategories,
			fetchTreatmentsOfCategory,
			fetchTreatmentData,
			// updateBooking,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(SpaTreatmentList)
);
