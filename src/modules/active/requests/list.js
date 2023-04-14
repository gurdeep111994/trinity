import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Typography from '@material-ui/core/Typography';

import TablePaginationActions from '../../../modules/pagination/tablePagination';
import { fetchPersonalTrainer, fetchPersonalTrainerBookings } from '../actions';
import Pagination from 'modules/pagination/customPagination';

const TableCellHeader = withStyles(theme => ({
	root: {
		borderBottom: 'none',
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600,
		fontSize: 10,
		color: '#44444F',
		textTransform: 'uppercase',
		wordBreak: 'break-all'
	}
}))(MuiTableCell);

const StyledTableCell = withStyles(theme => ({
	head: {
		color: '#B5B5BE',
		backgroundColor: '#F1F1F5',
		background: '#F1F1F5 0% 0% no-repeat padding-box',
		opacity: '1'
	},
	body: {
		fontSize: 14
	},
	root: {
		borderBottom: 'none',
		wordBreak: 'break-all'
	}
}))(MuiTableCell);

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
	pagination: {
		border: 'none'
	},
	header: {
		fontFamily: ['Poppins', 'sans-sarif'],
		fontWeight: 600,
		fontSize: '24px',
		marginTop: 20
	},
	statusPending: {
		padding: 10,
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#FF974A',
		border: '1px solid #FF974A',
		borderRadius: '10px',
		opacity: '0.25'
	}
});

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

const RequestsList = props => {
	const classes = useStyles();

	useEffect(() => {
		props.Get();
	}, []);

	useEffect(() => {
		props.GetPersonalTrainers();
	}, []);

	useEffect(() => {
		// console.log('requests : ', props.requests);
	}, [props.requests]);

	useEffect(() => {
		// console.log('personalTrainers : ', props.personalTrainers);
	}, [props.personalTrainers]);

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const requests = props.requests ? props.requests : [];

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const allRowsPerPage = () => {
		let rowsPage = [5];
		if (requests.length > 10) {
			rowsPage.push(10);
		}
		if (requests.length > 25) {
			rowsPage.push(25);
		}
		if (requests.length < 50) {
			rowsPage.push({ label: 'All', value: requests.length });
		}
		return rowsPage;
	};

	const tableHead = [
		{ name: 'Name', width: 120 },
		{ name: 'Phone Number', width: 120 },
		{ name: 'E-mail', width: 120 },
		{ name: 'Message', width: 120 },
		{ name: 'Contact Method Required', width: 120 },
		{ name: 'Trainer Selected', width: 120 }
	];

	return (
		<div className={classes.container} style={{ paddingBottom: '2rem' }}>
			<Grid
				container
				style={{
					justifyContent: 'space-between',
					padding: ' 0 1rem 0.8rem 0'
				}}
			>
				<Grid item md={9} sm={9} xs={12}>
					{/* <h2>Classes</h2> */}
					<h2 className="mainHeading">Personal Trainers Requests</h2>
					{/* <Typography className={classes.header}>
						Personal Trainers Requests
					</Typography> */}
				</Grid>
			</Grid>

			<div>
				<Paper elevation={0} style={{ borderRadius: '20px', padding: '10px' }}>
					<Table className="table" aria-label="simple table" m={5}>
						<TableHead className="tableHead" style={{ borderRadius: '20px' }}>
							<TableRow>
								{tableHead.map(item => {
									return (
										<TableCellHeader style={{ width: item.width }} align="left">
											{item.name}
										</TableCellHeader>
									);
								})}
							</TableRow>
						</TableHead>
						<TableBody className="tableBody">
							{(rowsPerPage > 0
								? requests.slice(
										page * rowsPerPage,
										page * rowsPerPage + rowsPerPage
								  )
								: requests
							).map(item => (
								<TableRow key={item.id}>
									<TableCell align="left" style={{ wordWrap: 'break-word' }}>
										{item.title + ' ' + item.firstName + ' ' + item.lastName}
									</TableCell>
									<TableCell align="left" style={{ wordWrap: 'break-word' }}>
										{item.phoneNumber}
									</TableCell>
									<TableCell align="left" style={{ wordWrap: 'break-word' }}>
										{item.email}
									</TableCell>
									<TableCell align="left" style={{ wordWrap: 'break-word' }}>
										{item.message}
									</TableCell>
									<TableCell align="left" style={{ wordWrap: 'break-word' }}>
										{item.contactMethod}
									</TableCell>
									<TableCell align="left" style={{ wordWrap: 'break-word' }}>
										{props.personalTrainers &&
										props.personalTrainers[item.trainerId - 1]
											? props.personalTrainers[item.trainerId - 1].name
											: ''}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									rowsPerPageOptions={allRowsPerPage()}
									colSpan={6}
									count={requests.length}
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
											requests ? requests.length : 0
										)
									}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				</Paper>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {
		requests: state.active.personalTrainerBookingsData,
		personalTrainers: state.active.personalTrainersData
	};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators(
		{
			Get: fetchPersonalTrainerBookings,
			GetPersonalTrainers: fetchPersonalTrainer
		},
		dispatch
	);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(RequestsList)
);
