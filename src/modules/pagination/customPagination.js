import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const propTypes = {
	items: PropTypes.array.isRequired,
	onChangePage: PropTypes.func.isRequired,
	initialPage: PropTypes.number,
	pageSize: PropTypes.number
};

const defaultProps = {
	initialPage: 1,
	pageSize: 10
};

class Pagination extends React.Component {
	constructor(props) {
		super(props);
		this.state = { pager: {}, rowsCount: 10, rCount: 10 };
	}

	componentWillMount() {
		// set page if items array isn't empty
		if (this.props.items && this.props.items.length) {
			this.setPage(this.props.initialPage);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		// reset page if items array has changed
		if (this.props.items !== prevProps.items) {
			this.setPage(this.props.initialPage);
		}
	}

	setPage(page) {
		var { items, pageSize } = this.props;
		var pager = this.state.pager;

		if ((page < 1 || page > pager.totalPages) && !(items && items.length > 0)) {
			return;
		}
		// get new pager object for specified page
		pager = this.getPager(items.length, page, this.state.rowsCount);

		// get new page of items from items array
		var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

		// update state
		this.setState({ pager: pager });
		// call change page function in parent component
		this.props.onChangePage(pageOfItems);
	}

	getPager(totalItems, currentPage, pageSize) {
		// default to first page
		currentPage = currentPage || 1;

		// default page size is 10
		pageSize = pageSize || 10;
		// calculate total pages
		var totalPages = Math.ceil(totalItems / pageSize);

		var startPage, endPage;
		if (totalPages <= 10) {
			// less than 10 total pages so show all
			startPage = 1;
			endPage = totalPages;
		} else {
			// more than 10 total pages so calculate start and end pages
			if (currentPage <= 6) {
				startPage = 1;
				endPage = 10;
			} else if (currentPage + 4 >= totalPages) {
				startPage = totalPages - 9;
				endPage = totalPages;
			} else {
				startPage = currentPage - 5;
				endPage = currentPage + 4;
			}
		}

		// calculate start and end item indexes
		var startIndex = (currentPage - 1) * pageSize;
		var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		// create an array of pages to ng-repeat in the pager control
		var pages = [...Array(endPage + 1 - startPage).keys()].map(
			i => startPage + i
		);

		// return object with all pager properties required by the view
		return {
			totalItems: totalItems,
			currentPage: currentPage,
			pageSize: pageSize,
			totalPages: totalPages,
			startPage: startPage,
			endPage: endPage,
			startIndex: startIndex,
			endIndex: endIndex,
			pages: pages
		};
	}
	handleRowChange = (e, pager) => {
		let rowsCount =
			e.target.value > pager.totalItems ? pager.totalItems : e.target.value;
		this.setState({ rowsCount: rowsCount, rCount: e.target.value }, () => {
			this.setPage(1);
		});
	};
	render() {
		var pager = this.state.pager;
		let { totalItems, currentPage } = this.state.pager;
		const { rowsCount } = this.state;
		const records =
			totalItems > rowsCount
				? currentPage > 1
					? totalItems - (currentPage - 1) * rowsCount
					: rowsCount
				: totalItems;

		const startingPage =
			currentPage > 1 ? (currentPage - 1) * rowsCount + 1 : 1;

		let initialRecord = rowsCount > totalItems ? totalItems : rowsCount;

		const endingPage =
			currentPage > 1
				? (currentPage - 1) * initialRecord + records
				: initialRecord;

		// if (!pager.pages || pager.pages.length <= 1) {
		// 	// don't display pager if there is only 1 page
		// 	return null;
		// }

		return (
			<Fragment>
				<Grid
					container
					spacing={0}
					justify="center"
					alignItems="center"
					style={{ flexWrap: 'nowrap', padding: '0 10px' }}
				>
					<Grid item>
						<p className={style.pgtxt}>
							{' '}
							{startingPage} - {endingPage} of {totalItems} Items
						</p>
					</Grid>
					<Grid item style={{ width: '100%' }}>
						<ul className={style.pagination}>
							{/* <li className={pager.currentPage === 1 ? style.disabled : ''}>
								<a onClick={() => this.setPage(1)}>First</a>
							</li> */}
							<li
								onClick={() => this.setPage(pager.currentPage - 1)}
								className={pager.currentPage === 1 ? style.disabled : ''}
							>
								<a>
									<ArrowBackIosIcon />
								</a>
							</li>
							{pager.pages &&
								pager.pages.length > 0 &&
								pager.pages.map((page, index) => (
									<li
										key={index}
										className={pager.currentPage === page ? style.active : ''}
									>
										<a onClick={() => this.setPage(page)}>{page}</a>
									</li>
								))}
							<li
								onClick={() => this.setPage(pager.currentPage + 1)}
								className={
									pager.currentPage === pager.totalPages ? style.disabled : ''
								}
							>
								<a>
									<ArrowForwardIosIcon />
								</a>
							</li>
							{/* <li
								className={
									pager.currentPage === pager.totalPages ? style.disabled : ''
								}
							>
								<a onClick={() => this.setPage(pager.totalPages)}>Last</a>
							</li> */}
						</ul>
					</Grid>
					<Grid item>
						<FormControl className="customnodropdown">
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={this.state.rCount}
								onChange={e => this.handleRowChange(e, pager)}
							>
								<MenuItem value={5}>5</MenuItem>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={25}>25</MenuItem>
								<MenuItem value={totalItems}>All</MenuItem>
							</Select>
						</FormControl>
					</Grid>
				</Grid>
			</Fragment>
		);
	}
}

Pagination.propTypes = propTypes;
Pagination.defaultProps = defaultProps;
export default Pagination;
