import React from 'react';

import messages from 'lib/text';
import api from 'lib/api';
import ThemeSettings from 'modules/settings/themeSettings';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import style from './style.css';

const styles = {
	button: {
		margin: 12
	},
	exampleImageInput: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		width: '100%',
		opacity: 0
	}
};

export default class Theme extends React.Component {
	onExportClick() {
		this.props.exportRequest();
		api.theme.export().then(({ satus, json }) => {
			this.props.exportReceive();
			if (json.file) {
				window.location = json.file;
			} else {
				alert(`Error: ${JSON.stringify(json)}`);
			}
		});
	}

	onImportFileChoose(e) {
		this.props.installRequest();
		const file = e.target.files[0];
		const formData = new FormData();
		formData.append('file', file);

		api.theme.install(formData);
	}

	render() {
		const { exportInProcess, installInProcess } = this.props;

		return (
			<div>
				{/*<Paper className="paper-box" zDepth={1}>
					<div className={style.innerBox}>
						<div className="row between-xs middle-xs themeaction">
							<div className="col-xs-6">
								{messages.settings_themeExportDesciption}
							</div>
							<div className="col-xs-4" style={{ textAlign: 'right' }}>
								<RaisedButton
									label={
										exportInProcess
											? messages.settings_themeExporting
											: messages.settings_themeExport
									}
									disabled={exportInProcess || installInProcess}
									onClick={this.onExportClick.bind(this)}
									primary
								/>
							</div>
						</div>

						<div className="row between-xs middle-xs themeaction">
							<div className="col-xs-6">
								{messages.settings_themeInstallDesciption}
							</div>
							<div className="col-xs-4" style={{ textAlign: 'right' }}>
								<RaisedButton
									label={
										installInProcess
											? messages.settings_themeInstalling
											: messages.settings_themeInstall
									}
									disabled={installInProcess}
									labelPosition="before"
									containerElement="label"
									primary
								>
									<input
										type="file"
										onChange={this.onImportFileChoose.bind(this)}
										disabled={installInProcess}
										style={styles.exampleImageInput}
									/>
								</RaisedButton>
							</div>
						</div>
					</div>
				</Paper>*/}

				<ThemeSettings />
			</div>
		);
	}
}
