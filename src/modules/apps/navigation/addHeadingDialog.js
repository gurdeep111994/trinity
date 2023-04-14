import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';

import style from './style.css';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';

export default class AddHeadingDialog extends React.Component {
	constructor() {
		super();
	}

	render() {
		var props = this.props;
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={() => {
						this.props.togglePopup();
					}}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						<span className={style.title}> {'Add Navigation Header'}</span>
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<form>
								<FormGroup>
									<FormControl>
										<InputLabel htmlFor="menu-heading">Heading </InputLabel>
										<Input
											id="menu-heading"
											aria-describedby="menu-heading-helper-text"
											value={this.props.nav.heading}
											onChange={e => {
												var nav = Object.assign({}, this.props.nav);
												var val = e.target.value;
												nav.heading = val;
												nav.url = val.toLowerCase().replace(' ', '-');
												this.props.onChange(nav);
											}}
										/>
										<FormHelperText
											id="menu-heading-helper-text"
											style={
												this.props.error
													? { color: 'red', display: 'block' }
													: { display: 'none' }
											}
										>
											Required
										</FormHelperText>
									</FormControl>
								</FormGroup>
								<FormGroup>
									<FormControl>
										<InputLabel htmlFor="menu-url-input">Unique Id</InputLabel>
										<Input
											id="menu-url-input"
											aria-describedby="menu-url-helper-text"
											value={this.props.nav.url}
											onChange={e => {
												var nav = Object.assign({}, this.props.nav);
												nav.url = e.target.value;
												this.props.onChange(nav);
											}}
										/>
										<FormHelperText
											id="menu-url-helper-text"
											style={
												this.props.error
													? { color: 'red', display: 'block' }
													: { display: 'none' }
											}
										>
											Required
										</FormHelperText>
									</FormControl>
								</FormGroup>
								{/* <FormGroup>
									<FormControlLabel
										control={
											<Checkbox
												className={`customCheckbox ${
													props.nav.isUrlRelative ? 'activecheckbox' : ''
												}`}
												value="isUrlRelative"
												checked={
													props.nav.isUrlRelative
														? props.nav.isUrlRelative
														: false
												}
												onChange={e => {
													var nav = Object.assign({}, this.props.nav);
													nav.isUrlRelative = e.target.checked;
													this.props.onChange(nav);
												}}
											/>
										}
										label="This URL is relative"
										className="customCheckboxLabel"
									/>
								</FormGroup>
								<FormGroup> 
									<FormControlLabel
										control={
											<Checkbox
												className={`customCheckbox ${
													props.nav.isOpenNewTab ? 'activecheckbox' : ''
												}`}
												value="isOpenNewTab"
												checked={
													props.nav.isOpenNewTab
														? props.nav.isOpenNewTab
														: false
												}
												onChange={e => {
													var nav = Object.assign({}, this.props.nav);
													nav.isOpenNewTab = e.target.checked;
													this.props.onChange(nav);
												}}
											/>
										}
										label="Open in a new tab"
										className="customCheckboxLabel"
									/>
								</FormGroup>*/}
							</form>
						</DialogContentText>
					</DialogContent>
					<DialogActions style={{ padding: ' 16px 24px' }}>
						{this.props.nav.canBeDeleted ? (
							<Fragment>
								<Link
									href="#"
									style={{ marginRight: 'auto' }}
									onClick={() => {
										this.props.onDelete();
									}}
								>
									Delete
								</Link>
							</Fragment>
						) : (
							<Fragment></Fragment>
						)}
						<Button
							onClick={() => {
								this.props.togglePopup();
							}}
							className="actionbtn"
						>
							<ClearIcon /> Cancel
						</Button>
						<Button
							onClick={() => {
								this.props.saveHeading();
							}}
							className="actionbtn fillAction"
							autoFocus
						>
							<CheckIcon /> Save
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}
