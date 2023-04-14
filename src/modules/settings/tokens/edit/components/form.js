import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import messages from 'lib/text';
import ConfirmationDialog from 'modules/shared/confirmation';
import { MultiSelect } from 'modules/shared/form';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Button from '@material-ui/core/Button';
import style from './style.css';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const Scopes = [
	'admin',
	'dashboard',
	'read:products',
	'write:products',
	'read:product_categories',
	'write:product_categories',
	'read:orders',
	'write:orders',
	'read:customers',
	'write:customers',
	'read:customer_groups',
	'write:customer_groups',
	'read:pages',
	'write:pages',
	'read:order_statuses',
	'write:order_statuses',
	'read:theme',
	'write:theme',
	'read:sitemap',
	'',
	'read:shipping_methods',
	'write:shipping_methods',
	'read:payment_methods',
	'write:payment_methods',
	'read:settings',
	'write:settings',
	'read:files',
	'write:files'
];

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];

	if (requiredFields.length > 0) {
		requiredFields.forEach(field => {
			if (!values.is_system && values && !values[field]) {
				errors[field] = messages.errors_required;
			}
		});
	}

	return errors;
};

class EditTokenForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			showRevokeDialog: false
		};
	}

	handleRevoke = () => {
		this.setState({ showRevokeDialog: true });
	};

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			initialValues,
			tokenId,
			newToken,
			onDelete
		} = this.props;
		const isTokenAdded = !!newToken;
		const isAdd = tokenId === null || tokenId === undefined;

		return (
			<div>
				<Link to="/settings/tokens">
					<IconButton>
						<FontIcon color="#92929D" className="material-icons">
							keyboard_arrow_left
						</FontIcon>
					</IconButton>
				</Link>
				<form onSubmit={handleSubmit}>
					<Paper className="paper-box" zDepth={1}>
						<div className={style.innerBox}>
							<Field
								name="name"
								component={TextField}
								floatingLabelText={messages.settings_tokenName}
								fullWidth
							/>
							<Field
								name="email"
								component={TextField}
								floatingLabelText={messages.email}
								fullWidth
								disabled={!isAdd}
								type="email"
							/>
							<Field
								name="expiration"
								component={TextField}
								floatingLabelText={messages.settings_tokenExp}
								fullWidth
								type="number"
							/>
							<div className="blue-title">{messages.settings_selectScopes}</div>
							<Field
								name="scopes"
								component={MultiSelect}
								items={Scopes}
								disabled={!isAdd}
							/>
						</div>
						<div className="buttons-box">
							{!isAdd && (
								<Button
									primary
									style={{ float: 'left', marginRight: '10px' }}
									onClick={this.handleRevoke}
									variant="outlined"
								>
									{messages.settings_revokeAccess}
								</Button>
							)}
							<Button
								type="submit"
								variant="contained"
								primary
								style={{ marginRight: '10px' }}
								disabled={pristine || submitting}
							>
								{isAdd ? messages.settings_generateToken : messages.save}
							</Button>
						</div>
					</Paper>
				</form>

				<ConfirmationDialog
					open={isTokenAdded}
					title={messages.settings_copyYourNewToken}
					description={newToken}
					submitLabel={messages.actions_done}
					cancelLabel={messages.cancel}
					modal
				/>

				<ConfirmationDialog
					open={this.state.showRevokeDialog}
					title={messages.settings_tokenRevokeTitle}
					description={messages.settings_tokenRevokeDescription}
					onSubmit={onDelete}
					submitLabel={messages.settings_revokeAccess}
					cancelLabel={messages.cancel}
				/>
			</div>
		);
	}
}

export default reduxForm({
	form: 'EditTokenForm',
	validate,
	enableReinitialize: true
})(EditTokenForm);
