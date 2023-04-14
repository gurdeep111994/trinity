import React, { Component, Fragment } from 'react';
import { apiBaseUrl, getEnv } from 'lib/settings';
import LeftPanel from './left-panel';
import Axios from 'axios';
import AddHeadingDialog from './addHeadingDialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
const uniqid = require('uniqid');
import EditIcon from '@material-ui/icons/Edit';
import Spinner from 'react-spinner-material';

export default class Tree extends Component {
	constructor(props) {
		super(props);
		this.state = {
			navigations: [],
			open: false,
			isLoading: true,
			heading: '',
			nav: { heading: '' },
			error: false,
			activeMenu: ''
		};
	}

	togglePopup = () => {
		this.setState({ open: !this.state.open });
	};

	componentDidMount() {
		this.getNavigations();
	}

	getNavigations = () => {
		var defaultNavItem = this.getNewMenuItem();
		defaultNavItem.heading = 'Main Navigation';
		defaultNavItem.url = 'main-navigation';
		let navigations = [];
		navigations.push(defaultNavItem);
		this.setState({ isLoading: true });
		Axios.get(`${getEnv(apiBaseUrl)}/navItems`)
			.then(res => {
				if (res && res.data && res.data.data && res.data.data.length > 0) {
					this.setState({
						navigations: res.data.data,
						isLoading: false,
						activeMenu: this.state.activeMenu
							? this.state.activeMenu
							: res.data.data[0].treeId
					});
				} else {
					this.setState({
						navigations,
						isLoading: false,
						activeMenu: navigations[0].treeId
					});
				}
			})
			.catch(err => {
				this.setState({ navigations, activeMenu: navigations[0].treeId });
			});
	};

	saveChanges = () => {
		const { navigations } = this.state;
		this.setState({ isLoading: true });
		if (navigations && navigations.length > 0) {
			Axios.post(`${getEnv(apiBaseUrl)}/navItems`, navigations)
				.then(res => {
					this.getNavigations();
				})
				.catch(err => {});
		}
	};

	setTreeData = (rightPanel, treeId) => {
		let { navigations, navTreeData, treeIndex } = this.getTreeData(treeId);
		if (treeIndex > -1) {
			let treeData = Object.assign({}, navTreeData);
			treeData.rightPanel = rightPanel;
			navigations[treeIndex].treeData = Object.assign({}, treeData);
			this.setState({ navigations: Object.assign([], navigations) });
		}
	};

	getTreeData = treeId => {
		let navigations = Object.assign([], this.state.navigations);
		let treeIndex = navigations.findIndex(x => x.treeId === treeId);
		let navTreeData = {};
		if (treeIndex > -1) {
			navTreeData = ({}, navigations[treeIndex].treeData);
		}
		return { navigations, navTreeData, treeIndex };
	};

	addNewItemRightPanel = (data, treeId) => {
		let { navigations, navTreeData, treeIndex } = this.getTreeData(treeId);
		if (treeIndex > -1) {
			let treeData = Object.assign({}, navTreeData);
			const index = treeData.leftPanel.findIndex(
				x => x.uniqueId == data.uniqueId
			);
			if (index > -1) {
				if (
					Array.isArray(treeData.leftPanel) &&
					Array.isArray(treeData.rightPanel)
				) {
					// data.isExistsInTree = true;
					//navigations = this.removeItemFromEntireLeftPanel(navigations,data); //Uncomment to delete all items
					let leftPanel = treeData.leftPanel;
					leftPanel.splice(index, 1);
					treeData.leftPanel = leftPanel;

					let rightPanel = treeData.rightPanel;
					let leftPanelData = Object.assign({}, data);
					// leftPanelData.uniqueId = uniqid();
					rightPanel.push(leftPanelData);
					treeData.rightPanel = rightPanel;
					navigations[treeIndex].treeData = Object.assign({}, treeData);
					this.setState({ navigations: Object.assign([], navigations) });
				}
			}
		}
	};

	deleteLeftItem = (data, treeId) => {
		let { navigations } = this.getTreeData(treeId);
		navigations.forEach(item => {
			var index = item.treeData.leftPanel.findIndex(
				x => x.uniqueId == data.uniqueId
			);
			if (index > -1) {
				this.deleteItemFromLeftPanel(data, item.treeId);
			} else {
				this.deleteRightItem(
					this.findRightItem(data.uniqueId, item.treeData.rightPanel),
					item.treeId
				);
				this.deleteItemFromLeftPanel(data, item.treeId);
			}
		});
	};

	addNewItemLeftPanel = (data, treeId) => {
		let nav = this.state.navigations;
		if (nav && Array.isArray(nav) && nav.length > 0) {
			let newNavigation = nav.map(x => {
				let treeData = Object.assign({}, x.treeData);
				let leftPanel = treeData.leftPanel;
				// data.isExistsInTree = false;
				leftPanel.push(data);
				treeData.leftPanel = leftPanel;
				x.treeData = Object.assign({}, treeData);
				return x;
				// this.setState({ navigations: Object.assign([], navigations) });
			});
			this.setState({ navigations: newNavigation });
		}
	};

	updateItem = (item, treeId) => {
		let nav = this.state.navigations;
		let { navigations, navTreeData, treeIndex } = this.getTreeData(treeId);
		let isUpdateRightPanel = false;
		let newNav = [];
		nav.forEach(n => {
			if (treeIndex > -1) {
				let treeData = Object.assign({}, n.treeData);
				const leftIndex = treeData.leftPanel.findIndex(
					x => x.uniqueId == item.uniqueId
				);
				if (leftIndex > -1) {
					let leftPanel = treeData.leftPanel;
					treeData.leftPanel = this.setItemData(leftPanel, leftIndex, item);
					n.treeData = Object.assign({}, treeData);
					newNav.push(n);
					// navigations[treeIndex].treeData = Object.assign({}, treeData);
					// this.setState({ navigations: Object.assign([], navigations) });
				}

				if (!(leftIndex > -1) && !isUpdateRightPanel) {
					isUpdateRightPanel = true;
					this.updateRightPanel(item, treeId);
				}
			}
		});
		if (newNav.length > 0 && newNav.length === nav.length) {
			this.setState({ navigations: newNav });
		}
		// const rightIndex = this.state.treeData.rightPanel.findIndex(
		// 	x => x.uniqueId == data.uniqueId
		// );
		// if(rightIndex > 0){
		// 	let rightPanel = this.state.treeData.rightPanel;
		// }
	};

	updateRightPanel = (item, treeId) => {
		let { navigations, navTreeData, treeIndex } = this.getTreeData(treeId);
		if (treeIndex > -1) {
			let treeData = Object.assign({}, navTreeData);
			let rightPanel = treeData.rightPanel;
			let newRightPanel = [];
			rightPanel.forEach(x => {
				if (x.uniqueId === item.uniqueId) {
					const rightPanelItem = this.setItem(x, item);
					newRightPanel.push(rightPanelItem);
				} else {
					if (x.children && x.children.length > 0) {
						const data = this.finditemInChildren(x, item);
						newRightPanel.push(data);
					} else {
						newRightPanel.push(x);
					}
				}
			});
			treeData.rightPanel = newRightPanel;
			navigations[treeIndex].treeData = Object.assign({}, treeData);
			this.setState({ navigations: Object.assign([], navigations) });
			// this.setState({ treeData: Object.assign({}, treeData) });
		}
	};

	finditemInChildren = (x, item) => {
		const data = Object.assign({}, x);
		let children = [];
		data.children.forEach(c => {
			if (c.uniqueId === item.uniqueId) {
				children.push(this.setItem(c, item));
			} else {
				if (c.children && c.children.length > 0) {
					const childItem = this.finditemInChildren(c, item);
					children.push(childItem);
				} else {
					children.push(c);
				}
			}
		});
		data.children = children;
		return data;
	};

	setItem = (rightPanelItem, item) => {
		if (rightPanelItem.uniqueId === item.uniqueId) {
			rightPanelItem.title = item.title;
			rightPanelItem.type_of_page = item.type_of_page;
			rightPanelItem.url = item.url;
			rightPanelItem.isUrlRelative = item.isUrlRelative;
			rightPanelItem.isOpenNewTab = item.isOpenNewTab;
			rightPanelItem.CssClassName = item.CssClassName;
			rightPanelItem.isDelted = item.isDelted;
			// rightPanelItem.isExistsInTree = item.isExistsInTree;
			rightPanelItem.page_builder = item.page_builder;
			rightPanelItem.algolia_index = item.algolia_index;
			if (item._id) {
				rightPanelItem._id = item._id;
			}
		}
		return rightPanelItem;
	};

	setItemData = (panel, i, item) => {
		if (panel[i].uniqueId === item.uniqueId) {
			panel[i].title = item.title;
			panel[i].type_of_page = item.type_of_page;
			panel[i].url = item.url;
			panel[i].isUrlRelative = item.isUrlRelative;
			panel[i].isOpenNewTab = item.isOpenNewTab;
			panel[i].CssClassName = item.CssClassName;
			panel[i].isDelted = item.isDelted;
			// panel[i].isExistsInTree = item.isExistsInTree;
			panel[i].page_builder = item.page_builder;
			panel[i].algolia_index = item.algolia_index;
			if (item._id) {
				panel[i]._id = item._id;
			}
			return Object.assign([], panel);
		}
		return panel;
	};

	deleteItemFromLeftPanel = (item, treeId) => {
		let { navigations, navTreeData, treeIndex } = this.getTreeData(treeId);
		if (treeIndex > -1) {
			let treeData = Object.assign({}, navTreeData);
			let leftPanel = treeData.leftPanel;
			const leftIndex = leftPanel.findIndex(x => x.uniqueId == item.uniqueId);
			if (leftIndex > -1) {
				leftPanel.splice(leftIndex, 1);
				treeData.leftPanel = leftPanel;
				// this.setState({ treeData: Object.assign({}, treeData) });
				navigations[treeIndex].treeData = Object.assign({}, treeData);
			}
			this.setState({ navigations: Object.assign([], navigations) });
		}
	};

	deleteRightItem = (item, treeId) => {
		let { navigations, navTreeData, treeIndex } = this.getTreeData(treeId);
		if (treeIndex > -1) {
			let treeData = Object.assign({}, navTreeData);
			const newRightPanel = this.findAndDeleteChildItem(
				Object.assign([], treeData.rightPanel),
				item
			);
			treeData.rightPanel = newRightPanel;
			const newItem = Object.assign({}, item); //
			const leftPanel = this.getLeftPanelData(
				Object.assign([], treeData.leftPanel),
				Object.assign({}, item)
			);
			treeData.leftPanel = leftPanel;
			navigations[treeIndex].treeData = Object.assign({}, treeData);
			this.setState({ navigations: Object.assign([], navigations) });
		}
	};

	getLeftPanelData = (leftPanel, item) => {
		const newItem = Object.assign({}, item);
		// newItem.isExistsInTree = false;
		newItem.children = [];
		leftPanel.push(newItem);
		if (item.children && item.children.length > 0) {
			item.children.forEach(x => {
				leftPanel = Object.assign(
					[],
					this.getLeftPanelData(
						Object.assign([], leftPanel),
						Object.assign({}, x)
					)
				);
			});
		}
		return Object.assign([], leftPanel);
	};

	findRightItem = (uniqueId, rightPanelItems) => {
		for (let i = 0; i < rightPanelItems.length; i++) {
			let data = rightPanelItems[i];
			if (data.uniqueId == uniqueId) {
				return data;
			} else if (data.children && data.children.length > 0) {
				return this.findRightItem(uniqueId, data.children);
			}
		}
		return null;
	};
	findAndDeleteChildItem = (data, item) => {
		const index = data.findIndex(x => x.uniqueId === item.uniqueId);
		let newData = [];
		if (index > -1) {
			data.splice(index, 1);
			newData = Object.assign([], data);
		} else {
			data.forEach(x => {
				if (x.children && x.children.length > 0) {
					x.children = Object.assign(
						[],
						this.findAndDeleteChildItem(x.children, item)
					);
				}
				newData.push(x);
			});
		}
		return Object.assign([], newData);
	};

	addNewNavigationMenu = heading => {
		let navigations =
			this.state.navigations && this.state.navigations.length > 0
				? Object.assign([], this.state.navigations)
				: [];
		const leftPanel =
			navigations.length > 0 &&
			navigations[0].treeData &&
			navigations[0].treeData.leftPanel &&
			navigations[0].treeData.leftPanel.length > 0
				? Object.assign([], navigations[0].treeData.leftPanel)
				: [];

		const index = navigations.findIndex(p => p.treeId === heading.treeId);
		if (index < 0) {
			heading.canBeDeleted = true;
			navigations.push(heading);
		} else {
			navigations[index] = heading;
		}

		this.setState({ navigations });
		this.togglePopup();
	};

	saveHeading = () => {
		if (this.state.nav.heading) {
			this.addNewNavigationMenu(this.state.nav);
		} else {
			this.setState({ error: true });
			return;
		}
	};

	onChange = nav => {
		this.setState({ nav: nav });
	};

	onDelete = nav => {
		let navigations =
			this.state.navigations && this.state.navigations.length > 0
				? Object.assign([], this.state.navigations)
				: [];
		const index = navigations.findIndex(
			p => p.treeId === this.state.nav.treeId
		);
		if (index > -1) {
			if (
				navigations[index].treeData &&
				navigations[index].treeData.rightPanel
			) {
				navigations[index].treeData.rightPanel.forEach(item => {
					this.deleteRightItem(item, this.state.nav.treeId);
				});
			}
			navigations.splice(index, 1);
			if (this.state.activeMenu == this.state.nav.treeId) {
				this.showMenu(navigations[0].treeId);
			}
			this.setState({ navigations: Object.assign([], navigations) });
		}
		this.togglePopup();
	};

	showNavDialog = (nav = null) => {
		this.resetPopup(nav);
		this.togglePopup();
	};

	resetPopup = nav => {
		if (!nav) {
			nav = this.getNewMenuItem();
		}
		this.setState({ nav: nav, error: false });
	};

	getNewMenuItem = () => {
		var nav = {
			treeId: uniqid(),
			heading: '',
			isNavItem: true,
			url: '',
			// isUrlRelative: false,
			// isOpenNewTab: false,
			treeData: {
				leftPanel: this.getAllItems(),
				rightPanel: []
			},
			canBeDeleted: false
		};
		return nav;
	};

	getAllItems = () => {
		if (this.state.navigations && this.state.navigations.length > 0) {
			if (this.state.navigations[0].treeData) {
				return this.state.navigations[0].treeData.leftPanel.concat(
					this.findAllRightPanelItems(
						this.state.navigations[0].treeData.rightPanel
					)
				);
			}
		}
		return [];
	};

	findAllRightPanelItems = items => {
		var total = [];
		for (var i = 0; i < items.length; i++) {
			var item = items[i];
			var newItem = Object.assign({}, item);
			newItem.children = undefined;
			newItem.expanded = undefined;
			if (item.children && item.children.length > 0) {
				total.push(
					...[newItem].concat(this.findAllRightPanelItems(item.children))
				);
			} else {
				total.push(newItem);
			}
		}
		return total;
	};

	showMenu = activeMenu => {
		this.setState({ activeMenu });
	};

	render() {
		const { navigations } = this.state;
		return (
			<Fragment>
				<Spinner
					size={120}
					spinnerColor={'rgb(17, 161, 146)'}
					spinnerWidth={2}
					visible={this.state.isLoading}
				/>
				<AddHeadingDialog
					open={this.state.open}
					togglePopup={() => {
						this.togglePopup();
					}}
					saveHeading={nav => {
						this.saveHeading(nav);
					}}
					nav={this.state.nav}
					error={this.state.error}
					onChange={nav => {
						this.onChange(nav);
					}}
					onDelete={() => {
						this.onDelete();
					}}
					navItems={{}}
				/>

				{navigations &&
					navigations.length > 0 &&
					navigations.map((nav, index) => {
						return (
							<div
								style={
									nav.treeId === this.state.activeMenu
										? { display: 'block' }
										: { display: 'none' }
								}
							>
								<LeftPanel
									activeMenu={this.state.activeMenu}
									navigations={navigations}
									key={nav.treeId}
									index={index}
									treeData={Object.assign({}, nav.treeData)}
									heading={nav.heading}
									setTreeData={rightPanel => {
										this.setTreeData(rightPanel, nav.treeId);
									}}
									getNavigations={() => {
										this.getNavigations();
									}}
									addNewItemRightPanel={data => {
										this.addNewItemRightPanel(data, nav.treeId);
									}}
									addNewItemLeftPanel={data => {
										this.addNewItemLeftPanel(data, nav.treeId);
									}}
									deleteItem={id => {
										this.deleteItem(id, nav.treeId);
									}}
									updateItem={item => {
										this.updateItem(item, nav.treeId);
									}}
									saveChanges={() => {
										this.saveChanges();
									}}
									deleteLeftItem={data => {
										this.deleteLeftItem(data, nav.treeId);
									}}
									deleteRightItem={item => {
										this.deleteRightItem(item, nav.treeId);
									}}
									showMenu={treeId => {
										this.showMenu(treeId);
									}}
									showNavDialog={nav => {
										this.showNavDialog(nav);
									}}
								/>
							</div>
						);
					})}
			</Fragment>
		);
	}
}
