import React from 'react';

import messages from 'lib/text';
import api from 'lib/api';
import * as helper from 'lib/helper';

import Dialog from 'material-ui/Dialog';
import Button from '@material-ui/core/Button';
import TextField from 'material-ui/TextField';
import {
	Table,
	TableBody,
	TableFooter,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn
} from 'material-ui/Table';
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

const SearchResult = ({ products, selectedId, settings, onSelect }) => {
	const rows = products.map((product, index) => {
		const priceFormatted = helper.formatCurrency(product.price, settings);
		const isSelected = product.id === selectedId;

		console.log('PANKAJJJ', product.name);

		return (
			<TableRow key={index} selected={isSelected}>
				<TableRowColumn>{product.name}</TableRowColumn>
				<TableRowColumn>{product.category_name}</TableRowColumn>
				<TableRowColumn>{product.sku}</TableRowColumn>
				<TableRowColumn style={{ textAlign: 'right' }}>
					{priceFormatted}
				</TableRowColumn>
			</TableRow>
		);
	});

	return (
		<Table
			height="400px"
			selectable
			multiSelectable={false}
			onRowSelection={onSelect}
		>
			<TableBody>{rows}</TableBody>
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
			selectedId: null
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.open !== nextProps.open) {
			this.setState({
				open: nextProps.open
			});
		}
	}

	componentDidMount() {
		api.products
			.list({
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
			this.props.onSubmit(this.state.selectedId);
		}
	};

	handleRowSelection = selectedRows => {
		if (selectedRows && selectedRows.length > 0) {
			const selectedIndex = selectedRows[0];
			const selectedProductId =
				this.state.products && this.state.products.length >= selectedIndex
					? this.state.products[selectedIndex].id
					: null;
			this.setState({
				selectedId: selectedProductId
			});
		}
	};

	handleSearch = (event, value) => {
		this.setState({ search: value });
		api.products
			.list({
				enabled: true,
				discontinued: false,
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
						selectedId={this.state.selectedId}
						onSelect={this.handleRowSelection}
						settings={settings}
					/>
				</div>
			</Dialog>
		);
	}
}
