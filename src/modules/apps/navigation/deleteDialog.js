import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WarningIcon from '@material-ui/icons/Warning';
import style from './style.css';

import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

export default class AlertDialog extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={() => {
						this.props.toggleDialog();
					}}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<div
						className="row"
						style={{ padding: '2rem 1rem 0rem', margin: '0' }}
					>
						<div className="col" style={{ alignSelf: 'center' }}>
							<div className="error-icon">
								<img src={'/assets/images/apps/error.svg'} alt="" />
							</div>
						</div>
						<div className="col">
							<DialogTitle id="alert-dialog-title">
								<span className={style.title}>
									{' '}
									{'Delete navigation item ? '}
								</span>
							</DialogTitle>
						</div>
					</div>

					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Deleting navigation items also removes them from the navigation
							tree.
						</DialogContentText>
					</DialogContent>
					<DialogActions style={{ marginBottom: '1rem' }}>
						<Button
							onClick={() => {
								this.props.toggleDialog();
							}}
							className="actionbtn"
						>
							<ClearIcon /> Cancel
						</Button>
						<Button
							onClick={() => {
								if (this.props.panel === 'left') {
									this.props.deleteLeftItem(this.props.navigationItems);
								} else if (this.props.panel === 'right') {
									this.props.deleteRightItem(this.props.navigationItems);
								}
								this.props.setNavigationItems({});
								this.props.toggleDialog();
								this.props.togglePopup(false);
							}}
							className="actionbtn fillAction"
							autoFocus
						>
							<CheckIcon /> Delete
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
