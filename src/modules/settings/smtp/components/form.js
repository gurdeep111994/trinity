import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

class EmailSettings extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { handleSubmit, pristine, submitting, initialValues } = this.props;

		return (
			<form
				onSubmit={handleSubmit}
				style={{
					display: 'initial',
					width: '100%'
				}}
			>
				<Link to="/settings/email">
					<IconButton>
						<FontIcon color="#92929D" className="material-icons">
							keyboard_arrow_left
						</FontIcon>
					</IconButton>
				</Link>
				<Paper className="paper-box" zDepth={1}>
					<div className={style.innerBox}>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="host"
								hintText="smtp.server.com"
								floatingLabelText={messages.settings_smtpHost}
							/>
						</div>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="port"
								type="number"
								hintText="465"
								floatingLabelText={messages.settings_smtpPort}
							/>
						</div>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="user"
								floatingLabelText={messages.settings_smtpUser}
							/>
						</div>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="pass"
								type="password"
								floatingLabelText={messages.settings_smtpPass}
							/>
						</div>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="from_name"
								floatingLabelText={messages.settings_emailFromName}
							/>
						</div>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="from_address"
								type="email"
								floatingLabelText={messages.settings_emailFromAddress}
							/>
						</div>
					</div>
					<div className="buttons-box">
						<RaisedButton
							type="submit"
							label={messages.save}
							primary
							className={style.button}
							disabled={pristine || submitting}
						/>
					</div>
				</Paper>
			</form>
		);
	}
}

export default reduxForm({
	form: 'EmailSettingsForm',
	enableReinitialize: false
})(EmailSettings);
