import { connect } from 'react-redux';
import {
	fetchPages,
	fetchPage,
	updatePage,
	createPage,
	receivePage,
	deletePage,
	closeModal,
	openModal
} from '../actions';
import Form from './components/form';

const mapStateToProps = state => ({
	pages: state.pages.pages,
	page: state.pages.pageEdit,
	pageId: state.pages.pageId,
	open: state.pages.open
});

const mapDispatchToProps = dispatch => ({
	onLoad: () => {
		dispatch(fetchPages());
	},
	onSubmit: page => {
		if (page.id) {
			dispatch(updatePage(page));
		} else {
			dispatch(createPage(page));
			dispatch(closeModal());
		}
	},
	onDelete: id => {
		dispatch(deletePage(id));
		dispatch(receivePage(null));
		dispatch(closeModal());
	},
	openModal: pageId => {
		dispatch(openModal(pageId));
		if (pageId) {
			dispatch(fetchPage(pageId));
		} else {
			dispatch(receivePage({ enabled: true }));
		}
	},
	closeModal: () => {
		dispatch(closeModal());
		dispatch(receivePage(null));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
