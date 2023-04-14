import React from 'react';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import messages from 'lib/text';
import CustomersListItem from './item';
import Head from './head';
import style from './style.css';
import Pagination from '../../../pagination/customPagination.js';

export default class CustomersList extends React.Component {
	constructor() {
		super();
		this.state = {
			pageOfItems: []
		};
	}
	componentDidMount() {
		this.props.onLoad();
	}
	onChangePage = pageOfItems => {
		// update state with new page of items
		this.setState({ pageOfItems: pageOfItems });
	};
	render() {
		const {
			items,
			selected,
			loadingItems,
			hasMore,
			onSelect,
			onSelectAll,
			loadMore,
			settings
		} = this.props;
		const rows = this.state.pageOfItems.map((item, index) => (
			<CustomersListItem
				key={index}
				customer={item}
				selected={selected}
				onSelect={onSelect}
				settings={settings}
			/>
		));

		return (
			<div className="product-list">
				<List>
					<Head onSelectAll={onSelectAll} selected={selected} items={items} />
					{rows}
					<Pagination
						items={items}
						onChangePage={pageOfItems => {
							this.onChangePage(pageOfItems);
						}}
					/>
					{/* <div className={style.more}>
						<RaisedButton
							disabled={loadingItems || !hasMore}
							label={messages.actions_loadMore}
							labelPosition="before"
							primary={false}
							icon={<FontIcon className="material-icons">refresh</FontIcon>}
							onClick={loadMore}
						/>
					</div> */}
				</List>
			</div>
		);
	}
}
