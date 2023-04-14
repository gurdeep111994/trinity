import React from 'react';
import messages from 'lib/text';

export default () => (
	<div className="block404">
		<div className="row">
			<div className="col-md-6" style={{ alignSelf: 'center' }}>
				<div className="leftcol">
					<h1>Lorem ipsum dolor sit amet, consetetur.</h1>
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
						nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
						erat, sed diam voluptua.
					</p>
					<a href="#" className="default-btn">
						Read more
					</a>
				</div>
			</div>
			<div className="col-md-6">
				<img src="/assets/images/404.png" className="img-fluid" />
			</div>
		</div>
	</div>
);
