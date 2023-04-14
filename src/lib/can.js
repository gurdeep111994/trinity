import ability from './ability';
const can = (action, data) => {
	return ability && ability.can(action, data);
};
export default can;
