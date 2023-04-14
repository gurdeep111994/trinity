import { connect } from 'react-redux';
import { fetchSettings, deleteBrandImage, uploadBrandImage } from '../actions';
import Form from './components/form';

const mapStateToProps = state => ({
	settings: state.settings.settings
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => {
		dispatch(fetchSettings());
	},
	onImageDelete: () => {
		dispatch(deleteBrandImage());
	},
	onImageUpload: form => {
		dispatch(uploadBrandImage(form));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
