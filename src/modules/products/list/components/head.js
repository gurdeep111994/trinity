import React from 'react';
import Subheader from 'material-ui/Subheader';
import messages from 'lib/text';
import style from './style.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from 'material-ui/Checkbox';

const Head = ({ onSelectAll, selected, items }) => {
	const checkboxClass =
		selected.length > 0 === true && items.length === selected.length
			? 'activecheckbox'
			: '';
	return (
		<Subheader className="proTableHead">
			<div className="row row--no-gutter middle-xs">
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
				<div className="col-xs-6 col--no-gutter">
					<span className={style.ml4}>{messages.products_name}</span>
				</div>

				<div className="col-xs-1 col--no-gutter">
					<span>{messages.products_visible}</span>
				</div>
				<div className="col-xs-2 col--no-gutter">
					<span>{messages.products_status}</span>
				</div>
				<div className="col-xs-1 col--no-gutter">
					<span>{messages.products_price}</span>
				</div>
				<div className="col-xs-1 col--no-gutter"></div>
			</div>
		</Subheader>
	);
};
export default Head;
