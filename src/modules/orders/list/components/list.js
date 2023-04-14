import React from 'react';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import messages from 'lib/text';
import OrdersListItem from './item';
import Head from './head';
import style from './style.css';
import Pagination from '../../../pagination/customPagination.js';

export default class OrdersList extends React.Component {
	constructor() {
		super();
		this.state = {
			pageOfItems: []
		};
	}
	componentDidMount() {
		3;
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
			<OrdersListItem
				key={index}
				order={item}
				selected={selected}
				onSelect={onSelect}
				settings={settings}
			/>
		));

		return (
			<div>
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
