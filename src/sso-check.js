import Keycloak from 'keycloak-js';

export default ({ url, realm, clientId, onLoad }) =>
	new Promise((resolve, reject) => {
		const keycloakOptions = {
			url,
			realm,
			clientId,
			onLoad
		};

		const keycloak = new Keycloak(keycloakOptions);

		keycloak
			.init({ onLoad: keycloakOptions.onLoad })
			.success(authenticate => {
				if (!authenticate) {
					keycloak.login();
				} else {
					resolve({
						keycloak,
						ssoToken: keycloak.token
					});
				}
			})
			.error(err => {
				console.error('Authenticated Failed');
				reject(err);
			});
	});
