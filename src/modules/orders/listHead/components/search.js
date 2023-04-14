import React from 'react';
import messages from 'lib/text';
import TextField from 'material-ui/TextField';

export default ({ value, setSearch }) => (
	<TextField
		className="searchField"
		value={value}
		onChange={(e, v) => {
			setSearch(v);
		}}
		hintText={messages.orders_search}
		underlineShow={false}
		hintStyle={{
			color: '#92929D',
			textIndent: '16px',
			fontSize: '14px',
			fontFamily: 'Poppins, sans-serif',
			fontWeight: 400,
			bottom: '8px'
		}}
		inputStyle={{
			color: '#44444F',
			backgroundColor: 'rgba(255,255,255,0.2)',
			borderRadius: '10px',
			textIndent: '16px',
			border: '1px solid #E2E2EA',
			height: '38px',
			fontSize: '14px',
			fontFamily: 'Poppins, sans-serif',
			fontWeight: 400,
			marginTop: '6px'
		}}
	/>
);
