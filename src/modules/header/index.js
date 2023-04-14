import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import messages from 'lib/text';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import style from './header.css';
import { deleteCurrentProduct } from '../products/actions';
import DeleteConfirmation from 'modules/shared/deleteConfirmation';
import { connect } from 'react-redux';
class Header extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openDelete: false
		};
	}
	openDelete = () => {
		this.setState({ openDelete: true });
	};

	closeDelete = () => {
		this.setState({ openDelete: false });
	};

	handleDelete = () => {
		this.closeDelete();
		this.props.onDelete();
	};
	render() {
		const { product } = this.props;
		const productName =
			product && product.name && product.name.length > 0
				? product.name
				: 'Draft';
		const { pathname } = this.props.location;
		const pathNameLength = pathname.split('/').length;
		return pathname.startsWith('/product/') && pathNameLength === 3 ? (
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
					<Typography variant="h5" gutterBottom className={style.editHeadText}>
						{messages.products_titleCreate}
					</Typography>
				</Grid>

				<Grid item xs={4} className={style.alignRight}>
					<IconButton
						touch
						tooltip={messages.actions_delete}
						onClick={this.openDelete}
					>
						<img src={'/assets/images/trash.svg'} alt="" />
						{/* <FontIcon color="#FC5A5A" className="material-icons">
							delete
						</FontIcon> */}
					</IconButton>
					{/* <IconButton touch tooltip={messages.edit}>
						<FontIcon
							key="draft"
							style={{ color: 'rgba(0, 0, 0, 0.1)' }}
							className="material-icons"
						>
							edit
						</FontIcon>
					</IconButton> */}
				</Grid>
				<DeleteConfirmation
					open={this.state.openDelete}
					isSingle
					itemsCount={1}
					itemName={productName}
					onCancel={this.closeDelete}
					onDelete={this.handleDelete}
				/>
			</Grid>
		) : (
			''
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	product: state.products.editProduct
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	onDelete: () => {
		dispatch(deleteCurrentProduct());
		ownProps.history.push('/products');
	}
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
