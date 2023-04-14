import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

export default class ImportSettings extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { importSettings } = this.props;

		return (
			<div>
				<Paper className="paper-box" zDepth={1}>
					<div className="storelistItem">
						<List style={{ padding: 0 }}>
							<Link
								to="/settings/import/googlespreadsheet"
								style={{ textDecoration: 'none' }}
							>
								<div
									className="row"
									style={{ margin: '0 15px', display: 'flex', width: '100%' }}
								>
									<div className="col-xs-6">
										{messages.settings_spreadsheet}
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
						</List>
					</div>
				</Paper>
			</div>
		);
	}
}
