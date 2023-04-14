import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FontIcon from 'material-ui/FontIcon';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import MuiTable from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import { Grid, InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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
		minWidth: 650
	},
	container: {
		margin: '0 100px'
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
	}
});

const ActiveBookingList = props => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<Grid container style={{ justifyContent: 'space-between' }}>
				<Grid item md={8} sm={8} xs={12}>
					<h2 className="mainHeading">Bookings</h2>
				</Grid>
				<Grid item style={{ margin: 'auto 0' }} md={4} sm={4} xs={12}>
					<Grid container spacing={3}>
						<Grid item md={6} sm={6} xs={12}>
							{/* <Paper elevation={0} style={{ borderRadius: '20px' }}>
								<div
									style={{
										letterSpacing: '0.1px',
										color: '#92929D',
										opacity: 1
									}}
								>
									Type to search...
								</div>
							</Paper> */}
							<Paper elevation={0} style={{ margin: 25 }}>
								<InputBase
									placeholder="Type to search"
									className={classes.searchBox}
								>
									{' '}
								</InputBase>
								<IconButton style={{ float: 'right' }}>
									<SearchIcon />
								</IconButton>
							</Paper>
						</Grid>
						<Grid item md={6} sm={6} xs={12}>
							<Paper elevation={0} style={{ borderRadius: '20px' }}>
								<div>
									<label
										style={{
											textAlign: 'left',
											letterSpacing: '0.2px',
											color: '#696974'
										}}
									>
										Sort by:
									</label>{' '}
									<b>Class</b>
								</div>
							</Paper>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<div>
				<Paper elevation={0} style={{ borderRadius: '20px' }}>
					<Typography style={{ marginLeft: '15px', marginTop: '10px' }}>
						28/01/2020
					</Typography>
					<Table className={classes.table} aria-label="simple table">
						<TableHead>
							<TableRow
								style={{ backgroundColor: 'background: #FAFAFB', opacity: 1 }}
							>
								{/* <TableCell align="left">ID</TableCell> */}
								<TableCell align="left" style={{ width: 150 }}>
									Customer Name
								</TableCell>
								<TableCell align="left">Phone</TableCell>
								<TableCell align="left">Email</TableCell>
								<TableCell align="left">Class </TableCell>
								<TableCell align="left">Date & Time</TableCell>
								<TableCell align="left">Status</TableCell>
								<TableCell align="left">Actions</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* {props.bookings &&
								props.bookings.length > 0 &&
								props.bookings.map(row => ( */}
							<TableRow key={1}>
								<TableCell align="left" style={{ width: 125 }}>
									Stan Smith
								</TableCell>
								<TableCell align="left">+44 3069 990227</TableCell>
								<TableCell align="left">stan.smith@gmail.com</TableCell>
								<TableCell align="left">Six Pack Attac</TableCell>
								<TableCell align="left">Jan 28, 2020, 3:30pm</TableCell>
								<TableCell align="left">
									<div className={classes.statusConfirm}>Confirmed</div>
								</TableCell>
								<TableCell>
									<FontIcon
										style={{ transform: 'rotate(90deg)' }}
										className="material-icons"
									>
										more_vert
									</FontIcon>
									{/* <Edit
												style={{
													color: 'blue',
													fontSize: 32,
													cursor: 'pointer'
												}}
												onClick={e => handleEdit(e, row)}
											/> */}
								</TableCell>
							</TableRow>
							{/* ))} */}
						</TableBody>
					</Table>
					<Typography style={{ marginLeft: '15px', marginTop: '10px' }}>
						29/01/2020
					</Typography>
					<Table className={classes.table} aria-label="simple table" m={5}>
						<TableHead>
							<TableRow
								style={{ backgroundColor: 'background: #FAFAFB', opacity: 1 }}
							>
								<TableCell align="left" style={{ width: 150 }}>
									Customer Name
								</TableCell>
								<TableCell align="left">Phone</TableCell>
								<TableCell align="left">Email</TableCell>
								<TableCell align="left">Class</TableCell>
								<TableCell align="left">Date & Time</TableCell>
								<TableCell align="left">Status</TableCell>
								<TableCell align="left">Action</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell align="left" style={{ width: 150 }}>
									Stan Smith
								</TableCell>
								<TableCell align="left">+44 3069 990227</TableCell>
								<TableCell align="left">stan.smith@gmail.com</TableCell>
								<TableCell align="left">Six Pack Attac</TableCell>
								<TableCell align="left">Jan 28, 2020, 3:30pm</TableCell>
								<TableCell align="left">
									<div className={classes.statusPending}>Pending</div>
								</TableCell>
								<TableCell align="left">
									<FontIcon
										style={{ transform: 'rotate(90deg)' }}
										className="material-icons"
									>
										more_vert
									</FontIcon>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</Paper>
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	return {};
};

const mapDispatchToProps = (dispatch, ownProps) =>
	bindActionCreators({}, dispatch);

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ActiveBookingList)
);
