import '../public/css/flexboxgrid.min.css';
import '../public/css/style.css';
// import '../public/css/pageBuilder.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { KeycloakProvider } from 'react-keycloak';
import { fetchSettings } from './modules/settings/actions';
import { developerMode, getEnv } from './lib/settings';
import * as auth from './lib/auth';
import { connectToWebSocket } from './lib/apiWebSocket';
import reducers from './rootReducer';
import App from './app';
import theme from './theme/muiTheme';

export default (keycloak, ssoToken) => {
	const DEVELOPER_MODE = getEnv(developerMode) === 'true';
	const middlewares = [thunkMiddleware];

	if (!DEVELOPER_MODE) {
		auth.validateCurrentToken();
	} else {
		middlewares.push(logger);
	}

	const store = createStore(reducers, applyMiddleware(...middlewares));
	store.dispatch(fetchSettings());
	// Setup Keycloak instance as needed
	if (window.WebSocket) {
		connectToWebSocket(store);
	} else {
		console.log('WebSocket is not supported by your browser.');
	}

	ReactDOM.render(
		<MuiThemeProvider theme={theme}>
			<Provider store={store}>
				<KeycloakProvider keycloak={keycloak}>
					<App />
				</KeycloakProvider>
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('app')
	);
	auth.processToken(keycloak.token);
	setInterval(() => {
		keycloak
			.updateToken(70)
			.then(refreshed => {
				if (refreshed) {
					auth.processToken(keycloak.token);
				}
			})
			.catch(() => {
				console.error('Failed to refresh token');
			});
	}, 60000);
};
