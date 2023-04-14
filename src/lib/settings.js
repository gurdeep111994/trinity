// eslint-disable-next-line no-undef
const buildEnvironment = APPLICATION_CONFIG;

export default buildEnvironment;

const runtimeEnvironment = {};

export const setEnv = (config = {}) => {
	Object.keys(config).forEach(key => {
		// eslint-disable-next-line no-prototype-builtins
		if (config.hasOwnProperty(key)) {
			runtimeEnvironment[key] = config[key];
		}
	});
};

export const getEnv = envName =>
	runtimeEnvironment[envName] || process.env[envName];

// application specific configs
export const { language } = buildEnvironment;
export const appLanguage = 'APP_LANGUAGE';
export const developerMode = 'DEVELOPER_MODE';

// integration configs
// -- api
export const apiBaseUrl = 'API_BASE_URL';
export const apiWebSocketUrl = 'API_WEB_SOCKET_URL';
// -- booking
export const bookingApi = 'BOOKING_API';
export const bookingApiUser = 'BOOKING_API_USER';
export const bookingApiPass = 'BOOKING_API_PASS';
// -- keycloak
export const keycloakUrl = 'KEYCLOAK_URL';
export const keycloakRealm = 'KEYCLOAK_REALM';
export const keycloakClientId = 'KEYCLOAK_CLIENT_ID';
export const keycloakOnLoad = 'KEYCLOAK_ON_LOAD';
export const pageBuilderApi = 'PAGE_BUILDER_API';
// -- product designer
export const productDesignerApiUrl = 'PRODUCT_DESIGNER_API_URL';
// -- asset manager
export const assetManagerApiUrl = 'ASSET_MANAGER_API_URL';
// -- minio
export const minioUrl = 'MINIO_URL';
// -- visual merchandiser
export const visualMerchandiserUrl = 'VISUAL_MERCHANDISER_URL';

setEnv({
	APP_LANGUAGE: language
});
