import React from 'react';
import { Link } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import ShippingMethodListHead from 'modules/settings/shipping/head';

const MethodItem = ({ method }) => (
	<div className="storelistItem">
		<Link
			to={`/settings/shipping/${method.id}`}
			style={{ textDecoration: 'none' }}
		>
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
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { shippingMethods } = this.props;
		const methods = shippingMethods.map((method, index) => (
			<MethodItem key={index} method={method} />
		));

		return (
			<Paper className="paper-box" zDepth={1}>
				<ShippingMethodListHead />
				<div style={{ width: '100%' }}>
					<List style={{ padding: 0 }}>{methods}</List>
				</div>
			</Paper>
		);
	}
}
