import envBootstrap from './env-bootstrap';
import ssoCheck from './sso-check';
import '../public/css/flexboxgrid.min.css';
import '../public/css/style.css';
import '../public/css/responsive.css';
import '../public/css/carousel.css';
import {
	getEnv,
	keycloakClientId,
	keycloakOnLoad,
	keycloakRealm,
	keycloakUrl
} from './lib/settings';

console.info('### getEnv(keycloakUrl)', getEnv(keycloakUrl));

envBootstrap()
	.then(() =>
		ssoCheck({
			url: getEnv(keycloakUrl),
			realm: getEnv(keycloakRealm),
			clientId: getEnv(keycloakClientId),
			onLoad: getEnv(keycloakOnLoad)
		})
	)
	.then(({ keycloak, ssoToken }) =>
		// reload the env file
		envBootstrap()
			.then(() => import('./app-bootstrap'))
			.then(appBootstrap => appBootstrap.default(keycloak, ssoToken))
			.then(() => {
				console.log('Application was bootstrapped successfully');
			})
	);
