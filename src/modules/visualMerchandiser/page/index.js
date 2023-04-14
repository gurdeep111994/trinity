import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getEnv, visualMerchandiserUrl } from 'lib/settings';
import { fetchSettings } from 'modules/settings/actions';
import VisualMerchandiserPage from './components/VisualMerchandiserPage';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
	settings: state.settings.settings,
	visualMerchandiserUrl: getEnv(visualMerchandiserUrl)
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, ownProps) => ({
	onLoad: () => {
		dispatch(fetchSettings());
	}
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(VisualMerchandiserPage)
);
