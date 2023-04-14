import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { fetchSettings } from 'modules/settings/actions';
import PageBuilder from 'modules/pageBuilder/page/components/pageBuilder';
import { fetchStoreIndexes } from '../actions';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
	settings: state.settings.settings,
	storeIndexes: state.pageBuilder.storeIndexes
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, ownProps) => ({
	onLoad: () => {
		dispatch(fetchSettings());
	},
	fetchStoreIndexes: () => {
		dispatch(fetchStoreIndexes());
	}
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PageBuilder)
);
