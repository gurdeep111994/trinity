import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from 'material-ui/Checkbox';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import messages from 'lib/text';
import * as helper from 'lib/helper';
import moment from 'moment';
import style from './style.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const getOrderStateIcons = order => {
	const icons = [];

	if (order.hold) {
		icons.push(
			<FontIcon
				key="hold"
				title={messages.orders_hold}
				style={{ color: 'rgba(0, 0, 0, 0.2)' }}
				className="material-icons"
			>
				pause_circle_outline
			</FontIcon>
		);
	}

	if (order.paid) {
		icons.push(
			<FontIcon
				key="paid"
				title={messages.orders_paid}
				style={{ color: 'rgba(251, 184, 41, 1)' }}
				className="material-icons"
			>
				monetization_on
			</FontIcon>
		);
	}

	if (order.delivered) {
		icons.push(
			<FontIcon
				key="delivered"
				title={messages.orders_delivered}
				style={{ color: 'rgba(127, 175, 27, 1)' }}
				className="material-icons"
			>
				local_shipping
			</FontIcon>
		);
	}

	if (order.cancelled) {
		return [
			<FontIcon
				key="cancelled"
				title={messages.orders_cancelled}
				style={{ color: 'rgba(0, 0, 0, 0.3)' }}
				className="material-icons"
			>
				not_interested
			</FontIcon>
		];
	}

	if (order.closed) {
		return [
			<FontIcon
				key="closed"
				title={messages.orders_closed}
				style={{ color: 'rgba(127, 175, 27, 1)' }}
				className="material-icons"
			>
				done
			</FontIcon>
		];
	}

	if (icons.length === 0 && order.draft) {
		icons.unshift(
			<FontIcon
				key="draft"
				title={messages.orders_draft}
				style={{ color: 'rgba(0, 0, 0, 0.1)' }}
				className="material-icons"
			>
				edit
			</FontIcon>
		);
	}

	return icons;
};

const OrdersListItem = ({ order, onSelect, selected, settings }) => {
	const checked = selected.includes(order.id);
	const grandTotalFormatted = helper.formatCurrency(
		order.grand_total,
		settings
	);

	const stateIcons = getOrderStateIcons(order);
	const dateCreated = moment(order.date_placed || order.date_created);
	const dateCreatedFromNow = dateCreated.format(`${settings.date_format}`);
	const shippingTo = order.shipping_address
		? order.shipping_address.full_name
		: '';
	const ordersItemClass = `products-item${
		selected === true ? ' selected' : ''
	}`;
	const checkboxClass = checked === true ? 'activecheckbox' : '';
	return (
		<div
			className={`${ordersItemClass} ${style.minHeight30}`}
			style={{ paddingLeft: '14px' }}
		>
			<div className="row  middle-xs">
				<div className="col-xs-1">
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								className={`${checkboxClass} customCheckbox`}
								//onChange={onSelect}
								checked={checked}
								value={order.id}
								onCheck={(event, isInputChecked) => {
									onSelect(order.id, isInputChecked);
								}}
							/>
						}
						label=""
					/>
				</div>
				<div className="col-xs-1">{stateIcons}</div>
				<div className="col-xs-2">
					<Link to={`/order/${order.id}`} className={style.number}>
						{order.number || 0}
					</Link>
					<br />
					<small className={style.small}>{dateCreatedFromNow}</small>
				</div>
				<div className="col-xs-4">
					<div className={style.shipping}>{shippingTo}</div>
					<small className={style.small}>{order.shipping_method}</small>
				</div>
				<div className={`col-xs-2 ${style.price}`} style={{ padding: '0' }}>
					{grandTotalFormatted}
					<br />
					<small className={style.small}>{order.payment_method}</small>
				</div>
				<div className={`col-xs-2 ${style.status}`}>{order.status}</div>
			</div>
		</div>
	);
};

export default OrdersListItem;
