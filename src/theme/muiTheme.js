import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#00C3A6'
		},
		secondary: {
			main: '#009C8F'
		},
		error: {
			main: '#FC5A5A'
		}
	},
	overrides: {
		MuiButton: {
			root: {
				borderRadius: '10px',
				textTransform: 'inherit'
			},
			contained: {
				backgroundColor: '#00978B',
				boxShadow: '0',
				color: '#ffffff',
				'&:hover': {
					boxShadow: '0',
					backgroundColor: '#41998ad1'
				}
			},
			outlined: {
				background: 'transparent',
				color: '#00978B',
				borderColor: '#00978B',
				'&:hover': {
					backgroundColor: '#41998ad1',
					color: '#ffffff'
				}
			}
		},
		MuiPaper: {
			root: {
				borderRadius: '20px'
			}
		},
		MuiDialog: {
			paper: {
				borderRadius: '20px'
			}
		}
	}
});

export default theme;
