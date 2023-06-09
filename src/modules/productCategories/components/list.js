import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

const styles = {
	selectedItem: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)'
	},
	innerItem: {
		paddingLeft: 55
	},
	nestedListStyle: {
		padding: '0 0 0 15px'
	}
};

const FolderIcon = <span className="icon-folder listicon" />;
const DraftIcon = (
	<FontIcon className="material-icons">visibility_off</FontIcon>
);

class Item extends React.PureComponent {
	handleClick = () => {
		const { item } = this.props;
		this.props.onSelect(item.id);
	};

	render() {
		const { item, opened, selectedId, nestedItems } = this.props;
		const icon = item.enabled ? FolderIcon : DraftIcon;
		const style = item.id === selectedId ? styles.selectedItem : null;

		return (
			<ListItem
				className={`treeItem ${item.parent_id ? 'treeItemSub' : ''}`}
				initiallyOpen={opened}
				style={style}
				innerDivStyle={styles.innerItem}
				primaryText={item.name}
				nestedItems={nestedItems}
				leftIcon={icon}
				onClick={this.handleClick}
				nestedListStyle={styles.nestedListStyle}
			/>
		);
	}
}

export default class Categories extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	getItem(selectedId, allItems, item, opened) {
		const nestedItems = this.getChildren(selectedId, allItems, item.id, opened);
		return (
			<Item
				key={item.id}
				item={item}
				opened={opened}
				selectedId={selectedId}
				nestedItems={nestedItems}
				onSelect={this.props.onSelect}
			/>
		);
	}

	getChildren(selectedId, allItems, id, opened) {
		if (allItems && id) {
			return allItems
				.filter(item => item.parent_id === id)
				.map(item => this.getItem(selectedId, allItems, item, opened));
		}
		return [];
	}

	handleClickAll = () => {
		this.props.onSelect('all');
		document.getElementsByClassName('product-list')[0].style.display = 'block';
		if (
			document.getElementsByClassName('spread-sheet-container')[0] !== undefined
		) {
			document.getElementsByClassName(
				'spread-sheet-container'
			)[0].style.display = 'none';
		}
	};

	handleClickRoot = () => {
		this.props.onSelect('root');
		document.getElementsByClassName('product-list')[0].style.display = 'block';
		if (
			document.getElementsByClassName('spread-sheet-container')[0] !== undefined
		) {
			document.getElementsByClassName(
				'spread-sheet-container'
			)[0].style.display = 'none';
		}
	};

	handleClickImport = () => {
		document.getElementsByClassName('product-list')[0].style.display = 'none';
		if (
			document.getElementsByClassName('spread-sheet-container')[0] !== undefined
		) {
			document.getElementsByClassName(
				'spread-sheet-container'
			)[0].style.display = 'block';
		}
	};

	render() {
		const {
			selectedId,
			items,
			showAll = false,
			showRoot = false,
			showManage = false,
			showImport = true,
			rootName = messages.productCategories_root,
			allName = messages.productCategories_all,
			opened = false
		} = this.props;

		const rows = items
			.filter(item => item.parent_id === null)
			.map(item => this.getItem(selectedId, items, item, opened));

		return (
			<List>
				{showRoot && (
					<ListItem
						primaryText={rootName}
						style={selectedId === 'root' ? styles.selectedItem : null}
						innerDivStyle={styles.innerItem}
						leftIcon={<FontIcon className="material-icons">home</FontIcon>}
						onClick={this.handleClickRoot}
					/>
				)}

				{showAll && (
					<ListItem
						className="treeItem"
						primaryText={allName}
						style={selectedId === 'all' ? styles.selectedItem : null}
						innerDivStyle={styles.innerItem}
						leftIcon={<span className="listicon icon-folder" />}
						onClick={this.handleClickAll}
					/>
				)}

				{rows}

				{showManage && (
					<Link to="/products/categories" style={{ textDecoration: 'none' }}>
						<ListItem
							className="treeItem"
							primaryText={messages.productCategories_titleEditMany}
							innerDivStyle={styles.innerItem}
							leftIcon={<span className="listicon icon-settings" />}
							style={{ marginTop: '60px' }}
						/>
					</Link>
				)}

				{showImport && (
					<Link to="/products/import" style={{ textDecoration: 'none' }}>
						<ListItem
							className="treeItem"
							primaryText={messages.drawer_importing}
							innerDivStyle={styles.innerItem}
							leftIcon={<span className="listicon icon-upload-file" />}
							onClick={this.handleClickImport}
						/>
					</Link>
				)}
			</List>
		);
	}
}
