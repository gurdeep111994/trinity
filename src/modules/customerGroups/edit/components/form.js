import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css';

import Grid from '@material-ui/core/Grid';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];

	requiredFields.forEach(field => {
		if (values && !values[field]) {
			errors[field] = messages.errors_required;
		}
	});

	return errors;
};

class Form extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			isSaving,
			initialValues
		} = this.props;

		let groupId = null;

		if (initialValues) {
			groupId = initialValues.id;
		}

		return (
			<Paper className="paper-box" zDepth={1}>
				<form onSubmit={handleSubmit}>
					<Grid item xs={4}>
						<Link to="/customers">
							<IconButton>
								<FontIcon className="material-icons">arrow_back</FontIcon>
							</IconButton>
						</Link>
						<span className={style.backArrowText}>Customers</span>
					</Grid>

					<div className={style.innerBox}>
						<Field
							name="name"
							component={TextField}
							floatingLabelText={`${messages.customerGroups_name} *`}
							fullWidth
						/>
						<br />
						<Field
							name="description"
							component={TextField}
							floatingLabelText={messages.description}
							fullWidth
							multiLine
							rows={2}
						/>
					</div>
					<div
						className="buttons-box"
						style={{ justifyContent: 'space-between' }}
					>
						<div>
							<FlatButton
								label={messages.cancel}
								className={style.button}
								onClick={this.props.onCancel}
							/>
							<RaisedButton
								type="submit"
								label={groupId ? messages.save : messages.add}
								primary
								className={style.button}
								disabled={pristine || submitting || isSaving}
							/>
						</div>
						<div>
							{groupId ? (
								<div>
									<RaisedButton
										style={{ float: 'right' }}
										label="Delete"
										primary
										className={style.button}
										onClick={() => {
											this.props.onDelete(groupId);
										}}
									/>
								</div>
							) : (
								''
							)}
						</div>
					</div>
				</form>
			</Paper>
		);
	}
}

export default reduxForm({
	form: 'FormCustomerGroup',
	validate,
	enableReinitialize: true
})(Form);
