import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

const Buttons = () => (
	<div className="storehead">
		<span className="addnew">
			<Link to="/settings/payments/add">
				<IconButton
					touch
					tooltipPosition="bottom-left"
					tooltip={messages.settings_addPaymentMethod}
				>
					<FontIcon color="#92929D" className="material-icons">
						add
					</FontIcon>
				</IconButton>
			</Link>
		</span>
	</div>
);

export default Buttons;
