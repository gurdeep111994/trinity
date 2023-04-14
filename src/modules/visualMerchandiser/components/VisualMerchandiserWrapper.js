import React, { PureComponent } from 'react';
import Iframe from 'react-iframe';
import PropTypes from 'prop-types';

export default class VisualMerchandiserWrapper extends PureComponent {
	static get propTypes() {
		return {
			vmUrl: PropTypes.string.isRequired
		};
	}

	render() {
		const { vmUrl } = this.props;

		return (
			<Iframe
				url={vmUrl}
				id="vmIframe"
				className="vm-iframe"
				display="initial"
				frameBorder="0"
				// position="relative"
				allowFullScreen
			/>
		);
	}
}
