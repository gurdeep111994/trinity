import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import messages from 'lib/text';
import CategorySelect from 'modules/productCategories/select';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button';
import style from './style.css';
import theme from '../../../../../theme/muiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
const { Fragment } = React;

export default class ProductCategorySelect extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	close = () => {
		this.setState({ open: false });
	};

	open = () => {
		this.setState({ open: true });
	};

	handleSelect = categoryId => {
		this.props.input.onChange(categoryId);
	};

	render() {
		const {
			categories,
			input,
			meta: { touched, error }
		} = this.props;
		const { open } = this.state;
		const selectedCategoryId = input.value;
		const category = categories.find(item => item.id === selectedCategoryId);
		const categoryName = category ? category.name : '';

		const dialogButtons = [
			<MuiThemeProvider theme={theme}>
				<Button
					onClick={this.close}
					style={{ marginRight: 10 }}
					variant="outlined"
				>
					{messages.cancel}
				</Button>
				<Button keyboardFocused onClick={this.close} variant="contained">
					{messages.save}
				</Button>
			</MuiThemeProvider>
		];

		return (
			<Fragment>
				<Dialog
					title={messages.category}
					actions={dialogButtons}
					className="customModal"
					modal={false}
					open={open}
					onRequestClose={this.close}
					autoScrollBodyContent
					paperProps={{ style: { borderRadius: '20px' } }}
				>
					<CategorySelect
						onSelect={this.handleSelect}
						selectedId={selectedCategoryId}
						opened={false}
					/>
				</Dialog>
				<FlatButton
					label={categoryName}
					onClick={this.open}
					icon={<img src="/assets/images/apps/editgrey.svg" />}
				/>
			</Fragment>
		);
	}
}
