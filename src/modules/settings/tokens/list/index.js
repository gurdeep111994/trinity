import { connect } from 'react-redux';
import { fetchTokens } from '../../actions';
import Form from './components/form';

const mapStateToProps = state => ({
	tokens: state.settings.tokens
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => {
		dispatch(fetchTokens());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
