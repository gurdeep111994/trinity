import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import messages from 'lib/text';
import CategoryMultiselect from 'modules/productCategories/components/multiselectList';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button';
import style from './style.css';
import theme from '../../../../../theme/muiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';

const { Fragment } = React;

const CategoryItemActions = ({ fields, index }) => (
	<a
		title={messages.actions_delete}
		onClick={() => fields.remove(index)}
		className="react-tagsinput-remove"
	/>
);

const CategoryItem = ({ categoryName, actions }) => (
	<span className="react-tagsinput-tag">
		{categoryName}
		{actions}
	</span>
);

export default class ProductCategoryMultiSelect extends React.Component {
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

	handleCheck = categoryId => {
		const selectedIds = this.props.fields.getAll();
		if (selectedIds && selectedIds.includes(categoryId)) {
			// remove
			this.props.fields.forEach((name, index, fields) => {
				if (fields.get(index) === categoryId) {
					fields.remove(index);
				}
			});
		} else {
			// add
			this.props.fields.push(categoryId);
		}
	};

	render() {
		const {
			categories,
			fields,
			meta: { touched, error, submitFailed }
		} = this.props;
		const { open } = this.state;
		const selectedIds = fields.getAll();

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
			<div className="react-tagsinput">
				<span>
					{fields.map((field, index) => {
						const categoryId = fields.get(index);
						const category = categories.find(item => item.id === categoryId);
						const categoryName = category ? category.name : '-';
						const actions = (
							<CategoryItemActions fields={fields} index={index} />
						);
						return (
							<CategoryItem
								key={index}
								categoryName={categoryName}
								actions={actions}
							/>
						);
					})}
					<Dialog
						title={messages.additionalCategories}
						actions={dialogButtons}
						className="customModal"
						modal={false}
						open={open}
						onRequestClose={this.close}
						autoScrollBodyContent
						paperProps={{ style: { borderRadius: '20px' } }}
					>
						<CategoryMultiselect
							items={categories}
							selectedIds={selectedIds}
							opened={false}
							onCheck={this.handleCheck}
						/>
					</Dialog>
					<FlatButton
						onClick={this.open}
						icon={
							<FontIcon color="#92929D" className="material-icons">
								addfff
							</FontIcon>
						}
					/>
				</span>
			</div>
		);
	}
}
