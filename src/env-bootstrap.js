import axios from 'axios';
import { setEnv } from './lib/settings';

export default () =>
	new Promise(resolve => {
		axios.get('/assets/env.json').then(({ data }) => {
			setEnv(data);

			resolve(data);
		});
	});
