import React, { Fragment } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormGroup from '@material-ui/core/FormGroup';
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { apiBaseUrl, getEnv } from 'lib/settings';
import Axios from 'axios';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import kebabCase from 'lodash/kebabCase';

const uniqid = require('uniqid');

function rand() {
	return 1;
	// return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles(theme =>
	createStyles({
		paper: {
			position: 'absolute',
			width: 400,
			backgroundColor: theme.palette.background.paper,
			border: '2px solid #000',
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3)
		}
	})
);

function SimpleModal(props) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle);
	const [open, setOpen] = React.useState(false);
	if (props.isOpen !== open) {
		setOpen(props.isOpen);
	}
	const handleOpen = () => {
		setOpen(true);
		props.togglePopup(true);
	};

	const handleClose = () => {
		setOpen(false);
		props.togglePopup(false);
	};

	return (
		<div>
			<Modal
				className="custom-modal"
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open}
				onClose={handleClose}
			>
				<div className="modaldiaglouge">
					<div className="modalbody">
						<div className="modalTitle">
							<h2 id="simple-modal-title">
								{props.navItems.uniqueId
									? 'Edit Navigation Item'
									: 'Add Navigation Item'}
							</h2>
							<CloseIcon
								onClick={() => {
									handleClose();
								}}
								className="closeBtn"
							></CloseIcon>
						</div>
						<form>
							<FormGroup className="editAddpopup">
								<FormControl>
									<InputLabel htmlFor="my-input" label="Standard">
										Display Name{' '}
									</InputLabel>
									<Input
										id="my-input"
										aria-describedby="my-helper-text"
										value={props.navItems.title ? props.navItems.title : ''}
										onChange={e => {
											props.onChange(e, 'title');
										}}
									/>
									<FormHelperText
										id="my-helper-text"
										style={
											props.errors.title
												? { color: 'red', display: 'block' }
												: { display: 'none' }
										}
									>
										Required Display Name
									</FormHelperText>
								</FormControl>
								<FormControl className={classes.formControl}>
									<InputLabel id="demo-simple-select-label">
										Type of page
									</InputLabel>
									<Select
										value={
											props.navItems.type_of_page
												? props.navItems.type_of_page
												: ''
										}
										onChange={e => {
											props.onChange(e, 'type_of_page');
										}}
										labelId="demo-simple-select-label"
										id="demo-simple-select"
									>
										<MenuItem value={1}>Custom URL</MenuItem>
										<MenuItem value={2}>Page Builder</MenuItem>
									</Select>
								</FormControl>

								{props.navItems.type_of_page &&
								props.navItems.type_of_page == 2 ? (
									<FormControl className={classes.formControl}>
										<InputLabel id="demo-simple-select-label">
											Page Builder
										</InputLabel>
										<Select
											value={
												props.navItems.page_builder
													? props.navItems.page_builder
													: ''
											}
											onChange={e => {
												props.onChange(e, 'page_builder');
											}}
											labelId="demo-simple-select-label"
											id="demo-simple-select"
										>
											{props.pageBuliderList.map(x => {
												return <MenuItem value={x.id}>{x.title}</MenuItem>;
											})}
										</Select>
									</FormControl>
								) : (
									<Fragment></Fragment>
								)}

								{/*<FormControl className={classes.formControl}>*/}
								{/*	<InputLabel id="demo-simple-select-label">*/}
								{/*		Algolia index*/}
								{/*	</InputLabel>*/}
								{/*	<Select*/}
								{/*		value={*/}
								{/*			props.navItems.algolia_index*/}
								{/*				? props.navItems.algolia_index*/}
								{/*				: ''*/}
								{/*		}*/}
								{/*		onChange={e => {*/}
								{/*			props.onChange(e, 'algolia_index');*/}
								{/*		}}*/}
								{/*		labelId="demo-simple-select-label"*/}
								{/*		id="demo-simple-select"*/}
								{/*	>*/}
								{/*		{props.algoliaIndexList.map(x => {*/}
								{/*			return <MenuItem value={x.value}>{x.label}</MenuItem>;*/}
								{/*		})}*/}
								{/*	</Select>*/}
								{/*</FormControl>*/}
								<FormControl>
									<InputLabel htmlFor="my-input">URL</InputLabel>
									<Input
										disabled={
											props.navItems.type_of_page &&
											props.navItems.type_of_page == 2
												? true
												: false
										}
										id="my-input"
										aria-describedby="my-helper-text"
										value={props.navItems.url ? props.navItems.url : ''}
										onChange={e => {
											props.onChange(e, 'url');
										}}
									/>
									<FormHelperText
										id="my-helper-text"
										style={
											props.errors.url
												? { color: 'red', display: 'block' }
												: { display: 'none' }
										}
									>
										Required
									</FormHelperText>
								</FormControl>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												className={`customCheckbox ${
													props.navItems.isUrlRelative ? 'activecheckbox' : ''
												}`}
												value="isUrlRelative"
												checked={
													props.navItems.isUrlRelative
														? props.navItems.isUrlRelative
														: false
												}
												onChange={e => {
													props.onChange(e, 'isUrlRelative');
												}}
											/>
										}
										label="This URL is relative"
										className="customCheckboxLabel"
									/>
								</FormGroup>
								<FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												className={`customCheckbox ${
													props.navItems.isOpenNewTab ? 'activecheckbox' : ''
												}`}
												value="isOpenNewTab"
												checked={
													props.navItems.isOpenNewTab
														? props.navItems.isOpenNewTab
														: false
												}
												onChange={e => {
													props.onChange(e, 'isOpenNewTab');
												}}
											/>
										}
										label="Open in a new tab"
										className="customCheckboxLabel"
									/>
								</FormGroup>
								<FormControl>
									<InputLabel htmlFor="my-input">CSS Class Names</InputLabel>
									<Input
										id="my-input"
										aria-describedby="my-helper-text"
										value={
											props.navItems.CssClassName
												? props.navItems.CssClassName
												: ''
										}
										onChange={e => {
											props.onChange(e, 'CssClassName');
										}}
									/>
									{/* <FormHelperText id="my-helper-text">
									Css Class Name
								</FormHelperText> */}
								</FormControl>

								<div
									style={{
										display: 'flex',
										flexDirection: 'row-reverse',
										alignItems: 'center'
									}}
								>
									<Button
										className="actionbtn fillAction"
										style={{ margin: '0 10px' }}
										onClick={() => {
											props.save(res => {
												if (res) {
													handleClose();
												}
											});
										}}
									>
										<CheckIcon /> Save
									</Button>
									<Button
										className="actionbtn mr-btn"
										style={{ marginTop: '0px' }}
										onClick={() => {
											handleClose();
										}}
									>
										<ClearIcon /> Cancel
									</Button>
									{/* {props.navItems.uniqueId ? (
										<Fragment>
											<Button
												style={{ color: '#00978' }}
												onClick={() => {
													props.toggleDialog();
												}}
											>
												Delete
											</Button>
										</Fragment>
									) : (
										<Fragment></Fragment>
									)} */}
									{props.navItems.uniqueId ? (
										<Fragment>
											<Link
												href="#"
												style={{ marginRight: 'auto' }}
												onClick={() => {
													props.toggleDialog();
												}}
											>
												Delete
											</Link>
										</Fragment>
									) : (
										<Fragment></Fragment>
									)}
								</div>
							</FormGroup>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default class popup extends React.Component {
	constructor() {
		super();
		this.state = {
			navigationItems: {},
			pageBuliderList: [],
			algoliaIndexList: [],
			errors: {}
		};
	}

	componentDidMount() {
		this.getPageBuliderList();
	}

	onChange = (e, field) => {
		let errors = this.state.errors;
		let navigationItems = this.state.navigationItems;
		switch (field) {
			case 'title':
				delete errors.title;
				delete errors.url;
				navigationItems.title = e.target.value;
				if (!navigationItems.uniqueId) {
					navigationItems.url = kebabCase(e.target.value);
				}
				break;
			case 'type_of_page':
				navigationItems.type_of_page = e.target.value;
				if (e.target.value && e.target.value === 1) {
					navigationItems.page_builder = '';
				}
				break;
			case 'url':
				delete errors.url;
				navigationItems.url = kebabCase(e.target.value);
				break;
			case 'CssClassName':
				navigationItems.CssClassName = e.target.value;
				break;
			case 'sub_type_of_page':
				navigationItems.sub_type_of_page = e.target.value;
				break;
			case 'isUrlRelative':
				navigationItems.isUrlRelative = e.target.checked;
				break;
			case 'isOpenNewTab':
				navigationItems.isOpenNewTab = e.target.checked;
				break; //
			case 'page_builder':
				navigationItems.page_builder = e.target.value;
				const pageBuilder = this.state.pageBuliderList.find(
					x => x.id === e.target.value
				);
				if (pageBuilder && pageBuilder.url) {
					delete errors.url;
					navigationItems.url = `external/${pageBuilder.url}`;
				}
				break;
			case 'algolia_index':
				navigationItems.algolia_index = e.target.value;
				break;
		}
		this.setState({ navigationItems, errors });
		this.props.setNavigationItems(navigationItems);
	};

	getPageBuliderList = () => {
		Axios.get(`${getEnv(apiBaseUrl)}/page-builder`)
			.then(res => {
				this.setState({ pageBuliderList: res && res.data ? res.data : [] });
			})
			.catch(err => {});
	};

	componentWillReceiveProps(nextProps) {
		const navigationItems = Object.assign({}, nextProps.navigationItems);
		this.setState({ navigationItems });
	}

	save = callBack => {
		let errors = this.state.errors;
		if (!this.props.navigationItems.title) {
			errors.title = true;
		}
		if (!this.props.navigationItems.url) {
			errors.url = true;
		}
		this.setState({ errors });
		if (!(Object.keys(errors).length === 0)) {
			return;
		}
		if (this.props.navigationItems && this.props.navigationItems.uniqueId) {
			let navItem = Object.assign({}, this.props.navigationItems);
			this.props.updateItem(navItem);
			callBack(true);
		} else {
			let navItem = Object.assign({}, this.props.navigationItems);
			navItem.uniqueId = uniqid();
			this.props.addNewItemLeftPanel(navItem);
			callBack(true);
		}
	};

	render() {
		return (
			<SimpleModal
				{...this.props}
				pageBuliderList={this.state.pageBuliderList}
				algoliaIndexList={this.state.algoliaIndexList}
				navItems={Object.assign({}, this.state.navigationItems)}
				errors={this.state.errors}
				onChange={(e, field) => {
					this.onChange(e, field);
				}}
				save={callBack => {
					this.save(callBack);
				}}
			/>
		);
	}
}
