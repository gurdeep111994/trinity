import React from 'react';
import PropTypes from 'prop-types';
import VisualMerchandiserWrapper from '../../components/VisualMerchandiserWrapper';

export default class VisualMerchandiserPage extends React.Component {
	static get propTypes() {
		return {
			onLoad: PropTypes.func.isRequired,
			// eslint-disable-next-line react/forbid-prop-types
			settings: PropTypes.object.isRequired,
			visualMerchandiserUrl: PropTypes.string.isRequired
		};
	}

	componentDidMount() {
		const { onLoad } = this.props;
		onLoad();
	}

	render() {
		const { visualMerchandiserUrl, settings } = this.props;
		const { algoliaIndex } = settings;
		const store = algoliaIndex ? algoliaIndex.toLowerCase() : 'rare';
		const vmUrl = `${visualMerchandiserUrl}/#/store/${store}`;

		return <VisualMerchandiserWrapper vmUrl={vmUrl} />;
	}
}
