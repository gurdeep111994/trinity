import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';

export default class EmailSettings extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { emailSettings } = this.props;
		const smtpHint =
			emailSettings && emailSettings.host && emailSettings.host.length > 0
				? emailSettings.host
				: 'none';

		return (
			<div>
				<Paper className="paper-box" zDepth={1}>
					<div className="storelistItem">
						<List style={{ padding: 0 }}>
							<Link
								to="/settings/email/smtp"
								style={{ textDecoration: 'none' }}
							>
								<div
									className="row"
									style={{ margin: '0 15px', display: 'flex', width: '100%' }}
								>
									<div className="col-xs-5">
										{messages.settings_smtpSettings}
									</div>
									<div
										className="col-xs-5"
										style={{ color: 'rgba(0, 0, 0, 0.4)' }}
									>
										{smtpHint}
									</div>
									<div
										className="col-xs-2"
										style={{ color: 'rgba(0, 0, 0, 0.4)' }}
									>
										<ListItem
											className="emaillist"
											rightIcon={
												<FontIcon className="material-icons storelistIcon">
													keyboard_arrow_right
												</FontIcon>
											}
										/>
									</div>
								</div>
							</Link>
						</List>
					</div>
				</Paper>
				<div
					style={{ margin: 20, color: 'rgba(0, 0, 0, 0.52)' }}
					className="settingTitle"
				>
					{messages.settings_emailTemplates}
				</div>
				<Paper className="paper-box" zDepth={1}>
					<div>
						<List style={{ padding: 0 }}>
							<div className="storelistItem">
								<Link
									to="/settings/email/templates/order_confirmation"
									style={{ textDecoration: 'none' }}
								>
									<div
										className="row"
										style={{ margin: '0 15px', display: 'flex', width: '100%' }}
									>
										<div className="col-xs-6">
											{messages.settings_orderConfirmation}
										</div>
										<div className="col-xs-6">
											<ListItem
												className="emaillist"
												rightIcon={
													<FontIcon className="material-icons storelistIcon">
														keyboard_arrow_right
													</FontIcon>
												}
											/>
										</div>
									</div>
								</Link>
							</div>
							<div className="storelistItem">
								<Link
									to="/settings/email/templates/register_doi_en"
									style={{ textDecoration: 'none' }}
								>
									<div
										className="row"
										style={{ margin: '0 15px', display: 'flex', width: '100%' }}
									>
										<div className="col-xs-6">
											{messages.settings_customerRegistration}
										</div>
										<div className="col-xs-6">
											<ListItem
												className="emaillist"
												rightIcon={
													<FontIcon className="material-icons storelistIcon">
														keyboard_arrow_right
													</FontIcon>
												}
											/>
										</div>
									</div>
								</Link>
							</div>
							{/* <Link
								to="/settings/email/templates/register_doi_de"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRegistration}
								/>
							</Link>
							<Link
								to="/settings/email/templates/register_doi_ru"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRegistration}
								/>
							</Link> */}
							<div className="storelistItem">
								<Link
									to="/settings/email/templates/forgot_password_en"
									style={{ textDecoration: 'none' }}
								>
									<div
										className="row"
										style={{ margin: '0 15px', display: 'flex', width: '100%' }}
									>
										<div className="col-xs-6">
											{messages.settings_customerRecovery}
										</div>
										<div className="col-xs-6">
											<ListItem
												className="emaillist"
												rightIcon={
													<FontIcon className="material-icons storelistIcon">
														keyboard_arrow_right
													</FontIcon>
												}
											/>
										</div>
									</div>
								</Link>
							</div>
							{/* <Link
								to="/settings/email/templates/forgot_password_de"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRecovery}
								/>
							</Link>
							<Link
								to="/settings/email/templates/forgot_password_ru"
								style={{ textDecoration: 'none' }}
							>
								<ListItem
									rightIcon={
										<FontIcon className="material-icons">
											keyboard_arrow_right
										</FontIcon>
									}
									primaryText={messages.settings_customerRecovery}
								/>
							</Link> */}
						</List>
					</div>
				</Paper>
			</div>
		);
	}
}
