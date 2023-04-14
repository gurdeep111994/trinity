import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import toast from '../../../lib/toasts';

const useStyles = makeStyles({
	text: {
		minWidth: 400,
		margin: '20px auto'
	},
	container: {
		margin: 'auto',
		maxWidth: 600
	}
});

const EditDialogComponent = props => {
	const classes = useStyles();
	const [editData, setData] = useState({});
	const statusData = [
		{ label: 'Pending', value: 'pending' },
		{ label: 'Confirmed', value: 'confirmed' },
		{ label: 'Canceled', value: 'canceled' }
	];

	useEffect(() => {
		setData(props.data);
	}, []);

	const handleChange = event => {
		setData({
			...editData,
			[event.target.name]: event.target.value
		});
	};

	const handleUpdate = event => {
		if (props.startLoader) {
			props.startLoader();
		}
		props.edit(editData);
	};

	return (
		<Dialog onClose={props.handleClose} open={props.open}>
			<DialogTitle>Edit Booking</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Select
						value={editData.status}
						onChange={e => handleChange(e)}
						className={classes.text}
						variant="outlined"
						label="Status"
						name="status"
					>
						{statusData.length &&
							statusData.map((item, index) => {
								return (
									<MenuItem key={index} value={item.value}>
										{item.label}
									</MenuItem>
								);
							})}
					</Select>
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="primary">
					Cancel
				</Button>
				<Button onClick={e => handleUpdate(e)} color="primary" autoFocus>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default EditDialogComponent;
