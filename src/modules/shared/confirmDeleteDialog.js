import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
const useStyles = makeStyles({});

const DialogComponent = props => {
	const handleDelete = event => {
		if (props.startLoader) {
			props.startLoader();
		}
		event.preventDefault();
		props.delete(props.data.id);
		props.handleClose();
	};

	return (
		<Dialog onClose={props.handleClose} open={props.open}>
			<DialogTitle>Deleting: {props.data.name}</DialogTitle>
			<DialogContent>
				<DialogContentText>
					Are you sure you want to delete {props.data.name} ?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={e => handleDelete(e)} color="primary" autoFocus>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogComponent;
