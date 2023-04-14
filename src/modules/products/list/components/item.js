import React from 'react';
import { Link } from 'react-router-dom';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import messages from 'lib/text';
import * as helper from 'lib/helper';
import style from './style.css';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from 'material-ui/Checkbox';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Button } from '@material-ui/core';

const THUMBNAIL_WIDTH = 100;
const ImagePlaceholder = (
	<FontIcon
		style={{ fontSize: 30, color: '#cccccc' }}
		className="material-icons"
	>
		photo_camera
	</FontIcon>
);

const ItemImage = ({ images }) => {
	if (images && images.length > 0) {
		const imageUrl = helper.getThumbnailUrl(images[0].url, THUMBNAIL_WIDTH);
		return <img src={`${imageUrl}`} className={style.image} />;
	}
	return ImagePlaceholder;
};

const ItemPrice = ({ product, settings }) => {
	const priceFormatted = helper.formatCurrency(product.price, settings);
	const priceOldFormatted = product.on_sale
		? helper.formatCurrency(product.regular_price, settings)
		: '';

	return (
		<div>
			<small>{priceOldFormatted}</small>
			{priceFormatted}
		</div>
	);
};

const ItemStock = ({ status, quantity }) => {
	let stockValue = '';
	let stockClass = '';
	switch (status) {
		case 'discontinued':
			stockValue = messages.products_discontinued;
			stockClass = style.discontinued;
			break;
		case 'backorder':
			stockValue = messages.products_backorder;
			stockClass = style.backorder;
			break;
		case 'preorder':
			stockValue = messages.products_preorder;
			stockClass = style.preorder;
			break;
		case 'available':
			stockValue = messages.products_inStock;
			stockClass = style.inStock;
			break;
		case 'out_of_stock':
		default:
			stockValue = messages.products_outOfStock;
			stockClass = style.outOfStock;
			break;
	}

	return <div className={stockClass}>{stockValue}</div>;
};

const ProductItem = ({
	product,
	onSelect,
	selected,
	settings,
	onActionClick
}) => {
	let productClass = style.productName;
	let dropDownClassListing = style.dropDownListing;
	if (!product.enabled || product.discontinued) {
		productClass += ` ${style.productInactive}`;
	} else {
		productClass += ` ${style.productActive}`;
	}

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const productName =
		product.name && product.name.length > 0
			? product.name
			: `<${messages.draft}>`;
	const productItemClass = `products-item${
		selected === true ? ' selected' : ''
	}`;
	const checkboxClass = selected === true ? 'activecheckbox' : '';
	return (
		<div
			className={`${productItemClass} ${style.minHeight30}`}
			style={{ paddingLeft: '16px', paddingRight: '16px' }}
		>
			<div className="row row--no-gutter middle-xs">
				<div className="col-xs-1 ">
					{/* <input
							type="checkbox"
							className={style.checkbox}
							onChange={onSelect}
							checked={selected}
							value={product.id}
						/> */}
					<FormControlLabel
						control={
							<Checkbox
								color="primary"
								className={`${checkboxClass} customCheckbox`}
								onCheck={onSelect}
								checked={selected}
								value={product.id}
							/>
						}
						label=""
					/>
				</div>
				<div className="col-xs-6 col--no-gutter">
					<div className="row">
						<div className="col-xs-3">
							<div className={`row middle-xs  ${style.imageBox}`}>
								<div className="col-xs-12">
									<div className="box">
										<ItemImage images={product.images} />
									</div>
								</div>
							</div>
						</div>
						<div className="col-xs-9">
							<Link to={`/product/${product.id}`} className={productClass}>
								{productName}
								<br />
								{/* <small>{product.category_name}</small> */}
							</Link>
						</div>
					</div>
				</div>

				<div
					className={`col-xs-1  col--no-gutter ${style.break}`}
					style={{ paddingLeft: '3px' }}
				>
					{!product.enabled || product.discontinued
						? messages.products_invisible
						: messages.products_visible}
				</div>
				<div
					className={`col-xs-2  col--no-gutter  ${style.break}`}
					style={{ paddingLeft: '3px' }}
				>
					<ItemStock
						status={product.stock_status}
						quantity={product.stock_quantity}
					/>
				</div>
				<div
					className={`col-xs-1  col--no-gutter ${style.price}`}
					style={{ paddingLeft: '3px' }}
				>
					<ItemPrice product={product} settings={settings} />
				</div>

				<div
					className="col-xs-1  col--no-gutter"
					style={{ textAlign: 'right', paddingRight: '10px' }}
				>
					<FontIcon
						style={{ transform: 'rotate(90deg)' }}
						className="material-icons"
						onClick={handleClick}
						color={'#92929D'}
					>
						more_vert
					</FontIcon>

					<Menu
						id="simple-menu"
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
						PaperProps={{
							style: {
								maxHeight: 200,
								minWidth: 100
							}
						}}
					>
						<MenuItem
							onClick={e => {
								let aProduct = Object.assign({}, product);
								aProduct.enabled = aProduct.enabled ? !aProduct.enabled : true;
								onActionClick(aProduct);
							}}
						>
							{' '}
							{product.enabled
								? messages.products_invisible
								: messages.products_visible}
						</MenuItem>

						<MenuItem>
							<Link
								to={`/product/${product.id}`}
								className={dropDownClassListing}
							>
								{' '}
								Edit{' '}
							</Link>
						</MenuItem>
					</Menu>
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
