import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Editor from 'modules/shared/editor';

import messages from 'lib/text';
import api from 'lib/api';

import Paper from 'material-ui/Paper';
import Button from '@material-ui/core/Button';
import style from './style.css';
import { makeStyles } from '@material-ui/core/styles';

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

const slugExists = values => {
	if (values.slug && values.slug.length > 0) {
		return api.products
			.slugExists(values.id, values.slug)
			.then(response => response.status === 200);
	}
	return Promise.resolve(false);
};

const asyncValidate = values =>
	Promise.all([slugExists(values)]).then(([isSlugExists]) => {
		const errors = {};

		if (isSlugExists) {
			errors.slug = messages.errors_urlTaken;
		}

		if (Object.keys(errors).length > 0) {
			return Promise.reject(errors);
		}
		return Promise.resolve();
	});

const ProductGeneralForm = ({
	handleSubmit,
	pristine,
	reset,
	submitting,
	initialValues
}) => {
	if (initialValues) {
		return (
			<form onSubmit={handleSubmit}>
				<Paper className="paper-box" zDepth={0}>
					<div className={[style.innerBox, style.innerText].join(' ')}>
						<div className="edit-product-section-title">
							{messages.description}
						</div>
						<Field
							name="name"
							component={TextField}
							floatingLabelText={`${messages.products_name} *`}
							fullWidth
						/>
						<Field
							name="slug"
							component={TextField}
							floatingLabelText={messages.slug}
							fullWidth
						/>
						<p className="field-hint">{messages.help_slug}</p>
						<Field
							name="meta_title"
							component={TextField}
							floatingLabelText={messages.pageTitle}
							fullWidth
						/>
						<Field
							name="meta_description"
							component={TextField}
							floatingLabelText={messages.metaDescription}
							fullWidth
						/>
						<div className="field-hint" style={{ marginTop: 40 }}>
							{messages.product_description}
						</div>
						<Field name="description" component={Editor} />
						<div
							className={`buttons-box ${
								pristine ? 'buttons-box-pristine' : 'buttons-box-show'
							}`}
						>
							<Button
								className={style.button}
								style={{ marginRight: 10 }}
								onClick={reset}
								disabled={pristine || submitting}
								variant="outlined"
							>
								{messages.cancel}
							</Button>
							<Button
								type="submit"
								className={style.button}
								disabled={pristine || submitting}
								variant="contained"
							>
								{messages.save}
							</Button>
						</div>
					</div>
				</Paper>
			</form>
		);
	}
	return null;
};

export default reduxForm({
	form: 'ProductGeneralForm',
	validate,
	asyncValidate,
	asyncBlurFields: ['slug'],
	enableReinitialize: true
})(ProductGeneralForm);
