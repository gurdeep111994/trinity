import React from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { TextField, SelectField } from 'redux-form-material-ui';
import { CustomToggle } from 'modules/shared/form';

import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import Button from '@material-ui/core/Button';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Grid from '@material-ui/core/Grid';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Typography } from '@material-ui/core';

import style from './style.css';
import OptionValues from './values';

const validate = values => {
	const errors = {};
	const requiredFields = ['name'];

	if (requiredFields.length > 0) {
		requiredFields.forEach(field => {
			if (values && !values[field]) {
				errors[field] = messages.errors_required;
			}
		});
	}

	return errors;
};

class ProductOptionForm extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchData();
	}

	render() {
		const {
			handleSubmit,
			pristine,
			reset,
			submitting,
			initialValues,
			deleteOption,
			optionValues,
			createOptionValue,
			updateOptionValue,
			deleteOptionValue,
			match
		} = this.props;

		return (
			<div>
				<form onSubmit={handleSubmit}>
					<Paper className="paper-box" zDepth={0}>
						<Grid container>
							<Grid item xs={4}>
								<Link to={`/product/${match.params.productId}`}>
									<IconButton>
										<FontIcon className="material-icons" color="#92929D">
											keyboard_arrow_left
										</FontIcon>
									</IconButton>
								</Link>
								<span className={style.backArrowText}>Edit Product</span>
							</Grid>

							<Grid item xs={4} className={style.alignCenter}>
								<Typography variant="h5" gutterBottom className="mainHeading">
									Edit Option
								</Typography>
							</Grid>
						</Grid>

						<div className={style.innerBox}>
							<Field
								name="name"
								component={TextField}
								floatingLabelText={messages.optionName}
								fullWidth
							/>
							<div className="row">
								<div className="col-xs-6">
									<Field
										name="position"
										component={TextField}
										type="number"
										floatingLabelText={messages.position}
										fullWidth
									/>
								</div>
								<div className="col-xs-6">
									<Field
										component={SelectField}
										autoWidth
										fullWidth
										name="control"
										floatingLabelText={messages.optionControl}
									>
										<MenuItem
											value="select"
											primaryText={messages.optionControlSelect}
										/>
									</Field>
								</div>
							</div>
							<div className={style.shortControl}>
								<Field
									name="required"
									component={CustomToggle}
									label={messages.settings_fieldRequired}
								/>
							</div>
							<div className="buttons-box">
								<Button onClick={deleteOption} variant="outlined">
									{messages.actions_delete}
								</Button>
								<Button
									style={{ marginLeft: 12 }}
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
									style={{ marginLeft: '10px' }}
								>
									{messages.save}
								</Button>
							</div>
						</div>
					</Paper>
				</form>
				<OptionValues
					optionValues={optionValues}
					createOptionValue={createOptionValue}
					updateOptionValue={updateOptionValue}
					deleteOptionValue={deleteOptionValue}
				/>
			</div>
		);
	}
}

export default reduxForm({
	form: 'ProductOptionForm',
	validate,
	enableReinitialize: true
})(ProductOptionForm);
