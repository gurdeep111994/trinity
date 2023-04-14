import React from 'react';
import { Route } from 'react-router-dom';
import ProductEdit from 'modules/products/edit';
import ProductOption from 'modules/products/edit/option';

const ProductDetails = props => (
	<div className="row row--no-gutter col-full-height scroll">
		<div className="col-xs-12">
			<Route path="/product/:productId" exact component={ProductEdit} />
			<Route
				path="/product/:productId/option/:optionId"
				component={ProductOption}
			/>
		</div>
	</div>
);

export default ProductDetails;
