import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';
import { CustomToggle } from 'modules/shared/form';

import messages from 'lib/text';
import api from 'lib/api';

import Paper from 'material-ui/Paper';
import Button from '@material-ui/core/Button';
import Divider from 'material-ui/Divider';
import style from './style.css';
import InfoIcon from '@material-ui/icons/Info';

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];
	const numberFields = [
		'regular_price',
		'sale_price',
		'stock_quantity',
		'weight'
	];

	if (requiredFields.length > 0) {
		requiredFields.forEach(field => {
			if (values && !values[field]) {
				errors[field] = messages.errors_required;
			}
		});
	}

	if (numberFields.length > 0) {
		numberFields.forEach(field => {
			if (values && values[field] && isNaN(parseFloat(values[field]))) {
				errors[field] = messages.errors_number;
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

const skuExists = values => {
	if (values.sku && values.sku.length > 0) {
		return api.products
			.skuExists(values.id, values.sku)
			.then(response => response.status === 200);
	}
	return Promise.resolve(false);
};

const asyncValidate = values =>
	Promise.all([slugExists(values), skuExists(values)]).then(
		([isSlugExists, isSkuExists]) => {
			const errors = {};

			if (isSlugExists) {
				errors.slug = messages.errors_urlTaken;
			}

			if (isSkuExists) {
				errors.sku = messages.skuTaken;
			}

			if (Object.keys(errors).length > 0) {
				return Promise.reject(errors);
			}
			return Promise.resolve();
		}
	);

const ProductInventoryForm = ({
	handleSubmit,
	pristine,
	reset,
	submitting,
	initialValues,
	settings
}) => {
	const origin =
		initialValues && initialValues.origin ? initialValues.origin : '';
	const controlDisable = origin ? origin.includes(messages.circle) : false;
	return (
		<form onSubmit={handleSubmit}>
			<Paper className="paper-box" zDepth={0}>
				<div className={style.innerBox}>
					<div className="edit-product-section-title">
						{messages.products_inventory}
					</div>
					<div
						className={style.inventory + ' row'}
						style={{ marginBottom: 50, margin: 0 }}
					>
						<div className="col-xs-5">
							<div className="primary-color-title">
								{messages.products_pricing}
							</div>
							<div className="row">
								<div className="col-xs-6">
									<Field
										name="regular_price"
										component={TextField}
										floatingLabelText={`${messages.products_regularPrice} (${settings.currency_symbol})`}
										disabled={controlDisable}
										fullWidth
									/>
								</div>
								<div className="col-xs-6">
									<Field
										name="sale_price"
										component={TextField}
										floatingLabelText={`${messages.products_salePrice} (${settings.currency_symbol})`}
										disabled={controlDisable}
										fullWidth
									/>
								</div>
								<div className="col-xs-6">
									<Field
										name="date_sale_from"
										component={DatePicker}
										textFieldStyle={{ width: '100%' }}
										format={(value, name) => (value === '' ? null : value)}
										disabled={controlDisable}
										floatingLabelText={messages.products_dateSaleFrom}
									/>
								</div>
								<div className="col-xs-6">
									<Field
										name="date_sale_to"
										component={DatePicker}
										textFieldStyle={{ width: '100%' }}
										format={(value, name) => (value === '' ? null : value)}
										disabled={controlDisable}
										floatingLabelText={messages.products_dateSaleTo}
									/>
								</div>
							</div>
						</div>
						<div className="col-xs-2 "></div>
						<div className="col-xs-5 ">
							<div className="primary-color-title">
								{messages.products_inventory}
							</div>

							<Field
								name="sku"
								component={TextField}
								floatingLabelText={messages.products_sku}
								disabled={controlDisable}
								fullWidth
							/>

							<div className="row">
								<div className="col-xs-6">
									<Field
										name="stock_quantity"
										component={TextField}
										floatingLabelText={messages.products_stockQuantity}
										disabled={controlDisable}
										fullWidth
									/>
								</div>
								<div className="col-xs-6">
									<Field
										name="weight"
										component={TextField}
										floatingLabelText={`${messages.products_weight} (${settings.weight_unit})`}
										disabled={controlDisable}
										fullWidth
									/>
								</div>
							</div>

							<Field
								name="date_stock_expected"
								component={DatePicker}
								textFieldStyle={{ width: '100%' }}
								format={(value, name) => (value === '' ? null : value)}
								disabled={controlDisable}
								floatingLabelText={messages.products_dateStockExpected}
							/>
						</div>
					</div>
					<div className="edit-product-inventory-options toggle-field">
						{controlDisable ? (
							<p
								class="field-hint"
								style={{ fontSize: '18px', color: '#17a2b8', display: 'flex' }}
							>
								<InfoIcon />{' '}
								<span style={{ marginLeft: '8px' }}>
									{messages.inventoryWarningMessage}
								</span>
							</p>
						) : null}
						<Field
							name="stock_tracking"
							component={CustomToggle}
							label={messages.products_stockTracking}
							controlDisable={controlDisable}
						/>
						<Divider
							style={{
								marginTop: 10,
								marginBottom: 10,
								backgroundColor: '#F1F1F5'
							}}
						/>
						<Field
							name="stock_preorder"
							component={CustomToggle}
							label={messages.products_stockPreorder}
							controlDisable={controlDisable}
						/>
						<Divider
							style={{
								marginTop: 10,
								marginBottom: 10,
								backgroundColor: '#F1F1F5'
							}}
						/>
						<Field
							name="stock_backorder"
							component={CustomToggle}
							label={messages.products_stockBackorder}
							controlDisable={controlDisable}
						/>
						<Divider
							style={{
								marginTop: 10,
								marginBottom: 10,
								backgroundColor: '#F1F1F5'
							}}
						/>
						<Field
							name="discontinued"
							component={CustomToggle}
							label={messages.products_discontinued}
							controlDisable={controlDisable}
						/>
						<Divider
							style={{
								marginTop: 10,
								marginBottom: 10,
								backgroundColor: '#F1F1F5'
							}}
						/>
						<Field
							name="enabled"
							component={CustomToggle}
							label={messages.enabled}
							controlDisable={controlDisable}
						/>
					</div>
				</div>
				<div
					className={`buttons-box ${
						pristine ? 'buttons-box-pristine' : 'buttons-box-show'
					}`}
				>
					<Button
						className={style.button}
						style={{ marginLeft: 20 }}
						onClick={reset}
						disabled={pristine || submitting}
						variant="outlined"
						className={style.btnCreate}
						disabled={controlDisable}
					>
						{messages.cancel}
					</Button>
					<Button
						type="submit"
						style={{ marginLeft: 10 }}
						disabled={pristine || submitting}
						variant="contained"
						className={style.btnCreate}
						disabled={controlDisable}
					>
						{messages.save}
					</Button>
				</div>
			</Paper>
		</form>
	);
};

export default reduxForm({
	form: 'ProductInventoryForm',
	validate,
	asyncValidate,
	asyncBlurFields: ['sku'],
	enableReinitialize: true
})(ProductInventoryForm);
