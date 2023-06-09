import { connect } from 'react-redux';
import { reset } from 'redux-form';
import {
	updateGroup,
	createGroup,
	deselectGroup,
	deleteGroup
} from '../actions';
import Form from './components/form';

const mapStateToProps = state => ({
	groupId: state.customerGroups.selectedId,
	items: state.customerGroups.items,
	initialValues: state.customerGroups.items.find(
		item => item.id === state.customerGroups.selectedId
	),
	isSaving: state.customerGroups.isSaving
});

const mapDispatchToProps = dispatch => ({
	onSubmit: values => {
		if (values.id) {
			dispatch(updateGroup(values));
		} else {
			dispatch(createGroup(values));
		}
	},
	onCancel: () => {
		dispatch(deselectGroup());
		dispatch(reset('FormCustomerGroup'));
	},
	onDelete: id => {
		dispatch(deleteGroup(id));
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
