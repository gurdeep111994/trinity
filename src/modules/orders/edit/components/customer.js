import React from 'react';
import { Link } from 'react-router-dom';

import messages from 'lib/text';
import * as helper from 'lib/helper';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import ShippingAddressForm from './shippingAddressForm.js';
import style from './style.css';

const getShippingFieldLabel = ({ label, key }) =>
	label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key);

const ShippingFields = ({ order, shippingMethod }) => {
	let rows = null;
	if (
		shippingMethod &&
		shippingMethod.fields &&
		shippingMethod.fields.length > 0
	) {
		rows = shippingMethod.fields.map((field, index) => {
			const fieldLabel = getShippingFieldLabel(field);
			const fieldValue = order.shipping_address[field.key];

			return (
				<ShippingFieldDiv key={index} label={fieldLabel} value={fieldValue} />
			);
		});
	}

	return <div>{rows}</div>;
};

const ShippingFieldDiv = ({ label, value }) => (
	<div>
		<label>{label}: </label>
		{value}
	</div>
);

const ShippingAddress = ({ order, settings }) => {
	const address = order.shipping_address;
	const shippingMethod = order.shipping_method_details;

	return (
		<div className={style.address} style={{ marginBottom: 20 }}>
			<ShippingFields order={order} shippingMethod={shippingMethod} />
			<div>
				<label>{messages.address}: </label>
				{`${address.address1 || ''},
        ${address.address2 || ''}`}
			</div>
			<div>
				<label>{messages.city}: </label>
				{address.city}
				{address.state && address.state.length > 0 ? `, ${address.state}` : ''}
				{address.postal_code && address.postal_code.length > 0
					? `, ${address.postal_code}`
					: ''}
			</div>
			<div>
				<label>{messages.country}: </label>
				{address.country}
			</div>
		</div>
	);
};

const BillingAddress = ({ address, settings }) => {
	const billinsAddressIsEmpty =
		address.address1 === '' &&
		address.address2 === '' &&
		address.city === '' &&
		address.company === '' &&
		address.country === '' &&
		address.full_name === '' &&
		address.phone === '' &&
		address.state === '' &&
		address.tax_number === '' &&
		address.postal_code === '';

	if (billinsAddressIsEmpty && settings.hide_billing_address) {
		return null;
	}
	if (billinsAddressIsEmpty && !settings.hide_billing_address) {
		return (
			<div>
				<hr className={style.hrow} />
				<div style={{ paddingBottom: 16, paddingTop: 0 }}>
					<span className={style.txtLabel}> {messages.billingAddress}</span>
				</div>
				<div className={style.address}>
					<label>{messages.sameAsShipping}</label>
				</div>
			</div>
		);
	}
	return (
		<div>
			<Divider
				style={{
					marginTop: 30,
					marginBottom: 30,
					marginLeft: -30,
					marginRight: -30
				}}
			/>
			<div style={{ paddingBottom: 16, paddingTop: 0 }}>
				{messages.billingAddress}
			</div>
			<div className={style.address}>
				<div>{address.full_name}</div>
				<div>{address.company}</div>
				<div>{address.address1}</div>
				<div>{address.address2}</div>
				<div>
					{address.city},{' '}
					{address.state && address.state.length > 0
						? `${address.state}, `
						: ''}
					{address.postal_code}
				</div>
				<div>{address.country}</div>
				<div>{address.phone}</div>
			</div>
		</div>
	);
};

export default class OrderCustomer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openShippingEdit: false
		};
	}

	showShippingEdit = () => {
		this.setState({ openShippingEdit: true });
	};

	hideShippingEdit = () => {
		this.setState({ openShippingEdit: false });
	};

	saveShippingEdit = address => {
		this.props.onShippingAddressUpdate(address);
		this.hideShippingEdit();
	};

	render() {
		const { order, settings } = this.props;

		const allowEdit = order.closed === false && order.cancelled === false;
		let mapAddress = `${order.shipping_address.address1} ${order.shipping_address.city} ${order.shipping_address.state} ${order.shipping_address.postal_code}`;
		mapAddress = mapAddress.replace(/ /g, '+');
		const mapUrl = `https://www.google.com/maps/place/${mapAddress}`;

		return (
			<div>
				<div className={style.subheading}>{messages.customer}</div>
				<Paper className="paper-box" zDepth={1}>
					<div className={style.innerBox}>
						<div className={style.address}>
							<div>
								<Link
									to={`/customer/${order.customer_id}`}
									className={style.link}
								>
									{order.customer && order.customer.full_name}
								</Link>
							</div>
							<div>
								<a href={`MailTo:${order.email}`} className={style.link}>
									{order.email}
								</a>
							</div>
							<div>{order.mobile}</div>
						</div>

						<hr className={style.hrow} />

						<div style={{ paddingBottom: 16, paddingTop: 0 }}>
							<span className={style.txtLabel}>
								{' '}
								{messages.shippingAddress}
							</span>
						</div>
						<ShippingAddress order={order} settings={settings} />

						{allowEdit && (
							<button
								className="btn-default"
								label={messages.edit}
								style={{ marginRight: 15, cursor: 'pointer' }}
								onClick={this.showShippingEdit}
							>
								Edit
							</button>
						)}
						<a href={mapUrl} target="_blank">
							<button
								className="btn-default"
								label="View map"
								style={{ cursor: 'pointer' }}
							>
								View Map
							</button>
						</a>

						<BillingAddress
							address={order.billing_address}
							settings={settings}
						/>

						<Dialog
							title={messages.shippingAddress}
							modal={false}
							className="customModal"
							open={this.state.openShippingEdit}
							onRequestClose={this.hideShippingEdit}
							autoScrollBodyContent
							contentStyle={{ width: 600 }}
						>
							<ShippingAddressForm
								initialValues={order.shipping_address}
								onCancel={this.hideShippingEdit}
								onSubmit={this.saveShippingEdit}
								shippingMethod={order.shipping_method_details}
							/>
						</Dialog>
					</div>
				</Paper>
			</div>
		);
	}
}
