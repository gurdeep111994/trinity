import { connect } from 'react-redux';
import { change } from 'redux-form';
import {
	updateCategory,
	deselectCategory,
	fetchCategories,
	deleteImage,
	uploadImage
} from '../actions';
import ProductCategoryEditForm from './components/form';

const mapStateToProps = state => ({
	uploadingImage: state.productCategories.uploadingImage,
	categoryId: state.productCategories.selectedId,
	items: state.productCategories.items,
	initialValues: state.productCategories.items.find(
		item => item.id === state.productCategories.selectedId
	),
	isSaving: state.productCategories.isSaving
});

const mapDispatchToProps = dispatch => ({
	onImageDelete: () => {
		dispatch(deleteImage());
	},
	onImageUpload: form => {
		dispatch(uploadImage(form));
	},
	onSubmit: values => {
		delete values.image;
		if (!values.slug || values.slug === '') {
			values.slug = values.name;
		}
		dispatch(updateCategory(values));
	},
	changeSlug: (formName, field, value) => {
		dispatch(change(formName, field, value));
	}
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductCategoryEditForm);
