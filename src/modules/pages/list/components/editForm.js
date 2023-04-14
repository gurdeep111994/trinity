import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';

import { CustomToggle } from 'modules/shared/form';
import Editor from 'modules/shared/editor';
import TagsInput from 'react-tagsinput';
import messages from 'lib/text';
import api from 'lib/api';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style.css';

const TagsField = ({ input, placeholder }) => {
	const tagsArray =
		input.value && Array.isArray(input.value) ? input.value : [];
	return (
		<TagsInput
			value={tagsArray}
			inputProps={{ placeholder }}
			onChange={tags => {
				input.onChange(tags);
			}}
		/>
	);
};

const validate = values => {
	const errors = {};
	const requiredFields = ['slug', 'meta_title'];

	if (requiredFields.length > 0) {
		requiredFields.forEach(field => {
			if (!values.is_system && values && !values[field]) {
				errors[field] = messages.errors_required;
			}
		});
	}

	return errors;
};

const asyncValidate = (values /* , dispatch */) =>
	new Promise((resolve, reject) => {
		if (!values.slug && values.is_system) {
			resolve();
		} else {
			api.sitemap.retrieve({ path: values.slug }).then(({ status, json }) => {
				if (status === 404) {
					resolve();
				} else if (json && !Object.is(json.resource, values.id)) {
					reject({ slug: messages.errors_urlTaken });
				} else {
					resolve();
				}
			});
		}
	});

class EditPageForm extends React.Component {
	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			initialValues,
			pageId
		} = this.props;
		const isAdd = pageId === null || pageId === undefined;
		if (initialValues) {
			return (
				<form onSubmit={handleSubmit}>
					<Paper
						className="paper-box"
						zDepth={1}
						style={{ margin: 0, padding: 'initial' }}
					>
						<div>
							<Field
								name="meta_title"
								component={TextField}
								floatingLabelText={messages.pageTitle}
								fullWidth
							/>
							<br />
							<Field
								name="slug"
								component={TextField}
								floatingLabelText={messages.slug}
								fullWidth
								disabled
							/>
							<p className="field-hint">{messages.help_slug}</p>
							<Field
								name="meta_description"
								component={TextField}
								floatingLabelText={messages.metaDescription}
								fullWidth
								disabled
							/>
							{/* <div className="field-hint" style={{ marginTop: 40 }}> */}
							{/*	{messages.content} */}
							{/* </div> */}
							{/* <div style={{ marginBottom: 50 }} className={style.editDesc}> */}
							{/*	<Field name="content" component={Editor} /> */}
							{/* </div> */}
							<div className={style.editTag} style={{ marginTop: 20 }}>
								<p>{messages.tags}</p>
								<Field
									name="tags"
									component={TagsField}
									className={style.addTagbtn}
									placeholder={messages.newTag}
									variant="outlined"
								/>
								<div style={{ maxWidth: 256 }} className={style.editToggle}>
									<Field
										component={CustomToggle}
										name="enabled"
										label={messages.enabled}
										style={{ paddingTop: 16, paddingBottom: 16 }}
										disabled={initialValues.is_system}
									/>
								</div>
							</div>
						</div>
						<div
							className={`buttons-box ${
								pristine && !isAdd ? 'buttons-box-pristine' : 'buttons-box-show'
							}`}
							style={{ padding: '0 30px', justifyContent: 'flex-end' }}
						>
							<RaisedButton
								type="submit"
								label={isAdd ? messages.add : messages.save}
								primary
								className={style.button}
								disabled={pristine || submitting}
							/>
						</div>
					</Paper>
				</form>
			);
		}
		return null;
	}
}

export default reduxForm({
	form: 'EditPageForm',
	validate,
	asyncValidate,
	asyncBlurFields: ['slug'],
	enableReinitialize: true
})(EditPageForm);
