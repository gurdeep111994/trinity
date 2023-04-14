import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ChipInput from 'material-ui-chip-input';
import PropTypes from 'prop-types';
import CategorySelect from 'modules/productCategories/select';
import { Link } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import messages from 'src/lib/text';
import Paper from 'material-ui/Paper';
import style from '../../../header/header.css';
import style2 from '../../../products/edit/general/components/style.css';

import PdDesignerWrapper from '../../components/PdDesignerWrapper';
import ProductTypesCarousel from '../../components/ProductTypesCarousel';

export default class ProductDesignerPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isDesignerOpen: false,
			productTypeId: '',
			name: '',
			slug: '',
			subtitle: '',
			description: '',
			categoryId: '',
			hashtags: [],
			metafields: [],
			errors: {},
			metaObj: {
				id: '',
				text: ''
			}
		};
	}

	static get propTypes() {
		return {
			productTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
			productDesignerService: PropTypes.string.isRequired,
			assetManagerService: PropTypes.string.isRequired,
			externalAssetsHost: PropTypes.string.isRequired,
			loadProductTypes: PropTypes.func.isRequired,
			onCreate: PropTypes.func.isRequired
		};
	}

	componentDidMount() {
		const { loadProductTypes } = this.props;
		loadProductTypes();
	}

	render() {
		const { isDesignerOpen } = this.state;

		return isDesignerOpen ? this.renderPodDesigner() : this.renderPodView();
	}

	// eslint-disable-next-line react/sort-comp
	renderMetadataValue(metaobj, index, placeholderDetail, placeholderInfo) {
		return (
			<Grid className="ml-5" container spacing={1} key={`meta${index}`}>
				<Grid item xs={5}>
					<TextField
						id={`metaDetailName${index}`}
						name={`metaDetailName${index}`}
						value={metaobj.id}
						placeholder={placeholderDetail}
						onChange={this.onChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={5}>
					<TextField
						id={`metaDetailInfo${index}`}
						name={`metaDetailInfo${index}`}
						value={metaobj.text}
						placeholder={placeholderInfo}
						onChange={this.onChange}
						variant="outlined"
						fullWidth
					/>
				</Grid>
				<Grid item xs={2}>
					<Button
						variant="contained"
						className="iconBtn"
						style={{ marginTop: '20px' }}
						onClick={() => {
							this.removeMetaDetails(index);
						}}
					>
						<i className="fa fa-minus" />
					</Button>
				</Grid>
			</Grid>
		);
	}

	renderCategoryView() {
		const { categoryId, errors } = this.state;

		return (
			<div>
				<span style={{ color: 'red' }}>
					{this.ifExists(errors, 'categoryId')}
				</span>
				<CategorySelect
					onSelect={this.onCategorySelect}
					selectedId={categoryId}
					opened={false}
				/>
			</div>
		);
	}

	renderPodProductForm() {
		const { errors, name, slug, subtitle, description } = this.state;

		return (
			<form onSubmit={this.formSubmit}>
				<Grid container spacing={6}>
					<Grid item xs={12}>
						<TextField
							id="pname"
							name="name"
							value={name}
							label="Title"
							onChange={this.onChange}
							fullWidth
						/>
						<span style={{ color: 'red' }}>
							{this.ifExists(errors, 'name')}
						</span>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="slug"
							name="slug"
							value={slug}
							label="Slug"
							onChange={this.onChange}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="inputAddress"
							name="subtitle"
							value={subtitle}
							label="Subtitle"
							onChange={this.onChange}
							fullWidth
						/>
						<span style={{ color: 'red' }}>
							{this.ifExists(errors, 'subtitle')}
						</span>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="description"
							multiline
							name="description"
							value={description}
							label="Description"
							rows={6}
							onChange={this.onChange}
							fullWidth
						/>
						<span style={{ color: 'red' }}>
							{this.ifExists(errors, 'description')}
						</span>
					</Grid>
				</Grid>
			</form>
		);
	}

	renderMetadata() {
		const { metafields, metaObj } = this.state;
		const placeholderDetail = 'Detail name';
		const placeholderInfo = 'Detail info';
		let $metadataValues = null;

		if (metafields.length > 0) {
			$metadataValues = metafields.map((metaobj, index) =>
				this.renderMetadataValue(
					metaobj,
					index,
					placeholderDetail,
					placeholderInfo
				)
			);
		}

		return (
			<div>
				<Grid container spacing={3}>
					<Grid item xs={5}>
						<TextField
							id="metaDetailName"
							name="metaDetailName"
							value={metaObj.id}
							onChange={this.onChange}
							onKeyPress={this.keyPress}
							label="Detail Name"
							placeholder={placeholderDetail}
							fullWidth
						/>
					</Grid>
					<Grid item xs={5}>
						<TextField
							id="metaDetailInfo"
							name="metaDetailInfo"
							value={metaObj.text}
							onChange={this.onChange}
							onKeyPress={this.keyPress}
							label="Detail Info"
							placeholder={placeholderInfo}
							fullWidth
						/>
					</Grid>
					<Grid item xs={2}>
						<Button
							variant="contained"
							className="iconBtn"
							style={{
								height: '49px',
								width: '49px',
								marginTop: '0px',
								display: 'block',
								minWidth: '0'
							}}
							onClick={() => {
								this.addMetadetails();
							}}
						>
							<i className="fa fa-plus" />
						</Button>
					</Grid>
				</Grid>

				{$metadataValues}
			</div>
		);
	}

	renderTags() {
		const { hashtags } = this.state;

		return (
			<Grid item xs={12}>
				<ChipInput
					value={hashtags}
					placeholder="tags"
					label="Tags"
					className="customChipInput"
					dataSourceConfig={{ text: 'text', value: 'id' }}
					onAdd={chip => {
						if (chip.text && chip.id && chip.text.trim() && chip.id.trim()) {
							const index = hashtags.findIndex(
								x => x.text === chip.text.trim()
							);
							if (!(index > -1)) {
								const newChip = { text: chip.text.trim(), id: chip.id.trim() };
								hashtags.push(newChip);
								this.setState({ hashtags });
							}
						}
					}}
					onDelete={(chip, index) => {
						const newHashtags = [...hashtags];
						newHashtags.splice(index, 1);
						this.setState({ hashtags: newHashtags });
					}}
				/>
			</Grid>
		);
	}

	renderProductTypesCarousel() {
		const { productTypes, externalAssetsHost } = this.props;

		return (
			<Grid className="mt-4" item xs={12}>
				<ProductTypesCarousel
					externalAssetsHost={externalAssetsHost}
					productTypes={productTypes}
					setProductTypeId={id => this.setProductTypeId(id)}
				/>
			</Grid>
		);
	}

	renderPodView() {
		return (
			<div>
				<Grid container>
					<Grid item xs={4}>
						<Link to="/products">
							<IconButton className="back-icon">
								<FontIcon color="#92929D" className="material-icons back-icon">
									arrow_back_ios
								</FontIcon>
							</IconButton>
							<span className={style.backArrowText}>
								{messages.products_title}
							</span>
						</Link>
					</Grid>
					<Grid item xs={4} className={style.alignCenter}>
						<Typography
							variant="h5"
							gutterBottom
							className={style.editHeadText}
						>
							Print on Demand
						</Typography>
					</Grid>
				</Grid>

				<Grid container>
					<Grid item xs={12}>
						<Paper className="paper-box" zDepth={0}>
							<div className={[style2.innerBox, style2.innerText].join(' ')}>
								<Grid container spacing={6}>
									<Grid item xs={6}>
										<div
											className="edit-product-section-title"
											style={{ marginBottom: '18px' }}
										>
											Details
										</div>

										{this.renderPodProductForm()}

										<div
											className="edit-product-section-title"
											style={{ marginBottom: '18px', marginTop: '30px' }}
										>
											Metadata
										</div>

										{this.renderMetadata()}

										<div
											className="edit-product-section-title"
											style={{ marginBottom: '18px', marginTop: '30px' }}
										>
											Tags
										</div>

										{this.renderTags()}
									</Grid>

									<Grid item xs={6}>
										<div
											className="edit-product-section-title"
											style={{ marginBottom: '18px' }}
										>
											Categories
										</div>

										{this.renderCategoryView()}
									</Grid>

									<Grid className="mt-4" item xs={12}>
										{this.renderProductTypesCarousel()}
									</Grid>
								</Grid>

								<Grid container direction="row" justify="flex-end" spacing={6}>
									<Grid item sm={3} xs={6}>
										<Button
											variant="contained"
											color="primary"
											fullWidth
											onClick={this.formSubmit}
											style={{
												color: 'white',
												width: 'auto',
												marginLeft: 'auto',
												display: 'block',
												backgroundColor: '#00978B'
											}}
										>
											Customize Product
										</Button>
									</Grid>
								</Grid>
							</div>
						</Paper>
					</Grid>
				</Grid>
			</div>
		);
	}

	renderPodDesigner() {
		const { productTypeId } = this.state;
		const {
			productDesignerService,
			assetManagerService,
			externalAssetsHost
		} = this.props;

		const formEnvironmentProps = {
			'product-types-endpoint': `${productDesignerService}/product-types`,
			'tag-types-endpoint': `${assetManagerService}/tagTypes`,
			'artworks-endpoint': `${assetManagerService}/artworks`,
			'licenses-endpoint': `${assetManagerService}/licenses`,
			'collections-endpoint': `${assetManagerService}/collections`,
			'franchises-endpoint': `${assetManagerService}/franchises`,
			'characters-endpoint': `${assetManagerService}/characters`,
			'labels-endpoint': `${assetManagerService}/labels`,
			'media-endpoint': `${productDesignerService}/media`,
			'external-assets-host': `${externalAssetsHost}`
		};

		const formProps = {
			...formEnvironmentProps,
			'product-type-id': productTypeId
		};

		return (
			<Grid container spacing={1}>
				<Grid item xs={12}>
					<PdDesignerWrapper
						{...formProps}
						onSave={event => this.onDesignerSave(event)}
					/>
				</Grid>
			</Grid>
		);
	}

	keyPress = e => {
		if (e.key === 'Enter') {
			this.addMetadetails();
		}
	};

	onChange = e => {
		const { name, value } = e.target;
		const { slug, metafields, metaObj, errors } = this.state;

		let newSlug = slug;
		const changedMetaFields = metafields.slice();

		if (name === 'name') {
			if (name.length > 0) {
				newSlug = this.slugify(value);
			}
		}

		if (!name.startsWith('metaDetail') && errors[e.target.name]) {
			const newErrors = Object.assign({}, errors);
			delete newErrors[e.target.name];
			this.setState({
				[e.target.name]: e.target.value.trim(''),
				errors: newErrors,
				slug: newSlug
			});
		} else if (name.startsWith('metaDetail')) {
			const index = name.replace(/\D/g, '');
			if (index) {
				if (name.includes('Name')) {
					changedMetaFields[index].id = value;
				} else {
					changedMetaFields[index].text = value;
				}
				this.setState({ metafields: changedMetaFields });
			} else {
				if (name.includes('Name')) {
					metaObj.id = value;
				} else {
					metaObj.text = value;
				}
				this.setState({ metaObj });
			}
		} else {
			if (name === 'name') {
				this.setState({ slug: newSlug });
			}
			this.setState({ [e.target.name]: e.target.value });
		}
	};

	onCategorySelect = categoryId => {
		const { errors } = this.state;
		const newErrors = Object.assign({}, errors);
		delete newErrors.categoryId;

		this.setState({ categoryId, errors: newErrors });
	};

	addMetadetails() {
		const { metafields, metaObj } = this.state;
		const newMetafields = metafields.slice();

		if (metaObj.id && metaObj.text) {
			newMetafields.push(metaObj);
			this.setState({
				metafields: newMetafields,
				metaObj: {
					id: '',
					text: ''
				}
			});
		}
	}

	removeMetaDetails(index) {
		const { metafields } = this.state;
		const newMetafields = metafields.slice();
		newMetafields.splice(index, 1);
		this.setState({
			metafields: newMetafields
		});
	}

	slugify = string => {
		const response = string
			.replace(/ +(?= )/g, ' ') // replaces double spaces to single
			.replace(/\s+/g, '-') // replaces single space to -
			.replace(/\./g, '-') // replaces full stop(.) to -
			.replace(/&/g, '-') // replaces & sign to -
			.replace(/\?/g, '-') // replaces question mark (?) to -
			.replace(/,/g, '-') // replaces comma to -
			.toLowerCase(); // transforms string to lower case
		return response
			.replace(/-+(?=-)/g, '') // replaces double dash (--) to single
			.replace(/-\s*$/, ''); // replaces last dash to no space
	};

	formSubmit = e => {
		e.preventDefault();
		const { name, subtitle, productTypeId, categoryId } = this.state;

		const errors = {};
		if (!name) {
			errors.name = "can't be empty";
		}
		if (subtitle === '') {
			errors.subtitle = "can't be empty";
		}
		if (!categoryId) {
			errors.categoryId = 'please select a category';
		}
		if (!productTypeId) {
			errors.productTypeId = 'please select product type';
		}

		this.setState({ errors });

		const isValid = Object.keys(errors).length === 0;

		if (isValid) {
			this.setState({ isDesignerOpen: true });
		} else if (!errors.productId) {
			window.scroll(0, 0);
		}
	};

	onDesignerSave(e) {
		this.savePodProduct(e.detail[0]);
	}

	savePodProduct(podProductMetadata) {
		const { onCreate } = this.props;

		const {
			name,
			slug,
			subtitle,
			description,
			categoryId,
			hashtags,
			metafields
		} = this.state;

		const productDetails = {
			name,
			slug,
			subtitle,
			description,
			categoryId,
			hashtags,
			metafields: metafields.filter(meta => meta.id && meta.text)
		};

		onCreate(this.buildPodProductData(productDetails, podProductMetadata));
	}

	buildPodProductData(productDetails, podProductMetadata) {
		const { sizes, price, colorOptionsMetadata } = podProductMetadata;

		return {
			productDetails: {
				...productDetails,
				price
			},
			podData: {
				sizes,
				colors: colorOptionsMetadata.map(({ color, pictures }) => ({
					color,
					pictures
				})),
				PODmetadata: colorOptionsMetadata[0].PODmetadata
			}
		};
	}

	// eslint-disable-next-line no-nested-ternary
	ifExists = (obj, key) => (obj ? (obj[key] ? obj[key] : null) : null);

	setProductTypeId = productTypeId => {
		this.setState({ productTypeId });
		const { errors } = this.state;
		delete errors.productTypeId;
		this.setState({ productTypeId, errors });
	};
}
