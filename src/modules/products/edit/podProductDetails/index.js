import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getEnv, minioUrl } from 'lib/settings';
import PodMetaData from './components/podProd';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
	data:
		state.products.editProduct && state.products.editProduct.PODmetadata
			? state.products.editProduct.PODmetadata
			: null,
	host: getEnv(minioUrl)
});

// eslint-disable-next-line no-unused-vars
const mapDispatchToProps = (dispatch, ownProps) => ({});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PodMetaData)
);
