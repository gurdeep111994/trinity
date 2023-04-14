import React, { Fragment, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import Popup from './popup.js';
import style from './style.css';
import SortableTree from 'react-sortable-tree';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import DeleteDialog from './deleteDialog';
import AddIcon from '@material-ui/icons/Add';
import { TextField } from 'material-ui';
const uniqid = require('uniqid');

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	},
	imgoption: {
		maxWidth: '100%',
		width: '20px',
		margin: 'auto',
		display: 'block'
	},
	cardheader: {
		fontSize: '1rem'
	},
	cardtext: {
		color: '#b3b3b3',
		fontSize: '11px',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
		width: '60%',
		display: 'flex',
		alignItems: 'center'
	},
	cardIcon: {
		width: '48px',
		height: '48px',
		boxShadow: 'none',
		background: 'transparent'
	}
}));

export default function FullWidthGrid(props) {
	const classes = useStyles();
	const [open, togglePopup] = React.useState(false);
	const [openDeleteDialog, toggleDialog] = React.useState(false);
	const [navigationItems, setNavigationItems] = React.useState({});
	const [selectedItem, setSelectedItem] = React.useState([]);
	const [panel, setPanel] = React.useState('');
	const { treeData } = props;

	// eslint-disable-next-line prefer-const
	let [filteredLeftNavItems, setFilteredLeftNavItems] = React.useState(
		treeData.leftPanel
	);

	const [categorySearchVal, setCategorySearchVal] = React.useState('');

	const edit = data => {
		setNavigationItems(data);
	};

	const resetNavigationItems = () => {
		setNavigationItems({});
	};

	const changeSelectedItems = (x, val) => {
		if (val) {
			let newSelectedItem = Object.assign([], selectedItem);
			newSelectedItem.push(x);
			setSelectedItem(newSelectedItem);
		} else {
			let newSelectedItem = selectedItem.filter(
				item => item.uniqueId != x.uniqueId
			);
			setSelectedItem(newSelectedItem);
		}
	};

	const filterLeftNav = event => {
		const searchedItem = event.target.value;
		setCategorySearchVal(event.target.value);
		if (event.target.value === '') {
			setFilteredLeftNavItems(treeData.leftPanel);
		} else {
			filteredLeftNavItems = filteredLeftNavItems.filter(
				item =>
					item.title.toLowerCase().indexOf(searchedItem.toLowerCase()) !== -1
			);
			setFilteredLeftNavItems(filteredLeftNavItems);
		}
	};

	useEffect(() => {
		const { treeData } = props;
		setFilteredLeftNavItems(treeData.leftPanel);
	}, [treeData.leftPanel]);

	return (
		<section>
			<AppBar
				position="static"
				className={style.mainNavigation}
				color="inherit"
			>
				<Toolbar>
					<Typography variant="h1" className={style.title}>
						{props.heading}
					</Typography>
					{
						<Fragment>
							{/* <Button
								color="inherit"
								onClick={() => {
									props.getNavigations();
								}}
							>
								Discard
							</Button> */}
							<Button
								variant="contained"
								onClick={() => {
									props.saveChanges();
								}}
							>
								<img
									src={'/assets/images/apps/saveIcon.svg'}
									alt=""
									style={{ marginRight: '8px' }}
								/>{' '}
								Save Changes
							</Button>
						</Fragment>
					}
				</Toolbar>
			</AppBar>
			<DeleteDialog
				toggleDialog={() => {
					toggleDialog(!openDeleteDialog);
					setPanel('');
				}}
				togglePopup={value => {
					togglePopup(value);
				}}
				setNavigationItems={data => {
					setNavigationItems(data);
				}}
				open={openDeleteDialog}
				panel={panel}
				navigationItems={navigationItems}
				{...props}
			/>
			<Container maxWidth="false" style={{ padding: '0px' }}>
				<div className="row">
					<div className={style.leftNavPanel}>
						<div className={style.leftheader}>
							<Button
								variant="outlined"
								className={classes.addnewBtn}
								onClick={() => {
									togglePopup(true);
									resetNavigationItems();
								}}
							>
								<AddIcon /> &nbsp; Add New Item
							</Button>
							<Button
								variant="contained"
								onClick={() => {
									if (selectedItem && selectedItem.length > 0) {
										selectedItem.forEach(p => props.addNewItemRightPanel(p));
									}
									setSelectedItem([]);
									setFilteredLeftNavItems(props.treeData.leftPanel);
									setCategorySearchVal('');
								}}
							>
								<img src="/assets/images/apps/transfer.svg" /> Assign to
							</Button>
						</div>
						<div className="main-nav-search">
							<TextField
								id="mainNavSearchInput"
								underlineShow={false}
								className="searchField"
								onChange={filterLeftNav}
								value={categorySearchVal}
								placeholder="Type to search"
								hintStyle={{
									color: '#92929D',
									textIndent: '16px',
									fontSize: '14px',
									fontFamily: 'Poppins, sans-serif',
									fontWeight: 400,
									bottom: '8px'
								}}
								inputStyle={{
									color: '#44444F',
									backgroundColor: '#ffffff',
									borderRadius: '10px',
									textIndent: '16px',
									border: '1px solid #E2E2EA',
									height: '38px',
									fontSize: '14px',
									fontFamily: 'Poppins, sans-serif',
									fontWeight: 400,
									marginTop: '6px'
								}}
							/>
						</div>
						<div className="scroller">
							{Array.isArray(filteredLeftNavItems) &&
								filteredLeftNavItems.map(x => {
									return (
										<div className={style.navigationCard}>
											<Grid
												container
												spacing={0}
												justify="center"
												alignItems="center"
											>
												<Grid item xs={2}>
													<Checkbox
														className={`customCheckbox ${
															!!selectedItem.find(
																a => a.uniqueId === x.uniqueId
															)
																? 'activecheckbox'
																: ''
														}`}
														checked={
															!!selectedItem.find(
																a => a.uniqueId === x.uniqueId
															)
														}
														onChange={(e, val) => {
															changeSelectedItems(x, val);
														}}
													/>
												</Grid>
												<Grid item xs={8}>
													<Typography variant="h5" className={style.cardheader}>
														{x.title}
													</Typography>
													<Typography
														variant="caption"
														className={classes.cardtext}
													>
														<img
															src={'/assets/images/apps/link.svg'}
															className={`${style.imgfluid} ${style.fileicon}`}
															alt=""
														/>
														{x.url}
													</Typography>
												</Grid>
												<Grid item xs={2} style={{ textAlign: 'right' }}>
													<button
														className={style.navbtn}
														onClick={() => {
															togglePopup(true);
															setPanel('left');
															edit(x);
														}}
													>
														<img src="/assets/images/apps/edit-icon.svg" />
													</button>
													{/* <Fab aria-label="edit" className={classes.cardIcon}>
													<EditIcon
														color="action"
														onClick={() => {
															togglePopup(true);
															setPanel('left');
															edit(x);
														}}
													/>
												</Fab> */}
												</Grid>
											</Grid>
										</div>
									);
								})}

							{filteredLeftNavItems && filteredLeftNavItems.length === 0 ? (
								<p style={{ marginTop: '20px' }}>No items available</p>
							) : (
								''
							)}
							{/* <button
							onClick={() => {
								props.addNewItem(selectedItem);
								setSelectedItem({});
							}}
						>
							>>
						</button> */}
						</div>
					</div>
					<div className={style.rightNavPanel}>
						<div className={style.navCard}>
							<div className="row">
								<div className={style.addmenuArea}>
									<div className={style.navContainer}>
										<SortableTree
											treeData={Object.assign([], props.treeData.rightPanel)}
											onChange={rightPanel => props.setTreeData(rightPanel)}
											generateNodeProps={rowInfo => ({
												buttons: [
													<span
														style={{ display: 'flex', alignItems: ' center' }}
													>
														<button
															className={style.navbtn}
															onClick={x => {
																togglePopup(true);
																edit(rowInfo.node);
																setPanel('right');
															}}
														>
															<img src="/assets/images/apps/edit-icon.svg" />
														</button>
														<button
															className={style.navbtn}
															onClick={() => {
																edit(rowInfo.node);
																setPanel('right');
																toggleDialog(!openDeleteDialog);
																setCategorySearchVal('');
															}}
														>
															<img src="/assets/images/apps/delete-icon.svg" />
														</button>
														{/* <Fab aria-label="edit" className={classes.cardIcon}>
															<EditIcon
																color="action"
																onClick={x => {
																	togglePopup(true);
																	edit(rowInfo.node);
																	setPanel('right');
																}}
															/>
														</Fab>
														<Fab aria-label="clear" className={classes.cardIcon}>
															<ClearIcon
																color="action"
																onClick={() => {
																	edit(rowInfo.node);
																	setPanel('right');
																	toggleDialog(!openDeleteDialog);
																}}
															/>
														</Fab>*/}
														{/* <button
												className="btn btn-outline-success"
												style={{
													verticalAlign: 'middle'
												}}
												onClick={() => console.log(rowInfo)}
											>
												ℹ
											</button>
											<button
												className="btn btn-outline-success"
												style={{
													verticalAlign: 'middle'
												}}
												onClick={() => console.log(rowInfo)}
											>
												X
											</button> */}
													</span>
												]
											})}
										/>
									</div>
								</div>

								<div className={style.addNewmenuArea}>
									<div className={style.borderLeft}>
										<Button
											className={style.linkbtn}
											onClick={() => {
												props.showNavDialog();
											}}
										>
											<AddIcon /> &nbsp; Add New
										</Button>
										{props.navigations &&
											props.navigations.length > 0 &&
											props.navigations.map((nav, index) => {
												return (
													<Fragment>
														<div
															className={`${style.menuCard} ${
																props.activeMenu === nav.treeId
																	? 'activeMenu'
																	: ''
															}`}
														>
															<button
																className={style.navbtn}
																onClick={() => {
																	props.showMenu(nav.treeId);
																}}
																style={{ width: '100%', textAlign: 'left' }}
															>
																{' '}
																<p>{nav.heading}</p>
															</button>
															<button
																className={style.navbtn}
																onClick={() => {
																	props.showNavDialog(nav);
																}}
															>
																<img src="/assets/images/apps/editIcon.png" />
															</button>
														</div>
													</Fragment>
												);
											})}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Popup
				{...props}
				isOpen={open}
				navigationItems={navigationItems}
				setNavigationItems={navigationItems => {
					setNavigationItems(navigationItems);
				}}
				togglePopup={open => {
					togglePopup(open);
				}}
				toggleDialog={() => {
					toggleDialog(!openDeleteDialog);
				}}
			/>
		</section>
	);
}
