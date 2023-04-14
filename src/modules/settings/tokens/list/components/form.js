import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import TokenListHead from 'modules/settings/tokens/list/head';

const TokenItem = ({ token }) => (
	<div className="storelistItem">
		<Link
			to={`/settings/tokens/${token.id}`}
			style={{ textDecoration: 'none' }}
		>
			<div
				className="row"
				style={{ margin: '0 15px', display: 'flex', width: '100%' }}
			>
				<div className="col-xs-5">{token.name}</div>
				<div className="col-xs-5" style={{ color: 'rgba(0, 0, 0, 0.4)' }}>
					{token.email}
				</div>
				<div className="col-xs-2">
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
);

export default class TokensList extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { tokens } = this.props;
		const listItems =
			tokens && Array.isArray(tokens)
				? tokens.map((token, index) => <TokenItem key={index} token={token} />)
				: null;

		return (
			<div>
				<TokenListHead />
				<div style={{ margin: 20, color: 'rgba(0, 0, 0, 0.52)' }}>
					{messages.settings_tokenHelp}
				</div>
				<Paper className="paper-box" zDepth={1}>
					<div style={{ width: '100%' }}>
						<List style={{ padding: 0 }}>{listItems}</List>
					</div>
				</Paper>
			</div>
		);
	}
}
