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

class EmailTemplate extends React.Component {
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
								name="subject"
								floatingLabelText={messages.settings_emailSubject}
							/>
						</div>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="body"
								multiLine
								floatingLabelText={messages.settings_emailBody}
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

export default reduxForm({ form: 'EmailTemplate', enableReinitialize: true })(
	EmailTemplate
);
