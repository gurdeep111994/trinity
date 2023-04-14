import React from 'react';
import { Link } from 'react-router-dom';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { CustomToggle } from 'modules/shared/form';
import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css';
import FieldsEditor from './fieldsEditor';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];

	if (requiredFields.length > 0) {
		requiredFields.forEach(field => {
			if (values && !values[field]) {
				errors[field] = messages.errors_required;
			}
		});
	}

	return errors;
};

class EditShippingMethodForm extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			initialValues,
			methodId,
			settings
		} = this.props;
		const isAdd = methodId === null || methodId === undefined;

		return (
			<form onSubmit={handleSubmit} className={style.inputForm}>
				<Link to="/settings/shipping">
					<IconButton>
						<FontIcon color="#92929D" className="material-icons">
							keyboard_arrow_left
						</FontIcon>
					</IconButton>
				</Link>
				<Paper className="paper-box" zDepth={1}>
					<div className={style.innerBox}>
						<div className="row">
							<div
								className="col-xs-12 col-sm-4"
								style={{ alignSelf: 'center' }}
							>
								<div className={style.bigTitel}>{messages.description}</div>
							</div>
							<div className="col-xs-12 col-sm-8">
								<div>
									<Field
										className={style.textField}
										component={TextField}
										fullWidth
										name="name"
										floatingLabelText={messages.settings_shippingMethodName}
									/>
								</div>
								<div>
									<Field
										className={style.textField}
										component={TextField}
										fullWidth
										name="description"
										multiLine
										floatingLabelText={messages.description}
									/>
								</div>

								<div className="row">
									<div className="col-xs-6">
										<Field
											className={style.textField}
											component={TextField}
											name="price"
											type="number"
											fullWidth
											floatingLabelText={`${messages.settings_shippingRate} (${settings.currency_symbol})`}
										/>
									</div>
									<div className="col-xs-6">
										<Field
											className={style.toggleField}
											component={CustomToggle}
											name="enabled"
											label={messages.enabled}
											style={{ paddingTop: 16, paddingBottom: 24 }}
										/>
										<Divider />
									</div>
								</div>
							</div>
						</div>
						<Divider className={style.divider} />
						<div className="row" style={{ marginTop: '40px' }}>
							<div
								className="col-xs-12 col-sm-4"
								style={{ alignSelf: 'center' }}
							>
								<div className={style.bigTitel}>
									{messages.settings_conditions}
								</div>
							</div>
							<div className="col-xs-12 col-sm-8">
								<div>
									<Field
										className={style.textField}
										component={TextField}
										fullWidth
										name="conditions.countries"
										floatingLabelText={messages.settings_countries}
										hintText="US,UK,AU,SG"
									/>
								</div>
								<div>
									<Field
										className={style.textField}
										component={TextField}
										fullWidth
										name="conditions.states"
										floatingLabelText={messages.settings_states}
										hintText="California,Nevada,Oregon"
									/>
								</div>
								<div>
									<Field
										component={TextField}
										className={style.textField}
										fullWidth
										name="conditions.cities"
										floatingLabelText={messages.settings_cities}
										hintText="Los Angeles,San Diego,San Jose"
									/>
								</div>

								<div className="row">
									<div className="col-xs-6">
										<Field
											className={style.textField}
											component={TextField}
											name="conditions.weight_total_min"
											type="number"
											fullWidth
											floatingLabelText={`${messages.settings_minTotalWeight} (${settings.weight_unit})`}
										/>
									</div>
									<div className="col-xs-6">
										<Field
											className={style.textField}
											component={TextField}
											name="conditions.weight_total_max"
											type="number"
											fullWidth
											floatingLabelText={`${messages.settings_maxTotalWeight} (${settings.weight_unit})`}
										/>
									</div>
								</div>

								<div className="row">
									<div className="col-xs-6">
										<Field
											className={style.textField}
											component={TextField}
											name="conditions.subtotal_min"
											type="number"
											fullWidth
											floatingLabelText={`${messages.settings_minSubtotal} (${settings.currency_symbol})`}
										/>
									</div>
									<div className="col-xs-6">
										<Field
											className={style.textField}
											component={TextField}
											name="conditions.subtotal_max"
											type="number"
											fullWidth
											floatingLabelText={`${messages.settings_maxSubtotal} (${settings.currency_symbol})`}
										/>
									</div>
								</div>
							</div>
						</div>
						<Divider className={style.divider} />
						<div className="row" style={{ marginTop: '40px' }}>
							<div
								className="col-xs-12 col-sm-4"
								style={{ alignSelf: 'center' }}
							>
								<div className={style.bigTitel}>
									{messages.settings_checkoutFields}
								</div>
								<div className="field-hint">
									<p>Standard:</p>
									<ul>
										<li>full_name</li>
										<li>address1</li>
										<li>address2</li>
										<li>postal_code</li>
										<li>phone</li>
										<li>company</li>
									</ul>
								</div>
							</div>
							<div className="col-xs-12 col-sm-8">
								<FieldArray name="fields" component={FieldsEditor} />
							</div>
						</div>
						<Divider className={style.divider} />
					</div>
					<div className="buttons-box">
						<RaisedButton
							type="submit"
							label={isAdd ? messages.add : messages.save}
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
	form: 'EditShippingMethodForm',
	validate,
	enableReinitialize: true
})(EditShippingMethodForm);
