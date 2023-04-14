import React from 'react';
import PropTypes from 'prop-types';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

export default class ProductTypesCarousel extends React.PureComponent {
	static get propTypes() {
		return {
			productTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
			setProductTypeId: PropTypes.func.isRequired,
			externalAssetsHost: PropTypes.string.isRequired
		};
	}

	state = {
		mouseTrackingEnabled: true,
		preventEventOnTouchMove: true,
		currentTarget: null
	};

	responsive = {
		0: { items: 1 },
		600: { items: 2 },
		960: { items: 2 },
		1024: { items: 3 },
		1260: { items: 4 },
		1440: { items: 5 }
	};

	setProductType = (e, productTypeId) => {
		const { setProductTypeId } = this.props;
		const { currentTarget } = this.state;

		e.target.parentElement.parentElement.classList.add('activeCard');
		if (currentTarget !== null && e.target !== currentTarget) {
			currentTarget.parentElement.parentElement.classList.remove('activeCard');
			this.setState({
				currentTarget
			});
		}

		this.setState({
			currentTarget: e.target
		});

		setProductTypeId(productTypeId);
	};

	productTypeCard(productType, key) {
		const { externalAssetsHost } = this.props;
		const {
			_id: productTypeId,
			name,
			thumbnailUrl,
			colors,
			sizes
		} = productType;

		return (
			<div key={key} className="card-wrapper">
				<Card key={key} className="custom-card">
					<CardMedia
						onClick={e => {
							this.setProductType(e, productTypeId);
						}}
						className="gallery-media"
						image={`${externalAssetsHost}/${thumbnailUrl}`}
						title={name}
						style={{ cursor: 'pointer' }}
					/>
					<span className="subTitle" style={{ fontSize: '17px' }}>
						{name}
					</span>
					<div className="pro-properties">
						<div className="pro-color">
							<h6>Colours</h6>
							<div className="colors-box">
								{colors.map(({ value: colorCode }) => (
									<span
										key={colorCode}
										className="color-box"
										style={{ background: `${colorCode}` }}
									/>
								))}
							</div>
							<span className="dot-span">
								{colors.length > 4 ? '...' : null}
							</span>
						</div>
						<div className="pro-size">
							<h6>Sizes</h6>
							<p>
								{sizes.map(({ label: size }) => (
									<span key={size}>{size} </span>
								))}
							</p>
						</div>
					</div>
				</Card>
			</div>
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.productTypes != this.props.productTypes;
	}

	render() {
		const { mouseTrackingEnabled, preventEventOnTouchMove } = this.state;
		const { productTypes } = this.props;

		const galleryItems = productTypes.length
			? productTypes.map((productType, index) =>
					this.productTypeCard(productType, index)
			  )
			: [];

		return (
			<div className="app" id="app">
				<div
					style={{
						fontSize: '18px',
						color: '#171725',
						fontFamily: 'Poppins, sans-serif',
						fontWeight: '600',
						marginBottom: '20px'
					}}
				>
					Select Product Type
				</div>

				<AliceCarousel
					items={galleryItems}
					preventEventOnTouchMove={preventEventOnTouchMove}
					mouseTrackingEnabled={mouseTrackingEnabled}
					responsive={this.responsive}
					infinite={false}
					autoHeight
				/>
			</div>
		);
	}
}
