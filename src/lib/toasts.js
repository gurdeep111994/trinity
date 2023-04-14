import { toast } from 'react-toastify';
import { css } from 'glamor';

export default {
	error(msg, options = {}) {
		return toast.error(msg, {
			...options,
			className: css({
				color: '#fff',
				minHeight: '70px',
				minWidth: '320px',
				borderRadius: '12px',
				paddingLeft: '25px',
				boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)',
				fontSize: '1em'
			})
		});
	},
	success(msg, options = {}) {
		return toast.success(msg, {
			...options,
			className: css({
				minHeight: '60px',
				minWidth: '320px',
				borderRadius: '12px',
				paddingLeft: '25px',
				fontSize: '1em'
			})
		});
	}
};
