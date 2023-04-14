import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { TextField, SelectField, DatePicker } from 'redux-form-material-ui';

import { CustomToggle } from 'modules/shared/form';
import messages from 'lib/text';
import data from 'lib/data';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import style from './style.css';

class GeneralSettings extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { handleSubmit, pristine, submitting, initialValues } = this.props;

		const currencyItems = [];
		for (const key in data.currencies) {
			currencyItems.push(
				<MenuItem
					value={key}
					key={key}
					primaryText={`${key} - ${data.currencies[key]}`}
				/>
			);
		}

		const taxItems = [];
		for (const key in data.taxs) {
			taxItems.push(
				<MenuItem
					value={key}
					key={key}
					primaryText={`${key} - ${data.taxs[key]}`}
				/>
			);
		}

		const timezoneItems = [];
		for (const key in data.timezones) {
			const { utc } = data.timezones[key];
			const utcPretty = `${utc.slice(0, -2)}:${utc.slice(-2)}`;
			timezoneItems.push(
				<MenuItem
					value={key}
					key={key}
					primaryText={`(UTC${utcPretty}) ${key}`}
				/>
			);
		}

		const countryItems = [];
		for (const key in data.countries) {
			countryItems.push(
				<MenuItem value={key} key={key} primaryText={data.countries[key]} />
			);
		}

		return (
			<form
				className={style.inputForm}
				onSubmit={handleSubmit}
				style={{
					display: 'initial',
					width: '100%'
				}}
			>
				<Paper
					className={`${style.paperBox} paper-box`}
					zDepth={1}
					style={{ margin: '0' }}
				>
					<div
						className={[style.innerBox, style.formText].join(' ')}
						style={{ padding: '0' }}
					>
						<div style={{ width: '100%' }}>
							<List>
								<Link
									className={style.nolinkbg}
									to="/settings/general/logo"
									style={{ textDecoration: 'none' }}
								>
									<ListItem
										innerDivStyle={{ paddingLeft: '0' }}
										rightIcon={
											<FontIcon className="material-icons">
												keyboard_arrow_right
											</FontIcon>
										}
										primaryText={
											<div
												className={style.txtlabel}
												style={{ fontWeight: '500' }}
											>
												{messages.logo}
											</div>
										}
									/>
								</Link>

								<Link
									className={style.nolinkbg}
									to="/settings/general/favicon"
									style={{ textDecoration: 'none' }}
								>
									<ListItem
										innerDivStyle={{ paddingLeft: '0' }}
										rightIcon={
											<FontIcon className="material-icons">
												keyboard_arrow_right
											</FontIcon>
										}
										primaryText={
											<div
												className={style.txtlabel}
												style={{ fontWeight: '500' }}
											>
												Fav Icon
											</div>
										}
									/>
								</Link>

								<Link
									className={style.nolinkbg}
									to="/settings/general/brandimage"
									style={{ textDecoration: 'none' }}
								>
									<ListItem
										innerDivStyle={{ paddingLeft: '0' }}
										rightIcon={
											<FontIcon className="material-icons">
												keyboard_arrow_right
											</FontIcon>
										}
										primaryText={
											<div
												className={style.txtlabel}
												style={{ fontWeight: '500' }}
											>
												Brand Image
											</div>
										}
									/>
								</Link>

								<Divider className={style.divider} />
							</List>
						</div>

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_storeName}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									placeholder="enter store name"
									fullWidth
									name="store_name"
								/>
							</div>
						</div>

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{' '}
									{messages.currency}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="currency_code"
								>
									{currencyItems}
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_currencyFormatting}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={TextField}
									fullWidth
									name="currency_format"
									floatingLabelText={messages.settings_currencyFormatting}
								/>

								<Field
									className="customSelector"
									component={TextField}
									fullWidth
									name="currency_symbol"
									floatingLabelText={messages.settings_currencySymbol}
								/>

								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									floatingLabelFixed
									fullWidth
									name="thousand_separator"
									floatingLabelText={messages.settings_thousandSeparator}
								>
									<MenuItem value="." primaryText="5.000.000" />
									<MenuItem value="," primaryText="5,000,000" />
									<MenuItem value=" " primaryText="5 000 000" />
									<MenuItem value="" primaryText="5000000" />
								</Field>

								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="decimal_separator"
									floatingLabelText={messages.settings_decimalSeparator}
								>
									<MenuItem value="." primaryText="100.00" />
									<MenuItem value="," primaryText="100,00" />
								</Field>

								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="decimal_number"
									floatingLabelText={messages.settings_numberOfDecimal}
								>
									<MenuItem value={0} primaryText="100" />
									<MenuItem value={1} primaryText="100.0" />
									<MenuItem value={2} primaryText="100.00" />
									<MenuItem value={3} primaryText="100.000" />
									<MenuItem value={4} primaryText="100.0000" />
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<Field
							component={CustomToggle}
							name="tax_included"
							label={messages.settings_taxIncluded}
							style={{ paddingTop: 16, paddingBottom: 16 }}
						/>

						<Divider className={style.divider} />
						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_taxRate}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="tax_rate"
									type="number"
									placeholder="0"
								/>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{' '}
									{messages.settings_timezone}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="timezone"
								>
									{timezoneItems}
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_dateFormat}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="date_format"
								>
									<MenuItem
										value="MMMM D, YYYY"
										primaryText="January 30, 2017"
									/>
									<MenuItem value="D MMMM YYYY" primaryText="30 January 2017" />
									<MenuItem value="YYYY-MM-DD" primaryText="2017-01-30" />
									<MenuItem value="YYYY-M-D" primaryText="2017-1-30" />
									<MenuItem value="MM/DD/YYYY" primaryText="01/30/2017" />
									<MenuItem value="MM.DD.YYYY" primaryText="01.30.2017" />
									<MenuItem value="DD/MM/YYYY" primaryText="30/01/2017" />
									<MenuItem value="DD.MM.YYYY" primaryText="30.01.2017" />
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_timeFormat}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="time_format"
								>
									<MenuItem value="h:mm a" primaryText="2:30 pm" />
									<MenuItem value="h:mm A" primaryText="2:30 PM" />
									<MenuItem value="HH:mm" primaryText="14:30" />
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_weightUnit}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="weight_unit"
								>
									<MenuItem
										value="g"
										primaryText={`${messages.settings_gram} (g)`}
									/>
									<MenuItem
										value="kg"
										primaryText={`${messages.settings_kilogram} (kg)`}
									/>
									<MenuItem
										value="lb"
										primaryText={`${messages.settings_pound} (lb)`}
									/>
									<MenuItem
										value="oz"
										primaryText={`${messages.settings_ounce} (oz)`}
									/>
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_lengthUnit}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="length_unit"
								>
									<MenuItem
										value="cm"
										primaryText={`${messages.settings_centimeter} (cm)`}
									/>
									<MenuItem
										value="in"
										primaryText={`${messages.settings_inch} (in)`}
									/>
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_defaultProductSorting}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="default_product_sorting"
									placeholder="-position,stock_status,price"
								/>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.productFields}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="product_fields"
									placeholder="id,path,name,price, ..."
								/>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.productsLimit}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="products_limit"
									type="number"
									placeholder="30"
								/>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_defaultShippingCountry}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									className="customSelector"
									component={SelectField}
									autoWidth
									fullWidth
									name="default_shipping_country"
								>
									{countryItems}
								</Field>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_defaultShippingState}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="default_shipping_state"
								/>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.settings_defaultShippingCity}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="default_shipping_city"
								/>
							</div>
						</div>

						<Divider className={style.divider} />
						<Field
							component={CustomToggle}
							name="hide_billing_address"
							label={messages.hideBillingAddress}
							style={{ paddingTop: 16, paddingBottom: 16 }}
						/>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.domain}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="domain"
									placeholder="https://domain.com"
								/>
							</div>
						</div>

						<Divider className={style.divider} />

						<div className="row between-xs middle-xs">
							<div className="col-xs-12 col-sm-6">
								<div className={style.txtlabel} style={{ fontWeight: '500' }}>
									{messages.orderEmailCopyTo}
								</div>
							</div>
							<div className="col-xs-12 col-sm-6">
								<Field
									component={TextField}
									fullWidth
									name="order_confirmation_copy_to"
								/>
							</div>
						</div>
						<Divider className={style.divider} />
					</div>
					<div className="buttons-box" style={{ paddingRight: '0' }}>
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
	form: 'GeneralSettingsForm',
	enableReinitialize: true
})(GeneralSettings);
