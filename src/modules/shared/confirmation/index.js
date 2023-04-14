import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from '@material-ui/core/Button';
import FlatButton from 'material-ui/FlatButton';

export default class ConfirmationDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: props.open
		};
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.open !== nextProps.open) {
			this.setState({
				open: nextProps.open
			});
		}
	}

	handleCancel = () => {
		this.setState({ open: false });
		if (this.props.onCancel) {
			this.props.onCancel();
		}
	};

	handleSubmit = () => {
		this.setState({ open: false });
		if (this.props.onSubmit) {
			this.props.onSubmit();
		}
	};

	render() {
		const {
			title,
			description,
			submitLabel,
			cancelLabel,
			modal = false
		} = this.props;

		const actions = [
			<Button
				onClick={this.handleCancel}
				style={{ marginRight: 10, height: '38px' }}
				className="modalbtns cancel-btn"
			>
				{cancelLabel}
			</Button>,
			<Button
				keyboardFocused
				onClick={this.handleSubmit}
				style={{ marginRight: 10, height: '38px' }}
				className="modalbtns"
			>
				{submitLabel}
			</Button>
		];

		return (
			<Dialog
				title={title}
				actions={actions}
				modal={modal}
				className="customModal"
				open={this.state.open}
				onRequestClose={this.handleCancel}
			>
				<div style={{ wordWrap: 'break-word' }}>{description}</div>
			</Dialog>
		);
	}
}
