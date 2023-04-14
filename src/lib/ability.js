//ability.js
import { Ability, AbilityBuilder } from '@casl/ability';
import { decode } from 'jsonwebtoken';
const ability = new Ability([]);
function defineRulesFor() {
	const { can, rules } = AbilityBuilder.extract();
	const token = localStorage.getItem('authToken');
	if (token) {
		const {
			realm_access: { roles }
		} = decode(token);
		if (roles.includes('trinity-admin')) {
			can(
				['access', 'visit'],
				['trinity', 'common', 'rest', 'table', 'time', 'book']
			);
		} else if (roles.includes('trinity-spa-manager')) {
			can(['access', 'visit'], ['rest', 'common']);
		} else if (roles.includes('trinity-fitness-manager')) {
			can(['access', 'visit'], ['table', 'common']);
		} else if (roles.includes('trinity-dine-manager')) {
			can(['access', 'visit'], ['time', 'common']);
		} else if (roles.includes('trinity-book-manager')) {
			can(['access', 'visit'], ['book', 'common']);
		} else {
			can([], []);
		}
	} else {
		can([], []);
	}
	return rules;
}
export const updateAbility = () => {
	ability.update(defineRulesFor());
};
export default ability;
