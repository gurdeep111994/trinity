import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import PaymentMethodListHead from 'modules/settings/payments/head';

const MethodItem = ({ method }) => (
	<div className="storelistItem">
		<Link
			to={`/settings/payments/${method.id}`}
			style={{ textDecoration: 'none' }}
		>
			{/* <ListItem
				rightIcon={
					<FontIcon className="material-icons">keyboard_arrow_right</FontIcon>
				}
				style={!method.enabled ? { color: 'rgba(0, 0, 0, 0.3)' } : {}}
				primaryText={
					<div className="row">
						<div className="col-xs-6">{method.name}</div>
						<div className="col-xs-6" style={{ color: 'rgba(0, 0, 0, 0.4)' }}>
							{method.description}
						</div>
					</div>
				}
			/> */}
			<div
				className="row"
				style={{ margin: '0 15px', display: 'flex', width: '100%' }}
			>
				<div className="col-xs-5">{method.name}</div>
				<div className="col-xs-5" style={{ color: 'rgba(0, 0, 0, 0.4)' }}>
					{method.description}
				</div>
				<div className="col-xs-2">
					<ListItem
						className="arrowArea"
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
);

export default class EmailSettings extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { paymentMethods } = this.props;
		const methods = paymentMethods.map((method, index) => (
			<MethodItem key={index} method={method} />
		));

		return (
			<Paper className="paper-box" zDepth={1}>
				<PaymentMethodListHead />
				<div style={{ width: '100%' }}>
					<List style={{ padding: 0 }}>{methods}</List>
				</div>
			</Paper>
		);
	}
}
