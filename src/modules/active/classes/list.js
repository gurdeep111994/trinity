import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import FontIcon from 'material-ui/FontIcon';
// import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
// import { Edit } from '@material-ui/icons';
// import DialogComponentEdit from './edit';
import Loader from '../../../lib/Loader';
import { fetchClasses } from '../actions';
// import { startLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import MaterialTable from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from 'modules/pagination/tablePagination';
import TableFooter from '@material-ui/core/TableFooter';
import moment from 'moment';

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
		minWidth: 650
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
		// fontFamily: 'Poppins-Medium',
		fontFamily: 'Poppins',
		fontWeight: 500,
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
	pagination: {
		border: 'none'
	}
});

const ActiveClassesList = props => {
	const classes = useStyles();

	useEffect(() => {
		props.Get();
	}, []);

	useEffect(() => {}, [props.classes]);

	const dataTable = props.classes.map(data => {
		return {
			name: data.ClassDescription.Name,
			description: data.ClassDescription.Description
		};
	});
	const tableClasses = props.classes ? props.classes : [];

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const [searchVal, setSearchVal] = React.useState('');

	const [tableFilter, setTableFilter] = React.useState([]);

	useEffect(() => {
		setTableFilter(props.classes);
	}, [props.classes]);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};
	const formatDate = date => {
		return date ? date.split('T')[0] : date;
	};

	const handleSearchClick = event => {
		setSearchVal(event.target.value);
		setPage(0);

		var table = props.classes ? props.classes : [];

		if (event.target.value) {
			table = table.filter(classes =>
				classes.ClassDescription.Name.toLowerCase().includes(
					event.target.value.toLowerCase()
				)
			);
		}

		setTableFilter(table);
	};

	const allRowsPerPage = () => {
		let rowsPage = [5];
		if (dataTable.length > 10) {
			rowsPage.push(10);
		}
		if (dataTable.length > 25) {
			rowsPage.push(25);
		}
		if (dataTable.length < 50) {
			rowsPage.push({ label: 'All', value: dataTable.length });
		}
		return rowsPage;
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
				<Grid item>
					<h2 className="mainHeading">Classes</h2>
				</Grid>
				<Grid item style={{ margin: 'auto 0' }}>
					<Paper className="searchBtn">
						<InputBase
							style={{ padding: '6px 8px', width: '250px' }}
							placeholder="Type to search"
							className={classes.searchBox}
							onKeyUp={e => handleSearchClick(e)}
						></InputBase>
						<img
							src="/assets/images/apps/search-icon.svg"
							style={{ width: '20px' }}
						/>
					</Paper>
				</Grid>
			</Grid>

			<div>
				<Paper elevation={0} style={{ borderRadius: '20px', padding: '10px' }}>
					<Table className="table" aria-label="simple table" m={5}>
						<TableHead className="tableHead" style={{ borderRadius: '20px' }}>
							<TableRow>
								<TableCell align="left">Therapy name</TableCell>
								<TableCell align="left">Level</TableCell>
								<TableCell align="left">Program</TableCell>
								<TableCell align="left">Staff</TableCell>
								<TableCell align="left">Date</TableCell>
								<TableCell align="left">Time slot</TableCell>
								<TableCell align="left">Max capacity</TableCell>
								<TableCell align="left">Total booked</TableCell>
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
								<TableRow key={data.ClassScheduleId}>
									<TableCell align="left">
										{data.ClassDescription.Name
											? data.ClassDescription.Name
											: '-'}
									</TableCell>
									<TableCell align="left">
										{data.ClassDescription.Level
											? data.ClassDescription.Level.Name
											: '-'}
									</TableCell>
									<TableCell align="left">
										{data.ClassDescription.Program
											? data.ClassDescription.Program.Name
											: '-'}
									</TableCell>
									<TableCell align="left">
										{data.Staff.FirstName ? data.Staff.FirstName + ' ' : '-'}
										{data.Staff.LastName ? data.Staff.LastName : '-'}
									</TableCell>
									<TableCell align="left">
										{data.StartDateTime ? formatDate(data.StartDateTime) : '-'}
									</TableCell>
									<TableCell align="left">
										{data.StartDateTime
											? moment(data.StartDateTime).format('HH:mm') + ' - '
											: '-'}
										{data.EndDateTime
											? moment(data.EndDateTime).format('HH:mm')
											: ''}
									</TableCell>
									<TableCell align="left">
										{data.MaxCapacity ? data.MaxCapacity : '-'}
									</TableCell>
									<TableCell align="left">
										{data.TotalBooked ? data.TotalBooked : '-'}
									</TableCell>
								</TableRow>
							))}
							{(!tableFilter || (tableFilter && !tableFilter.length)) && (
								<TableRow>
									<TableCell colSpan={8} style={{ textAlign: 'center' }}>
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
										colSpan={8}
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
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		classes: state.active.classesData
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			Get: fetchClasses
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ActiveClassesList)
);
