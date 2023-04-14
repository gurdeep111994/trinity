import { connect } from 'react-redux';
import Sitemap from 'modules/sitemap/page/components/sitemap';
import { fetchSitemap } from '../actions';

const mapStateToProps = state => ({
	sitemap: state.sitemap.sitemap
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => {
		dispatch(fetchSitemap());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Sitemap);
