import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { CustomToggle } from 'modules/shared/form';
import * as helper from 'lib/helper';
import messages from 'lib/text';

import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import style from './style.css';

const validate = values => {
	const errors = {};
	const requiredFields = [];

	if (requiredFields.length > 0) {
		requiredFields.forEach(field => {
			if (values && !values[field]) {
				errors[field] = messages.errors_required;
			}
		});
	}

	return errors;
};

const getShippingFieldLabel = ({ label, key }) =>
	label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key);

class ShippingAddressForm extends React.Component {
	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			initialValues,
			onCancel,
			shippingMethod
		} = this.props;

		let shippingFields = null;
		if (
			shippingMethod &&
			shippingMethod.fields &&
			shippingMethod.fields.length > 0
		) {
			shippingFields = shippingMethod.fields.map((field, index) => {
				const fieldLabel = getShippingFieldLabel(field);

				return (
					<Field
						key={index}
						component={TextField}
						fullWidth
						name={field.key}
						floatingLabelText={fieldLabel}
					/>
				);
			});
		}

		return (
			<form onSubmit={handleSubmit}>
				<div>
					{shippingFields}
					<Field
						component={TextField}
						fullWidth
						name="city"
						floatingLabelText={messages.city}
					/>
					<div className="row">
						<div className="col-xs-6">
							<Field
								component={TextField}
								fullWidth
								name="state"
								floatingLabelText={messages.state}
							/>
						</div>
						<div className="col-xs-6">
							<Field
								component={TextField}
								fullWidth
								name="postal_code"
								floatingLabelText={messages.postal_code}
							/>
						</div>
					</div>
					<Field
						component={TextField}
						fullWidth
						name="country"
						floatingLabelText={messages.country}
					/>
				</div>
				<div className={style.shippingButtons}>
					<FlatButton
						className="modalbtns cancel-btn"
						label={messages.cancel}
						onClick={onCancel}
					/>
					<FlatButton
						label={messages.save}
						primary
						className="modalbtns"
						type="submit"
						style={{ marginLeft: 12 }}
						disabled={pristine || submitting}
					/>
				</div>
			</form>
		);
	}
}

export default reduxForm({
	form: 'ShippingAddressForm',
	validate,
	enableReinitialize: true
})(ShippingAddressForm);
