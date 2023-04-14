import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';

import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Button from '@material-ui/core/Button';
import style from './style.css';

const AttributesGrid = ({ fields, meta: { touched, error, submitFailed } }) => (
	<div>
		<div className="row row--no-gutter middle-xs attributes-head">
			<div className="col-xs-5 col--no-gutter">{messages.attributeName}</div>
			<div className="col-xs-7 col--no-gutter">{messages.attributeValue}</div>
		</div>

		{fields.map((field, index) => {
			const fieldName = `${field}.name`;
			const fieldValue = `${field}.value`;
			return (
				<div
					className="row row--no-gutter middle-xs attributes-values"
					key={index}
				>
					<div className="col-xs-5 col--no-gutter">
						<Field
							component="input"
							type="text"
							className={style.input2}
							name={fieldName}
							placeholder={messages.attributeName}
						/>
					</div>
					<div className="col-xs-6 col--no-gutter">
						<Field
							component="input"
							type="text"
							className={style.input3}
							name={fieldValue}
							placeholder={messages.attributeValue}
						/>
					</div>
					<div className="col-xs-1 col--no-gutter">
						<IconButton
							title={messages.actions_delete}
							onClick={() => fields.remove(index)}
							tabIndex={-1}
						>
							<img src={'/assets/images/redtrash.svg'} alt="" />
							{/* <FontIcon
								color="#FC5A5A"
								className="material-icons"
								data-index={index}
							>
								delete
							</FontIcon> */}
						</IconButton>
					</div>
				</div>
			);
		})}

		<div style={{ marginTop: 20 }}>
			<Button
				onClick={() => fields.push({})}
				variant="contained"
				className={style.btnCreate}
			>
				{messages.addAttribute}
			</Button>
		</div>
	</div>
);

const ProductAttributesForm = ({
	handleSubmit,
	pristine,
	reset,
	submitting,
	initialValues
}) => (
	<form onSubmit={handleSubmit}>
		<Paper className="paper-box" zDepth={0}>
			<div className={style.innerBox}>
				<div className="edit-product-section-title">{messages.attributes}</div>

				<div className="edit-product-attributes">
					<FieldArray name="attributes" component={AttributesGrid} />
				</div>
				<div
					className={`buttons-box ${
						pristine ? 'buttons-box-pristine' : 'buttons-box-show'
					}`}
				>
					<Button
						className={style.button}
						style={{ marginRight: 10 }}
						onClick={reset}
						disabled={pristine || submitting}
						variant="outlined"
					>
						{messages.cancel}
					</Button>
					<Button
						type="submit"
						className={style.button}
						disabled={pristine || submitting}
						variant="contained"
					>
						{messages.save}
					</Button>
				</div>
			</div>
		</Paper>
	</form>
);

export default reduxForm({
	form: 'ProductAttributesForm',
	enableReinitialize: true
})(ProductAttributesForm);
