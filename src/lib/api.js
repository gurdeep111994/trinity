import TrinityClient from '@ivfuture/trinity-api-client';
import { apiBaseUrl, developerMode, getEnv } from 'lib/settings';

let api = null;
const dashboardToken = localStorage.getItem('dashboard_token');
const authToken = localStorage.getItem('authToken');
const webstoreToken = localStorage.getItem('webstore_token');

const DEVELOPER_MODE = getEnv(developerMode) === 'true';

if (dashboardToken || authToken || DEVELOPER_MODE === true) {
	api = new TrinityClient({
		apiBaseUrl: getEnv(apiBaseUrl) || '/api/v1',
		apiToken: dashboardToken || authToken,
		webstoreToken
	});
}

export default api;
