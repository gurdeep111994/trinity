import React from 'react';
import { Link } from 'react-router-dom';
import Checkbox from 'material-ui/Checkbox';
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import messages from 'lib/text';
import * as helper from 'lib/helper';
import style from './style.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const CustomersListItem = ({ customer, onSelect, selected, settings }) => {
	const checked = selected.includes(customer.id);
	const totalSpentFormatted = helper.formatCurrency(
		customer.total_spent,
		settings
	);
	const checkboxClass = checked ? 'activecheckbox' : '';

	return (
		<div className={`customers-item${checked === true ? ' selected' : ''}`}>
			<ListItem
				innerDivStyle={{ padding: 0 }}
				style={{ cursor: 'normal' }}
				primaryText={
					<div className="row middle-xs">
						<div className="col-xs-1">
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										className={`${checkboxClass} customCheckbox`}
										checked={checked}
										onCheck={(event, isInputChecked) => {
											onSelect(customer.id, isInputChecked);
										}}
									/>
								}
								label=""
							/>
						</div>
						<div className="col-xs-3">
							<Link
								to={`/customer/${customer.id}`}
								className={style.customerName}
							>
								{customer.full_name}
								<br />
								<small>{customer.group_name}</small>
							</Link>
						</div>
						<div className={`col-xs-3 ${style.location}`}>
							{customer.shipping && customer.shipping.city && (
								<span>
									<FontIcon
										style={{
											color: 'rgba(0, 0, 0, 0.4)',
											fontSize: 16,
											marginRight: 6
										}}
										className="material-icons"
									>
										place
									</FontIcon>
									{customer.shipping.city}
								</span>
							)}
						</div>
						<div className="col-xs-3" style={{ textAlign: 'left' }}>
							{customer.orders_count || 0}
						</div>
						<div className="col-xs-2">
							<div className={style.price}>{totalSpentFormatted}</div>
						</div>
					</div>
				}
			/>
			{/* <Divider /> */}
		</div>
	);
};

export default CustomersListItem;
