import React from 'react';
import ProductsList from 'modules/products/list';
import ProductsFilter from 'modules/products/listFilter';
import Categories from 'modules/productCategories/list';

export default () => (
	<div className="row products-box">
		<div className="sidebar ">
			<h1>Products</h1>
			<Categories showAll showManage />
			<ProductsFilter />
		</div>
		<div className="content-area">
			<ProductsList />
		</div>
	</div>
);
