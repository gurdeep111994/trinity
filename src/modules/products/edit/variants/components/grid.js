import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import style from './style.css';
import VariantImageUpload from './variant-Images';

class VariantInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value
		};
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
	}

	onChange = e => {
		this.setState({ value: e.target.value });
	};

	onBlur = e => {
		this.props.onChange(this.props.variantId, this.state.value);
	};

	render() {
		const { type, placeholder, disabled } = this.props;
		const { value } = this.state;

		return (
			<input
				type={type}
				className={style.textInput}
				placeholder={placeholder}
				value={value}
				onChange={this.onChange}
				onBlur={this.onBlur}
				min="0"
				disabled={disabled}
			/>
		);
	}
}

const VariantRow = ({
	variant,
	options,
	onSkuChange,
	onPriceChange,
	onStockChange,
	onWeightChange,
	onOptionChange,
	onDeleteVariant,
	controlDisable,
	onImageUpload,
	productId,
	uploadingImages,
	onImageDelete,
	onImageUpdate
}) => {
	const [open, togglePopup] = useState(false);
	const images =
		variant.images && Array.isArray(variant.images) && variant.images.length > 0
			? variant.images
			: [];
	const variantImage =
		variant.images && Array.isArray(variant.images) && variant.images.length > 0
			? variant.images[0]
			: '';
	const cols =
		options &&
		options.map((option, index) => {
			const variantOption = variant.options.find(
				i => i.option_id === option.id
			);
			const variantOptionValueId = variantOption
				? variantOption.value_id
				: null;

			if (option.values && option.values.length > 0) {
				const menuItems = option.values
					.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
					.map((value, index) => (
						<MenuItem key={index} value={value.id} primaryText={value.name} />
					));
				return (
					<div key={option.id} className={style.gridCol}>
						<DropDownMenu
							value={variantOptionValueId}
							underlineStyle={{ border: 'none' }}
							selectedMenuItemStyle={{ color: '#44444F' }}
							className="customDropDown"
							onChange={(event, key, value) => {
								onOptionChange(variant.id, option.id, value);
							}}
							disabled={controlDisable}
						>
							{menuItems}
						</DropDownMenu>
					</div>
				);
			}
			return <div key={option.id} className={style.gridCol} />;
		});

	return (
		<div className={style.gridRow}>
			<div className={style.gridCol}>
				<Fragment>
					{images && images.length > 0 ? (
						<img
							src={variantImage.url}
							alt="No image"
							style={{
								maxHeight: '60px',
								maxWidth: '60px',
								objectFit: 'cover'
							}}
							onClick={() => togglePopup(!open)}
						/>
					) : null}
					<VariantImageUpload
						open={open}
						images={images}
						productId={productId}
						variantId={variant.id}
						uploadingImages={uploadingImages}
						onImageUpload={onImageUpload}
						onImageDelete={onImageDelete}
						onImageUpdate={onImageUpdate}
						togglePopup={togglePopup}
					/>
				</Fragment>
			</div>
			<div className={style.gridCol}>
				<VariantInput
					type="text"
					placeholder=""
					variantId={variant.id}
					value={variant.sku}
					onChange={onSkuChange}
					disabled={controlDisable}
				/>
			</div>
			<div className={style.gridCol}>
				<VariantInput
					type="number"
					placeholder="0"
					variantId={variant.id}
					value={variant.price}
					onChange={onPriceChange}
					disabled={controlDisable}
				/>
			</div>
			<div className={style.gridCol}>
				<VariantInput
					type="number"
					placeholder="0"
					variantId={variant.id}
					value={variant.stock_quantity}
					onChange={onStockChange}
					disabled={controlDisable}
				/>
			</div>
			<div className={style.gridCol}>
				<VariantInput
					type="number"
					placeholder="0"
					variantId={variant.id}
					value={variant.weight}
					onChange={onWeightChange}
					disabled={controlDisable}
				/>
			</div>
			{cols}
			{!controlDisable ? (
				<div className={style.gridCol}>
					<IconButton
						title={messages.actions_delete}
						onClick={() => {
							onDeleteVariant(variant.id);
						}}
						disabled={controlDisable}
						tabIndex={-1}
					>
						<img src={'/assets/images/redtrash.svg'} alt="" />
						{/* <FontIcon color="#a1a1a1" className="material-icons">
						delete
					</FontIcon> */}
					</IconButton>
				</div>
			) : null}
		</div>
	);
};

const ProductVariantsGrid = ({
	settings,
	options,
	variants,
	createVariant,
	deleteVariant,
	createOption,
	productId,
	onSkuChange,
	onPriceChange,
	onStockChange,
	onWeightChange,
	onOptionChange,
	initialValues,
	onImageUpload,
	uploadingImages,
	onImageDelete,
	onImageUpdate
}) => {
	const origin =
		initialValues && initialValues.origin ? initialValues.origin : '';
	const controlDisable = origin ? origin.includes(messages.circle) : false;
	const hasOptions = options && options.length > 0;
	const hasVariants = variants && variants.length > 0;

	const headRowCols = hasOptions
		? options.map((option, index) => (
				<div key={index} className={style.gridCol}>
					<Link
						title={messages.editProductOption}
						to={`/product/${productId}/option/${option.id}`}
					>
						{option.name}
					</Link>
				</div>
		  ))
		: null;
	const variantRows = hasVariants
		? variants.map((variant, index) => (
				<VariantRow
					key={index}
					variant={variant}
					options={options}
					onSkuChange={onSkuChange}
					onPriceChange={onPriceChange}
					onStockChange={onStockChange}
					onWeightChange={onWeightChange}
					onOptionChange={onOptionChange}
					onDeleteVariant={deleteVariant}
					controlDisable={controlDisable}
					onImageUpload={onImageUpload}
					productId={productId}
					uploadingImages={uploadingImages}
					onImageDelete={onImageDelete}
					onImageUpdate={onImageUpdate}
				/>
		  ))
		: null;

	return (
		<Paper className="paper-box" zDepth={0}>
			<div className={style.innerBox}>
				<div className="edit-product-section-title">
					{messages.productVariants}
				</div>
				<div className={style.grid}>
					<div className={style.gridHeadRow}>
						<div className={style.gridCol}>{messages.images}</div>
						<div className={style.gridCol}>{messages.products_sku}</div>
						<div className={style.gridCol}>{messages.products_price}</div>
						<div className={style.gridCol}>{messages.products_stock}</div>
						<div className={style.gridCol}>{messages.products_weight}</div>
						{headRowCols}
						{!controlDisable ? <div className={style.gridCol} /> : null}
						{/* {!controlDisable ? <div className={style.gridCol} /> : null} */}
					</div>
					{variantRows}
				</div>
			</div>
			<div className={style.innerBox}>
				<Button
					onClick={createVariant}
					style={{ marginRight: 10 }}
					disabled={!hasOptions}
					variant="contained"
					className={style.btnCreate}
					disabled={controlDisable}
				>
					{messages.addVariant}
				</Button>
				<Button
					onClick={createOption}
					variant="outlined"
					className={style.btnCreate}
					disabled={controlDisable}
				>
					{messages.addOption}
				</Button>
			</div>
		</Paper>
	);
};

export default ProductVariantsGrid;
