import React, { Component } from 'react';

require('./loader.css');

export default class Loader extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="loader">
				<svg className="circular" viewBox="25 25 50 50">
					<circle
						className="path"
						cx="50"
						cy="50"
						r="20"
						fill="none"
						strokeWidth="2"
						strokeMiterlimit="10"
					/>
				</svg>
			</div>
		);
	}
}