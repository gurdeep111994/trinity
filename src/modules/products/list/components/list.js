import React, { Fragment } from 'react';
import { List } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import messages from 'lib/text';
import ProductsListItem from './item';
import Head from './head';
import style from './style.css';
import ListHead from './list-head';
import Pagination from '../../../pagination/customPagination';

export default class ProductsList extends React.Component {
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
		this.setState({ pageOfItems });
	};

	render() {
		const {
			items,
			selected,
			loadingItems,
			onSelect,
			onSelectAll,
			selectedAll,
			loadMore,
			settings,
			hasMore,
			totalCount,
			onCreate,
			setSearch,
			changeVisiblity,
			onPodProductCreate
		} = this.props;

		const rows = this.state.pageOfItems.map(item => {
			const itemSelected = selected.includes(item.id);
			return (
				<Fragment>
					<ProductsListItem
						key={item.id}
						product={item}
						selected={itemSelected}
						onSelect={onSelect}
						settings={settings}
						onActionClick={changeVisiblity}
					/>
				</Fragment>
			);
		});

		return (
			<div className="product-list">
				<ListHead
					onCreate={onCreate}
					setSearch={setSearch}
					onPodProductCreate={onPodProductCreate}
				/>

				<List>
					<Head onSelectAll={onSelectAll} selected={selected} items={items} />

					<div className={style.mt4} />

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
