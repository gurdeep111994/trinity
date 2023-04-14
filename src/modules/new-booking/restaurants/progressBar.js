import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';

const BorderLinearProgress = withStyles({
	root: {
		height: 4,
		borderRadius: 4,
		backgroundColor: lighten('#3DD598', 0.5)
	},
	bar: {
		borderRadius: 4,
		backgroundColor: '#3DD598'
	}
})(LinearProgress);

const useStyles = makeStyles(theme => ({
	margin: {
		margin: theme.spacing(0)
	}
}));

export default function CustomizedProgressBars() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<BorderLinearProgress
				className={classes.margin}
				variant="determinate"
				color="secondary"
				value={50}
			/>
		</div>
	);
}
