import React, { PureComponent } from 'react';
import '@ivfuture/tip-product-designer';
import '@ivfuture/tip-product-designer/dist/tip-product-designer.css';

export default class PdDesignerWrapper extends PureComponent {
	constructor(props) {
		super(props);
		this.wrapperRef = React.createRef();
	}

	componentDidMount() {
		// eslint-disable-next-line react/prop-types
		const { onCancel, onSave } = this.props;

		if (onCancel) {
			this.wrapperRef.current.addEventListener('cancel', e => onCancel(e));
		}

		if (onSave) {
			this.wrapperRef.current.addEventListener('save', e => onSave(e));
		}
	}

	render() {
		return <pd-designer ref={this.wrapperRef} {...this.props} />;
	}
}
