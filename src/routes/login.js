import React from 'react';
import messages from 'lib/text';
import TrinityClient from '@ivfuture/trinity-api-client';
import { apiBaseUrl, getEnv } from 'lib/settings';
import * as auth from 'lib/auth';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PasswordField from 'material-ui-password-field';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router';
import { withKeycloak } from 'react-keycloak';

class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email: localStorage.getItem('dashboard_email') || '',
			password: '',
			isFetching: false,
			isAuthorized: false,
			emailIsSent: false,
			error: null
		};
	}

	handleChange = event => {
		const { value, name } = event.target;
		let state = this.state;
		state[name] = value;
		this.setState(state);
	};

	handleKeyPress = e => {
		if (e.keyCode === 13 || e.which === 13) {
			this.handleSubmit();
		}
	};

	handleSubmit = () => {
		this.setState({
			isFetching: true,
			isAuthorized: false,
			emailIsSent: false,
			error: null
		});
		//this.authorizeTrinity();
	};
	localAuthorize = () => {
		const { email, password } = this.state;
		if (email === password && email === 'admin') {
			this.setState({
				isFetching: false,
				isAuthorized: true
			});
			this.props.history.push('/');
		} else {
			this.setState({
				isFetching: false,
				isAuthorized: false
			});
		}
	};
	authorizeTrinity = () => {
		TrinityClient.authorize(getEnv(apiBaseUrl), this.state.email)
			.then(authorizeResponse => {
				this.setState({
					isFetching: false,
					isAuthorized: false,
					emailIsSent: authorizeResponse.json.sent,
					error: authorizeResponse.json.error
				});
			})
			.catch(error => {
				this.setState({
					isFetching: false,
					isAuthorized: false,
					emailIsSent: false,
					error
				});
			});
	};

	// componentWillMount() {
	//auth.checkTokenFromUrl();
	// }

	componentDidMount() {
		if (this.props.keycloak.authenticated) {
			this.props.history.push('/mytrinity');
		} else {
			this.props.keycloak.login();
		}
		//document.body.classList.add('loginbody');
	}

	// componentWillUnmount() {
	// 	document.body.classList.remove('loginbody');
	// }

	render() {
		const {
			email,
			isFetching,
			isAuthorized,
			emailIsSent,
			error,
			password
		} = this.state;

		let response = null;
		if (isFetching) {
			response = (
				<div className="loginSuccessResponse">{messages.messages_loading}</div>
			);
		} else if (emailIsSent) {
			response = (
				<div className="loginSuccessResponse">{messages.loginLinkSent}</div>
			);
		} else if (emailIsSent === false && error) {
			response = <div className="loginErrorResponse">{error}</div>;
		}

		return (
			<div className="loginBox">
				<div
					className="row"
					style={{ width: '100%', justifyContent: 'center' }}
				>
					<div className="col-xs-12 col-sm-8 col-md-5 col-lg-4 ">
						<div className="login-card">
							<div className="loginhead">
								<img
									src="/assets/images/trinitylogo.png"
									className="brandimg"
								/>
								<p>
									Just sign in if you have an account in here. Enjoy our Website
								</p>
							</div>
							<div className="logincardbody">
								{/* <div className="loginTitle">{messages.loginTitle}</div>
								<div className="loginDescription">{messages.loginDescription}</div> */}
								<div className="loginInput">
									<TextField
										name="email"
										className="form-control"
										type="email"
										value={email}
										onChange={this.handleChange}
										onKeyPress={this.handleKeyPress}
										label="Username"
										fullWidth
										hintStyle={{ width: '100%' }}
										hintText="Username"
									/>
								</div>
								<div className="loginInput">
									<PasswordField
										name="password"
										className="form-control pwdfield"
										onChange={this.handleChange}
										onKeyPress={this.handleKeyPress}
										hintText="At least 8 characters"
										floatingLabelText="Enter your password"
										placeholder="Password"
									/>
								</div>
								<div className="col-xs-12">
									<div className="row">
										<div className="col-xs-6">
											<FormControl component="fieldset">
												<FormControlLabel
													control={<Checkbox />}
													label="Remember Me"
												/>
											</FormControl>
										</div>
										<div className="col-xs-6" style={{ alignSelf: 'center' }}>
											<a href="#" className="forgetLink">
												Forgot Password
											</a>
										</div>
									</div>
								</div>
								<RaisedButton
									className="submit-btn"
									label="Login"
									primary
									disabled={isFetching || emailIsSent}
									onClick={this.handleSubmit}
								/>
								{response}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withKeycloak(withRouter(LoginForm));
