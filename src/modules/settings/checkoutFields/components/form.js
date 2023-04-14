import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField, RadioButtonGroup } from 'redux-form-material-ui';

import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton } from 'material-ui/RadioButton';
import style from './style.css';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const radioButtonStyle = {
	marginTop: 14,
	marginBottom: 14
};

class CheckoutFieldForm extends React.Component {
	constructor() {
		super();
		this.state = {
			radioBtnValue: ''
		};
	}
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
				<Link to="/settings/checkout">
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
								name="label"
								floatingLabelText={messages.settings_fieldLabel}
							/>
						</div>
						<div>
							<Field
								component={TextField}
								fullWidth
								name="placeholder"
								floatingLabelText={messages.settings_fieldPlaceholder}
							/>
						</div>
						<div className="blue-title">{messages.settings_fieldStatus}</div>
						<div>
							<Field
								name="status"
								component={RadioButtonGroup}
								value={this.state.radioBtnValue}
								onChange={e => {
									this.setState({ radioBtnValue: e.target.value });
								}}
							>
								<RadioButton
									value="required"
									label={messages.settings_fieldRequired}
									style={radioButtonStyle}
									className={`${
										this.state.radioBtnValue === 'required'
											? 'activecustomRadioBox'
											: ''
									} customRadioBox`}
								/>
								<RadioButton
									value="optional"
									label={messages.settings_fieldOptional}
									style={radioButtonStyle}
									className={`${
										this.state.radioBtnValue === 'optional'
											? 'activecustomRadioBox'
											: ''
									} customRadioBox`}
								/>
								<RadioButton
									value="hidden"
									label={messages.settings_fieldHidden}
									style={radioButtonStyle}
									className={`${
										this.state.radioBtnValue === 'hidden'
											? 'activecustomRadioBox'
											: ''
									} customRadioBox`}
								/>
							</Field>
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
	form: 'CheckoutFieldForm',
	enableReinitialize: true
})(CheckoutFieldForm);
