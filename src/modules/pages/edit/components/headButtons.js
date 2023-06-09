import React from 'react';
import { Link } from 'react-router-dom';
import messages from 'lib/text';
import DeleteConfirmation from 'modules/shared/deleteConfirmation';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
const { Fragment } = React;

export default class Buttons extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openDelete: false
		};
	}

	openDelete = () => {
		this.setState({ openDelete: true });
	};

	closeDelete = () => {
		this.setState({ openDelete: false });
	};

	deletePage = () => {
		this.setState({ openDelete: false });
		this.props.onDelete(this.props.page.id);
	};

	render() {
		const { page } = this.props;
		const pageName =
			page && page.meta_title && page.meta_title.length > 0
				? page.meta_title
				: 'Draft';

		if (page && !page.is_system) {
			return (
				<Fragment>
					<Link to="/settings/pages">
						<IconButton>
							<FontIcon color="#000" className="material-icons">
								keyboard_arrow_left
							</FontIcon>
						</IconButton>
					</Link>
					Edit Page
					<IconButton
						touch
						tooltipPosition="bottom-left"
						tooltip={messages.actions_delete}
						onClick={this.openDelete}
					>
						<FontIcon color="#000" className="material-icons">
							delete
						</FontIcon>
					</IconButton>
					{page.enabled && (
						<a href={page.url} target="_blank">
							<IconButton
								touch
								tooltipPosition="bottom-left"
								tooltip={messages.viewOnWebsite}
							>
								<FontIcon color="#000" className="material-icons">
									open_in_new
								</FontIcon>
							</IconButton>
						</a>
					)}
					<DeleteConfirmation
						open={this.state.openDelete}
						isSingle
						itemsCount={1}
						itemName={pageName}
						onCancel={this.closeDelete}
						onDelete={this.deletePage}
					/>
				</Fragment>
			);
		}
		return (
			<Fragment>
				<Link to="/settings/pages">
					<IconButton>
						<FontIcon color="#000" className="material-icons">
							keyboard_arrow_left
						</FontIcon>
					</IconButton>
				</Link>
				Pages
				<IconButton
					touch
					tooltipPosition="bottom-left"
					tooltip={messages.actions_delete}
					onClick={this.openDelete}
				></IconButton>
			</Fragment>
		);
	}
}
