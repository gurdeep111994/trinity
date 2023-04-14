import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Edit, Delete } from '@material-ui/icons';
import { Button, Divider } from '@material-ui/core';
import DialogComponent from './../../shared/confirmDeleteDialog';
import Loader from '../../../lib/Loader';
import { fetchTimeSlots, deleteTimeSlot } from '../actions';
import { startLoader } from '../../loader/actions';
import toast from '../../../lib/toasts';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import { FontIcon } from 'material-ui';
import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FormControl from '@material-ui/core/FormControl';

import { right } from 'glamor';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from 'modules/pagination/tablePagination';

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
	roboRegular: {
		fontFamily: ['Roboto', 'sans-sarif']
	},
	roboMedium: {
		fontFamily: ['Roboto', 'sans-sarif']
	},
	popinSemiBold: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600
	},
	addButton: {
		backgroundColor: '#00978B',
		color: '#FAFAFB',
		letterSpacing: '0.1px',
		textAlign: 'left',
		borderRadius: '10px'
	},
	pagination: {
		border: 'none'
	},
	pageHeading: {
		fontSize: '24px',
		letterSpacing: '0.1px',
		color: '#171725'
	}
	// actions: {
	// 	hover:
	// }
});

const TableCell = withStyles({
	root: {
		borderBottom: 'none',
		fontFamily: ['Roboto', 'sans-sarif'],
		wordBreak: 'break-all'
		// fontWeight: 500
	}
})(MuiTableCell);

const TableCellHeader = withStyles({
	root: {
		borderBottom: 'none',
		fontFamily: ['Poppins', 'sans-sarif'],
		wordBreak: 'break-all'
		// fontWeight: 600
	}
})(MuiTableCell);

const TablesList = props => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [data, setData] = useState({});

	const [anchorEl, setAnchorEl] = React.useState(null);
	const openMenu = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		props.startLoader();
		props.fetchTimeSlots();
	}, []);

	const handleEdit = (event, data) => {
		// event.preventDefault();
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
			props.fetchTimeSlots();
		}
	}, [props.deleteSuccess]);

	const formatDate = date => {
		return moment(date).format('YYYY-MM-DD HH:mm:ss');
	};

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const timeSlots = props.timeSlots ? props.timeSlots : [];

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};
	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const allRowsPerPage = () => {
		let rowsPage = [5];

		if (timeSlots.length > 10) {
			rowsPage.push(10);
		}
		if (timeSlots.length > 25) {
			rowsPage.push(25);
		}
		if (timeSlots.length < 50) {
			rowsPage.push({ label: 'All', value: timeSlots.length });
		}
		return rowsPage;
	};

	return (
		<div className={classes.container}>
			<Grid container style={{ justifyContent: 'space-between' }}>
				<Grid item>
					<h2 className="mainHeading">Time Slots</h2>
				</Grid>
				<Grid item style={{ margin: 'auto 0' }}>
					<Button
						variant="outlined"
						onClick={e => {
							e.preventDefault();
							props.history.push('/bookings/time-slots/add');
						}}
						className={`${classes.addButton} ${classes.popinSemiBold}`}
					>
						+ New Slot Time
					</Button>
				</Grid>
			</Grid>
			{props.loading === true ? (
				<Loader />
			) : (
				<div>
					<Paper elevation={0} style={{ borderRadius: '20px', padding: 10 }}>
						<Table className="table" aria-label="simple table">
							<TableHead className="tableHead">
								<TableRow>
									<TableCellHeader style={{ width: 65 }}>ID</TableCellHeader>
									<TableCellHeader> Restaurant</TableCellHeader>
									<TableCellHeader> Name </TableCellHeader>
									<TableCellHeader> From </TableCellHeader>
									<TableCellHeader> To </TableCellHeader>
									<TableCellHeader> Created At</TableCellHeader>
									<TableCellHeader style={{ width: 85 }}>
										{' '}
										Actions{' '}
									</TableCellHeader>
								</TableRow>
							</TableHead>
							<TableBody className="tableBody">
								{(rowsPerPage > 0
									? timeSlots.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: timeSlots
								).map(row => (
									<TableRow key={row.id}>
										<TableCell scope="row">{row.id}</TableCell>
										<TableCell>{row.restrauntDetails.name}</TableCell>
										<TableCell>{row.name}</TableCell>
										<TableCell>{row.from}</TableCell>
										<TableCell>{row.to}</TableCell>
										<TableCell>{formatDate(row.createdAt)}</TableCell>
										<TableCell>
											<EditDeleteAction
												data={row}
												edit={e => handleEdit(e, row)}
												delete={e => handleDelete(e, row)}
											/>
										</TableCell>
									</TableRow>
								))}
								{(!timeSlots || (timeSlots && !timeSlots.length)) && (
									<TableRow>
										<TableCell colSpan={7} style={{ textAlign: 'center' }}>
											{' '}
											No Data Available{' '}
										</TableCell>
									</TableRow>
								)}
							</TableBody>
							{timeSlots.length > 0 ? (
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={allRowsPerPage()}
											colSpan={7}
											count={timeSlots.length}
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
					delete={props.deleteTimeSlot}
					startLoader={props.startLoader}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		timeSlots: state.newBooking.timeSlotsData,
		deleteSuccess: state.newBooking.deleteTimeSlotSuccess,
		loading: state.loader.loading
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			fetchTimeSlots,
			deleteTimeSlot,
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
