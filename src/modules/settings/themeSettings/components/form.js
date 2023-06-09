import React from 'react';
import { reduxForm } from 'redux-form';

import messages from 'lib/text';
import sortBy from 'lodash/sortBy';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DynamicEditControl from './dynamicEditControl';
import style from './style.css';

class ThemeSettings extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const {
			handleSubmit,
			pristine,
			submitting,
			initialValues,
			reset,
			settingsSchema
		} = this.props;
		if (initialValues && settingsSchema) {
			let lastSection = null;
			const sortedSettingsSchema = sortBy(settingsSchema, ['section', 'label']);

			const fields = sortedSettingsSchema.map((item, index) => {
				let sectionTitle = null;
				if (item.section !== lastSection) {
					lastSection = item.section;
					sectionTitle =
						item.section && item.section !== '' ? (
							<div className={style.sectionTitle}>{item.section}</div>
						) : null;
				}

				return (
					<div key={index} className="custom-fields">
						{sectionTitle}
						<DynamicEditControl
							type={item.type}
							fieldName={item.key}
							label={item.label}
							options={item.options}
							properties={item.properties}
						/>
					</div>
				);
			});

			return (
				<form
					onSubmit={handleSubmit}
					style={{
						display: 'initial',
						width: '100%'
					}}
				>
					<Paper className="paper-box" zDepth={1}>
						<div className={style.innerBox}>
							<div className={style.settingTitle}>{messages.themeSettings}</div>

							{fields}
						</div>
						<div className="buttons-box">
							<FlatButton
								label={messages.cancel}
								className={style.button2}
								onClick={reset}
								disabled={pristine || submitting}
							/>
							<RaisedButton
								type="submit"
								label={messages.save}
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
	form: 'ThemeSettingsForm',
	enableReinitialize: true
})(ThemeSettings);
