import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';

import { CustomToggle } from 'modules/shared/form';
import PaymentGateway from 'modules/settings/paymentGateway';
import { AVAILABLE_PAYMENT_GATEWAYS } from 'modules/settings/paymentGateway/availablePaymentGateways';
import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import style from './style.css';
import SelectShippingMethodsField from './selectShipping.js';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import commonStyle from '../../style.css';

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

class EditPaymentMethodForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			gateway: null
		};
	}

	componentDidMount() {
		this.props.onLoad();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.initialValues !== this.props.initialValues) {
			this.setState({
				gateway: nextProps.initialValues.gateway
			});
		}
	}

	onGatewayChange = gateway => {
		this.setState({
			gateway
		});
	};

	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			initialValues,
			shippingMethods,
			methodId,
			settings
		} = this.props;
		const isAdd = methodId === null || methodId === undefined;
		const paymentGateways = [];
		paymentGateways.push(<MenuItem value="" key="none" primaryText="None" />);
		for (const gateway of AVAILABLE_PAYMENT_GATEWAYS) {
			paymentGateways.push(
				<MenuItem
					value={gateway.key}
					key={gateway.key}
					primaryText={gateway.name}
				/>
			);
		}

		return (
			<form onSubmit={handleSubmit} className={commonStyle.inputForm}>
				<Link to="/settings/payments">
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
								<div className={commonStyle.bigTitel}>
									{messages.paymentGateway}
								</div>
							</div>
							<div className="col-xs-12 col-sm-8">
								<div>
									<Field
										className={commonStyle.textField}
										component={SelectField}
										autoWidth
										fullWidth
										name="gateway"
										floatingLabelFixed
										floatingLabelText={messages.paymentGateway}
										onChange={(event, currentValue, prevValue) => {
											this.onGatewayChange(currentValue);
										}}
									>
										{paymentGateways}
									</Field>
								</div>
								<PaymentGateway gateway={this.state.gateway} />
							</div>
						</div>
						<Divider className={commonStyle.divider} />
						<div className="row" style={{ marginTop: '40px' }}>
							<div
								className="col-xs-12 col-sm-4"
								style={{ alignSelf: 'center' }}
							>
								<div className={commonStyle.bigTitel}>
									{messages.description}
								</div>
							</div>
							<div className="col-xs-12 col-sm-8">
								<div>
									<Field
										className={commonStyle.textField}
										component={TextField}
										fullWidth
										name="name"
										floatingLabelText={messages.settings_paymentMethodName}
									/>
								</div>
								<div>
									<Field
										className={commonStyle.textField}
										component={TextField}
										fullWidth
										name="description"
										multiLine
										floatingLabelText={messages.description}
									/>
								</div>
								<div>
									<Field
										className={commonStyle.toggleField}
										component={CustomToggle}
										name="enabled"
										label={messages.enabled}
										style={{ paddingTop: 16, paddingBottom: 20 }}
									/>
								</div>
								<Divider />
							</div>
						</div>
						<Divider className={commonStyle.divider} />
						<div className="row" style={{ marginTop: '40px' }}>
							<div
								className="col-xs-12 col-sm-4"
								style={{ alignSelf: 'center' }}
							>
								<div className={commonStyle.bigTitel}>
									{messages.settings_conditions}
								</div>
							</div>
							<div className="col-xs-12 col-sm-8">
								<div>
									<Field
										className={commonStyle.textField}
										component={TextField}
										fullWidth
										name="conditions.countries"
										floatingLabelText={messages.settings_countries}
										hintText="US,UK,AU,SG"
									/>
								</div>
								<div className="row">
									<div className="col-xs-6">
										<Field
											className={commonStyle.textField}
											component={TextField}
											name="conditions.subtotal_min"
											type="number"
											fullWidth
											floatingLabelText={`${messages.settings_minSubtotal} (${settings.currency_symbol})`}
										/>
									</div>
									<div className="col-xs-6">
										<Field
											className={commonStyle.textField}
											component={TextField}
											name="conditions.subtotal_max"
											type="number"
											fullWidth
											floatingLabelText={`${messages.settings_maxSubtotal} (${settings.currency_symbol})`}
										/>
									</div>
								</div>
								<div className="gray-title" style={{ marginTop: '30px' }}>
									{messages.settings_onlyShippingMethods}
								</div>
								<Field
									name="conditions.shipping_method_ids"
									component={SelectShippingMethodsField}
									shippingMethods={shippingMethods}
								/>
							</div>
						</div>
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
	form: 'EditPaymentMethodForm',
	validate,
	enableReinitialize: true
})(EditPaymentMethodForm);
