import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
	assetManagerApiUrl,
	getEnv,
	minioUrl,
	productDesignerApiUrl
} from 'lib/settings';
import { createPodProduct, getProductTypes } from '../actions';
import ProductDesignerPage from './components/ProductDesignerPage';

// eslint-disable-next-line no-unused-vars
const mapStateToProps = (state, ownProps) => ({
	productTypes: state.productDesigner.productTypesList,
	productDesignerService: getEnv(productDesignerApiUrl),
	assetManagerService: getEnv(assetManagerApiUrl),
	externalAssetsHost: getEnv(minioUrl)
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	loadProductTypes: () => {
		dispatch(getProductTypes());
	},
	onCreate: podProductData => {
		dispatch(createPodProduct(podProductData, ownProps.history));
	}
});

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ProductDesignerPage)
);
