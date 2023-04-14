import React from 'react';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import messages from 'lib/text';

export default ({ onSelectAll, selected, items }) => {
	const checkboxClass =
		selected && selected.length > 0 === true && items.length === selected.length
			? 'activecheckbox'
			: '';
	return (
		<Subheader style={{ paddingRight: 16 }} className="proTableHead">
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
				<div className="col-xs-3">
					<span>{messages.customers_name}</span>
				</div>
				<div className="col-xs-3">
					<span>{messages.customers_location}</span>
				</div>
				<div className="col-xs-3">
					<span>{messages.customers_orders}</span>
				</div>
				<div
					className="col-xs-2"
					style={{ textAlign: 'right', paddingRight: '14px' }}
				>
					<span>{messages.customers_totalSpent}</span>
				</div>
			</div>
		</Subheader>
	);
};
