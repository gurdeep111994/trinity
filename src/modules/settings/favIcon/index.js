import { connect } from 'react-redux';
import { fetchSettings, deleteFavIcon, uploadFavIcon } from '../actions';
import Form from './components/form';

const mapStateToProps = state => ({
	settings: state.settings.settings
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => {
		dispatch(fetchSettings());
	},
	onImageDelete: () => {
		dispatch(deleteFavIcon());
	},
	onImageUpload: form => {
		dispatch(uploadFavIcon(form));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
