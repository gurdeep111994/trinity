import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

import Pagination from 'react-pagination-js';
import 'react-pagination-js/dist/styles.css'; // import css

const useStyles1 = makeStyles(theme => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5)
	},
	list: {
		display: 'inline-flex',
		listStyle: 'none'
	},
	listItem: {
		width: '25px'
	}
}));

const propTypes = {
	count: PropTypes.number.isRequired,
	onChangePage: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired
};

const defaultProps = {
	count: 1,
	page: 1,
	rowsPerPage: 5,
	onChangePage: null
};

const TablePaginationActions = props => {
	const classes = useStyles1();
	const { count, page, rowsPerPage, onChangePage } = props;

	const handleNewPageClick = (event, page) => {
		onChangePage(event, page - 1);
	};

	return (
		<div className={classes.root}>
			<ul className={classes.list}>
				<Pagination
					currentPage={page + 1}
					totalSize={count}
					sizePerPage={rowsPerPage}
					showFirstLastPages={true}
					changeCurrentPage={e => handleNewPageClick({}, e)}
					theme="border-bottom"
				/>
			</ul>
		</div>
	);
};

TablePaginationActions.propTypes = propTypes;
TablePaginationActions.defaultProps = defaultProps;

module.exports = TablePaginationActions;
