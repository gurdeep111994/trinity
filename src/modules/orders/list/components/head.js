import React from 'react';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import style from './style.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import messages from 'lib/text';

export default ({ onSelectAll, selected, items }) => {
	const checkboxClass =
		selected && selected.length > 0 === true && items.length === selected.length
			? 'activecheckbox'
			: '';
	return (
		<Subheader className="proTableHead">
			<div className="row middle-xs">
				<div className="col-xs-1">
					<FormControlLabel
						control={
							<Checkbox
								className={`${checkboxClass} customCheckbox`}
								color="#B5B5BE;"
								onCheck={(event, isInputChecked) => {
									onSelectAll(isInputChecked);
								}}
							/>
						}
						label=""
						className="customcheckboxlabel"
					/>
				</div>
				<div className="col-xs-1">
					<span>Paid</span>
				</div>
				<div className="col-xs-2">
					<span>{messages.order}</span>
				</div>
				<div className="col-xs-4">
					<span>{messages.orders_shippingTo}</span>
				</div>
				<div className="col-xs-2">
					<span>{messages.orders_total}</span>
				</div>
				<div
					className="col-xs-2"
					style={{ textAlign: 'right', paddingRight: '10px' }}
				>
					<span>{messages.orders_status}</span>
				</div>
			</div>
		</Subheader>
	);
};
