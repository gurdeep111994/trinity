import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import MuiTableCell from '@material-ui/core/TableCell';
import { Edit, Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import DialogComponent from './../../shared/confirmDeleteDialog';
import Loader from '../../../lib/Loader';
import { fetchTables, deleteTable } from '../actions';
import { startLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import FontIcon from 'material-ui/FontIcon';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../../../modules/pagination/tablePagination';

const useStyles = makeStyles({
	table: {
		minWidth: 650
	},
	container: {
		margin: '0 10px'
	},
	noData: {
		textAlign: 'center',
		margin: 30
	},
	popinSemiBold: {
		fontFamily: 'Poppins-SemiBold'
	},
	pagination: {
		border: 'none'
	},
	addButton: {
		backgroundColor: '#00978B',
		color: '#FAFAFB',
		letterSpacing: '0.1px',
		textAlign: 'left',
		borderRadius: '10px'
	}
});

const TableCell = withStyles({
	root: {
		borderBottom: 'none',
		wordBreak: 'break-all'
	}
})(MuiTableCell);

const TablesList = props => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({});

	const [anchorEl, setAnchorEl] = React.useState(null);
	const openMenu = Boolean(anchorEl);

	const handleClick = (event, row) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		props.startLoader();
		props.fetchTables();
	}, []);

	const handleEdit = (event, data) => {
		props.history.push(`${props.match.path}/edit/${data.id}`, { ...data });
	};

	const toggle = () => {
		setOpen(!open);
	};

	const handleDelete = (event, data) => {
		setData(data);
		toggle();
	};

	useEffect(() => {
		if (props.deleteSuccess) {
			toast.success('Table Deleted Successfully');
			props.fetchTables();
		}
	}, [props.deleteSuccess]);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const tables = props.tables ? props.tables : [];

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

	const formatTime = date => {
		return date ? date.split('T')[1].split('.')[0] : date;
	};

	const allRowsPerPage = () => {
		let rowsPage = [5];

		if (tables.length > 10) {
			rowsPage.push(10);
		}
		if (tables.length > 25) {
			rowsPage.push(25);
		}
		if (tables.length < 50) {
			rowsPage.push({ label: 'All', value: tables.length });
		}
		return rowsPage;
	};

	return (
		<div className={classes.container}>
			<Grid container style={{ justifyContent: 'space-between' }}>
				<Grid item>
					<h2 className="mainHeading">Tables List</h2>
				</Grid>
				<Grid item style={{ margin: 'auto 0' }}>
					<div>
						<Button
							onClick={e => {
								e.preventDefault();
								props.history.push('/bookings/tables/add');
							}}
							className="addnewbtn"
						>
							+ New Table
						</Button>
					</div>
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
						<Table className="table" aria-label="simple table">
							<TableHead className="tableHead" style={{ borderRadius: '20px' }}>
								{' '}
								{/* background: '#FAFAFB 0% 0% no-repeat padding-box', opacity: 1, */}
								<TableRow>
									<TableCell align="left" style={{ width: 85 }}>
										ID
									</TableCell>
									<TableCell align="left">Name </TableCell>
									<TableCell align="left">Occupancy </TableCell>
									<TableCell align="left">Count </TableCell>
									<TableCell align="left">Restaurant </TableCell>
									<TableCell align="left">Created At </TableCell>
									<TableCell align="left" style={{ width: 85 }}>
										Actions{' '}
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody className="tableBody">
								{(rowsPerPage > 0
									? tables.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: tables
								).map(row => (
									<TableRow key={row.id}>
										<TableCell align="left" scope="row">
											{' '}
											{row.id}{' '}
										</TableCell>
										<TableCell align="left">{row.name}</TableCell>
										<TableCell align="left">{row.occupancy}</TableCell>
										<TableCell align="left">{row.count}</TableCell>
										<TableCell align="left">
											{row.restrauntDetails && row.restrauntDetails.name
												? row.restrauntDetails.name
												: row.restrauntId}
										</TableCell>
										<TableCell align="left">
											{formatDate(row.createdAt)} {formatTime(row.createdAt)}
										</TableCell>
										<TableCell align="left">
											<EditDeleteAction
												data={row}
												edit={e => handleEdit(e, row)}
												delete={e => handleDelete(e, row)}
											/>
										</TableCell>
									</TableRow>
								))}
								{(!tables || (tables && !tables.length)) && (
									<TableRow>
										<TableCell colSpan={7} style={{ textAlign: 'center' }}>
											{' '}
											No Data Available{' '}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
							{tables.length > 0 ? (
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={allRowsPerPage()}
											colSpan={7}
											count={tables.length}
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
							) : (
								''
							)}
						</Table>
					</Paper>
				</div>
			)}
			{open ? (
				<DialogComponent
					open={open}
					handleClose={toggle}
					data={data}
					delete={props.deleteTable}
					startLoader={props.startLoader}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		tables: state.newBooking.tablesData,
		deleteSuccess: state.newBooking.deleteTableSuccess,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchTables,
			deleteTable,
			startLoader
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TablesList)
);

const EditDeleteAction = props => {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const openMenu = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<FontIcon
				style={{ transform: 'rotate(90deg)' }}
				className="material-icons"
				onClick={handleClick}
				color={'#92929D'}
			>
				more_vert
			</FontIcon>
			<Menu
				id="fade-menu"
				anchorEl={anchorEl}
				keepMounted
				open={openMenu}
				onClose={handleClose}
				TransitionComponent={Fade}
			>
				<MenuItem onClick={e => props.edit()}>Edit</MenuItem>
				<MenuItem onClick={e => props.delete()}>Delete</MenuItem>
			</Menu>
		</div>
	);
};
