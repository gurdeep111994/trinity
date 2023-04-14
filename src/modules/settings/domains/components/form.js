import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import ShippingMethodListHead from 'modules/settings/shipping/head';
import messages from 'lib/text';
import style from 'modules/products/edit/inventory/components/style.css';
import { TextField } from 'redux-form-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class DomainsSettings extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoaded: false,
			domain: '',
			status: true,
			msg: '',
			activeRequest: '',
			loading: false,
			lastRequest: ''
		};
	}

	componentWillMount() {}

	componentDidMount() {
		this.props.onLoad();

		//fetch any pending request
		fetch(
			`${this.props.initialValues.voxelUrl}/domainRequest/active?instance_id=${this.props.initialValues.instanceId}`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		)
			.then(res => res.json())
			.then(
				result => {
					if (result.status)
						this.setState({
							activeRequest: result.data
						});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				error => {
					this.setState({
						activeRequest: ''
					});
				}
			);

		//fetch all requests and list the last accepted/reject one
		fetch(
			`${this.props.initialValues.voxelUrl}/domainRequest/?instance_id=${this.props.initialValues.instanceId}`,
			{
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		)
			.then(res => res.json())
			.then(
				result => {
					result.data &&
						result.data.some(res => {
							if (res.status > 0) {
								this.setState({ lastRequest: res });
								return true;
							}
						});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				error => {
					this.setState({
						lastRequest: ''
					});
				}
			);
	}

	verifyDomain() {
		this.setState({
			isLoaded: true,
			status: false,
			msg: '',
			loading: true
		});

		console.log('testing ', this.state.domain);

		if (
			/^(([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]|[a-zA-Z0-9])\.)*[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/.test(
				this.state.domain
			)
		) {
			fetch(`${this.props.initialValues.voxelUrl}/domainRequest`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					instance_id: this.props.initialValues.instanceId,
					new_domain: this.state.domain
				})
			})
				.then(res => res.json())
				.then(
					result => {
						this.setState({
							isLoaded: true,
							status: result.status,
							msg: result.status ? result.data : 'Something went wrong!',
							loading: false,
							activeRequest: result.status ? 'data' : ''
						});
					},
					// Note: it's important to handle errors here
					// instead of a catch() block so that we don't swallow
					// exceptions from actual bugs in components.
					error => {
						this.setState({
							isLoaded: true,
							status: false,
							msg: error,
							loading: false
						});
					}
				);
		} else {
			this.setState({
				isLoaded: true,
				status: false,
				msg: 'Invalid domain name!',
				loading: false
			});
		}
	}

	render() {
		const formStyles = {
			paper: {
				padding: '0px',
				margin: '0px'
			},
			header: {
				padding: '0px'
			},
			leftText: {
				alignSelf: 'flex-end',
				marginBottom: '10px',
				marginLeft: '0px',
				textAlign: 'left',
				letterSpacing: '0.1px',
				color: '#44444F',
				fontSize: '14px',
				fontFamily: 'Roboto, serif'
			},
			normalText: {
				textAlign: 'left',
				letterSpacing: '0.1px',
				color: '#44444F',
				fontSize: '14px',
				fontFamily: 'Roboto, serif'
			},
			divider: {
				marginBottom: '15px',
				marginTop: '15px',
				backgroundColor: '#F1F1F5'
			},
			button: {
				cursor: 'pointer'
			},
			pendingButton: {
				backgroundColor: '#FC5A5A',
				color: '#fff'
			},
			rejectedRequest: {
				background: 'rgb(252, 90, 90,0.4)',
				padding: '5px',
				borderRadius: '10px',
				margin: '10px',
				width: '100%',
				textAlign: 'center',
				fontSize: '14px'
			},
			acceptedRequest: {
				background: 'rgb(0, 190, 163,0.4)',
				padding: '5px',
				borderRadius: '10px',
				margin: '10px',
				width: '100%',
				textAlign: 'center',
				fontSize: '14px'
			},
			connectDescription: {
				textAlign: 'left',
				fontFamily: 'Roboto, serif',
				letterSpacing: '0.1px',
				color: '#44444F',
				opacity: 1,
				fontSize: '14px',
				margin: '40px 5px 15px 5px'
			},
			serviceHeader: {
				textAlign: 'left',
				letterSpacing: '1px',
				color: '#92929D',
				textTransform: 'uppercase',
				opacity: 1,
				margin: '10px',
				fontSize: '14px'
			},
			providerUrl: {
				textAlign: 'left',
				letterSpacing: '0.1px',
				color: '#20C3A6',
				fontSize: '14px',
				opacity: 1,
				padding: '5px',
				textDecoration: 'none',
				fontFamily: 'Roboto, serif'
			}
		};

		console.log(this.state.msg);

		return (
			<Paper className="paper-box" style={{ ...formStyles.paper }} zDepth={0}>
				<div style={{ ...formStyles.header }} className={style.innerBox}>
					<div
						style={{ ...formStyles.header }}
						className="edit-product-section-title"
					>
						Connect your Domain
					</div>
				</div>

				<form noValidate autoComplete="off">
					<div className="row">
						<div className="col-md-6" style={{ ...formStyles.leftText }}>
							New Domain
						</div>
						<div className="col-md-6">
							<TextField
								name="domain"
								onChange={e => this.setState({ domain: e.target.value })}
								floatingLabelText={'Domain'}
								fullWidth
								value={this.state.domain}
							/>
						</div>
					</div>

					<Divider style={{ ...formStyles.divider }} />

					<div className="row">
						<div className="col-md-6" style={{ ...formStyles.normalText }}>
							CNAME (www)
						</div>
						<div className="col-md-6" style={{ ...formStyles.normalText }}>
							{this.props.initialValues.voxelCName}
						</div>
					</div>
				</form>

				<Divider style={{ ...formStyles.divider }} />

				<div className="row">
					<div className="col-md-6">
						{this.state.activeRequest ? (
							<button
								className="btn-default btn"
								style={{ ...formStyles.pendingButton }}
							>
								Pending Request
							</button>
						) : this.state.loading ? (
							<CircularProgress />
						) : (
							<button
								className="btn-default"
								style={{ ...formStyles.button }}
								onClick={this.verifyDomain.bind(this)}
							>
								Verify Connection
							</button>
						)}
					</div>
					<div className="col-md-6">
						{this.state.msg && (
							<span style={{ color: this.state.status ? 'green' : 'red' }}>
								{this.state.msg}
							</span>
						)}
					</div>
				</div>

				<div className="row">
					{!this.state.activeRequest &&
					this.state.lastRequest &&
					this.state.lastRequest.status === 1 ? (
						<div style={{ ...formStyles.acceptedRequest }}>
							The previous domain change request for{' '}
							<i>{this.state.lastRequest.new_domain}</i> has been accepted!
						</div>
					) : (
						this.state.lastRequest.status === 2 && (
							<div style={{ ...formStyles.rejectedRequest }}>
								The previous domain change request for{' '}
								<i>{this.state.lastRequest.new_domain}</i> has been rejected for
								the following reason:{' '}
								<i>{this.state.lastRequest.reject_reason}</i>
							</div>
						)
					)}
				</div>

				<div className="row" style={{ ...formStyles.connectDescription }}>
					To connect your domain, you need to login into your provider account
					and change your settings.
					<br />
					Follow the provider step-by-step instructions to get started.
				</div>

				<Divider style={{ ...formStyles.divider }} />

				<div className="row">
					<h3 style={{ ...formStyles.serviceHeader }}>SERVICE PROVIDERS</h3>
					<div className="col-md-12">
						<a
							style={{ ...formStyles.providerUrl }}
							href="https://uk.godaddy.com/help/add-a-cname-record-19236"
							rel="nofollow"
							target="_blank"
						>
							GoDaddy
						</a>
					</div>
					<div className="col-md-12">
						<a
							style={{ ...formStyles.providerUrl }}
							href="https://my.bluehost.com/cgi/help/559#add"
							rel="nofollow"
							target="_blank"
						>
							Bluehost
						</a>
					</div>
					<div className="col-md-12">
						<a
							style={{ ...formStyles.providerUrl }}
							href="https://www.hostgator.com/help/article/changing-mx-a-cname-records-plesk-11"
							rel="nofollow"
							target="_blank"
						>
							Hostgator
						</a>
					</div>
				</div>
			</Paper>
		);
	}
}
