import React from 'react';

import messages from 'lib/text';
import api from 'lib/api';
import * as helper from 'lib/helper';

import Dialog from 'material-ui/Dialog';
import Button from '@material-ui/core/Button';
import { InputBase } from '@material-ui/core';
import TextField from 'material-ui/TextField';
import Paper from '@material-ui/core/Paper';
import {
	Table,
	TableBody,
	TableFooter,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../theme/muiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const SearchBox = ({ text, onChange }) => (
	<TextField
		fullWidth
		floatingLabelText={messages.products_search}
		onChange={onChange}
		value={text}
	/>
);

const useStyles = makeStyles({
	table: {
		backgroundColor: 'orange'
	},

	tabelBody: {
		backgroundColor: 'transparent!important'
	},
	tableRowColumn: {
		backgroundColor: 'transparent!important'
	},
	// tableRowColumn: {
	// 	marginTop: '5px',
	// 	'&:fist-child': {
	// 		borderRadiusTopLeft: '14px',
	// 		borderRadiusTopRight: '14px',
	// 	},
	tableRow: {
		borderRadius: '20pximportant'

		// borderBottom: '0px!important',
		// '&:hover': {
		// 	border: '1px solid #3DD598!important',

		// }
	}
});

const SearchResult = ({ products, selectedIds, settings, onSelect }) => {
	const classes = useStyles();

	const rows = products.map((product, index) => {
		const priceFormatted = helper.formatCurrency(product.price, settings);

		const isSelected = selectedIds.includes(product.id);

		return (
			<TableRow key={index} selected={isSelected} className={classes.tableRow}>
				<TableRowColumn className={classes.tableRowColumn}>
					{product.name}
				</TableRowColumn>
				<TableRowColumn className={classes.tableRowColumn}>
					{product.category_name}
				</TableRowColumn>
				<TableRowColumn className={classes.tableRowColumn}>
					{product.sku}
				</TableRowColumn>
				<TableRowColumn
					style={{ textAlign: 'right' }}
					className={classes.tableRowColumn}
				>
					{priceFormatted}
				</TableRowColumn>
			</TableRow>
		);
	});

	return (
		<Table
			height="400px"
			className={classes.table}
			selectable
			multiSelectable={true}
			onRowSelection={onSelect}
		>
			<TableBody deselectOnClickaway={false} className={classes.tableBody}>
				{rows}
			</TableBody>
		</Table>
	);
};

export default class ConfirmationDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open,
			products: [],
			search: '',
			selectedIds: []
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.open !== nextProps.open) {
			this.setState({
				open: nextProps.open,
				search: '',
				selectedIds: []
			});
		}
	}

	componentDidMount() {
		api.products
			.list({
				enabled: true,
				discontinued: false,
				excludeProductId: this.props.excludeIds,
				fields:
					'id,name,category_id,category_name,sku,enabled,discontinued,price,on_sale,regular_price'
			})
			.then(productsResponse => {
				this.setState({
					products: productsResponse.json.data
				});
			});
	}

	handleCancel = () => {
		this.setState({ open: false });
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	};

	handleSubmit = () => {
		this.setState({ open: false });
		if (this.props.onSubmit) {
			this.props.onSubmit(this.state.selectedIds);
		}
	};

	handleRowSelection = selectedRows => {
		if (selectedRows && selectedRows.length > 0) {
			const selectedIndexes = selectedRows[0];
			const selectedProductIds = selectedRows.map(
				selectedIndex => this.state.products[selectedIndex].id
			);
			this.setState({
				selectedIds: selectedProductIds
			});
		} else {
			this.setState({
				selectedIds: []
			});
		}
	};

	handleSearch = (event, value) => {
		this.setState({ search: value });
		api.products
			.list({
				enabled: true,
				discontinued: false,
				excludeProductId: this.props.excludeIds,
				fields:
					'id,name,category_id,category_name,sku,enabled,discontinued,price,on_sale,regular_price',
				search: value
			})
			.then(productsResponse => {
				this.setState({
					products: productsResponse.json.data
				});
			});
	};

	render() {
		const {
			title,
			submitLabel,
			cancelLabel,
			modal = false,
			settings
		} = this.props;

		const actions = [
			<MuiThemeProvider theme={theme}>
				<Button
					onClick={this.handleCancel}
					style={{ marginRight: 10 }}
					variant="outlined"
				>
					{cancelLabel}
				</Button>
				<Button onClick={this.handleSubmit} variant="contained">
					{submitLabel}
				</Button>
			</MuiThemeProvider>
		];

		return (
			<Dialog
				title={title}
				actions={actions}
				actionsContainerStyle={{ borderTop: '1px solid rgb(224, 224, 224)' }}
				className="customModal"
				modal={modal}
				open={this.state.open}
				onRequestClose={this.handleCancel}
				paperProps={{ style: { borderRadius: '20px' } }}
			>
				<div className="sample"></div>
				<div>
					<SearchBox text={this.state.search} onChange={this.handleSearch} />
					<SearchResult
						products={this.state.products}
						selectedIds={this.state.selectedIds}
						onSelect={this.handleRowSelection}
						settings={settings}
					/>
				</div>
			</Dialog>
		);
	}
}
