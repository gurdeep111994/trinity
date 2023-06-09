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
	}
};

const FolderIcon = <FontIcon className="material-icons">folder</FontIcon>;

export default class StatusesList extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { onSelect, selectedId, items, showAll, showManage } = this.props;

		const rows = items.map(item => (
			<ListItem
				key={item.id}
				className="treeItem"
				style={item.id === selectedId ? styles.selectedItem : null}
				innerDivStyle={styles.innerItem}
				primaryText={item.name}
				leftIcon={<span className="listicon icon-folder" />}
				onClick={() => {
					this.props.onSelect(item.id);
				}}
			/>
		));

		return (
			<List>
				{showAll && (
					<ListItem
						className="treeItem"
						primaryText={messages.allOrderStatuses}
						style={selectedId === 'all' ? styles.selectedItem : null}
						innerDivStyle={styles.innerItem}
						leftIcon={<span className="listicon icon-folder" />}
						onClick={() => {
							onSelect('all');
						}}
					/>
				)}

				{rows}

				{showManage && (
					<Link to="/orders/statuses" style={{ textDecoration: 'none' }}>
						<ListItem
							className="treeItem"
							primaryText={messages.manageOrderStatuses}
							innerDivStyle={styles.innerItem}
							style={{ marginTop: '60px' }}
							leftIcon={<span className="listicon icon-settings" />}
						/>
					</Link>
				)}
			</List>
		);
	}
}
