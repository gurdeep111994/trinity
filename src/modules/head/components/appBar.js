import React from 'react';
import { Link } from 'react-router-dom';

import messages from 'lib/text';
import ProductCategoryHead from 'modules/productCategories/head/index';
import CustomerGroupHead from 'modules/customerGroups/head/index';
import CustomersHead from 'modules/customers/listHead/index';
import CustomerHead from 'modules/customers/editHead/index';
import ProductsHead from 'modules/products/listHead/index';
import ProductHead from 'modules/products/editHead/index';
import OrdersHead from 'modules/orders/listHead/index';
import OrderHead from 'modules/orders/editHead/index';
import OrderStatusHead from 'modules/orderStatuses/head/index';
import PaymentMethodHead from 'modules/settings/paymentsEdit/head';
import PaymentMethodListHead from 'modules/settings/payments/head';
import ShippingMethodHead from 'modules/settings/shippingEdit/head';
import ShippingMethodListHead from 'modules/settings/shipping/head';
import TokenListHead from 'modules/settings/tokens/list/head';
import RedirectsListHead from 'modules/settings/redirects/list/head';
import RedirectsEditHead from 'modules/settings/redirects/edit/head';
import WebhooksListHead from 'modules/settings/webhooks/list/head';
import WebhooksEditHead from 'modules/settings/webhooks/edit/head';
import AppsHead from 'modules/apps/head';
import FileListHead from 'modules/files/list/head';
import Button from '@material-ui/core/Button';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import DrawerMenu from './drawer';
import Toolbar from 'material-ui/Toolbar';
import Grid from '@material-ui/core/Grid';
import style from './style.css';
import Typography from '@material-ui/core/Typography';
import * as auth from 'lib/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default class AppBarTop extends React.Component {
	constructor(props) {
		super(props);
		this.state = { anchorEl: null };
	}
	logout = () => {
		auth.removeAuthToken();
		this.props.keycloak.clearToken();
		auth.setKeyCloak(null);
		this.props.keycloak.logout();
	};

	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleClose = e => {
		this.setState({ anchorEl: null });
	};

	render() {
		const {
			location,
			productCategoryName,
			productsSelectedCount,
			customersSelectedCount,
			customerGroupName,
			ordersSelectedCount,
			orderStatusName,
			orderNumber,
			keycloak
		} = this.props;
		const { pathname } = location;
		const { tokenParsed } = keycloak;
		console.log(tokenParsed);
		if (pathname === '/login' || pathname === '/logout') {
			return null;
		}

		let title = messages.dashboard;
		let leftButton = (
			<IconButton onClick={this.handleToggle}>
				<FontIcon className="material-icons">menu</FontIcon>
			</IconButton>
		);
		let rightElements = null;
		{
			/* <IconButton><FontIcon color="#fff" className="material-icons">notifications</FontIcon></IconButton> */
		}

		if (pathname === '/products') {
			title = messages.products_title;

			if (productCategoryName) {
				title = (
					<span>
						{messages.products_title}
						<FontIcon
							style={{ top: 6 }}
							color="#fff"
							className="material-icons"
						>
							chevron_right
						</FontIcon>
						{productCategoryName}
					</span>
				);
			}

			if (productsSelectedCount > 0) {
				title = `${productsSelectedCount} ${messages.selected}`;
			}

			rightElements = <ProductsHead />;
		}
		if (pathname === '/products/import') {
			title = messages.drawer_importing;

			if (productCategoryName) {
				title = (
					<span>
						{messages.drawer_importing}
						<FontIcon
							style={{ top: 6 }}
							color="#fff"
							className="material-icons"
						>
							chevron_right
						</FontIcon>
						{productCategoryName}
					</span>
				);
			}

			if (productsSelectedCount > 0) {
				title = `${productsSelectedCount} ${messages.selected}`;
			}

			rightElements = <ProductsHead />;
		}
		if (pathname === '/orders') {
			title = messages.orders_title;

			if (orderStatusName) {
				title = (
					<span>
						{messages.orders_title}
						<FontIcon
							style={{ top: 6 }}
							color="#fff"
							className="material-icons"
						>
							chevron_right
						</FontIcon>
						{orderStatusName}
					</span>
				);
			}

			if (ordersSelectedCount > 0) {
				title = `${ordersSelectedCount} ${messages.selected}`;
			}

			rightElements = <OrdersHead />;
		} else if (pathname === '/orders/statuses') {
			title = orderStatusName
				? messages.editOrderStatus
				: messages.orderStatuses;
			leftButton = (
				<Link to="/orders">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <OrderStatusHead />;
		} else if (pathname.startsWith('/order/')) {
			title = orderNumber
				? `${messages.order} #${orderNumber}`
				: messages.order;
			leftButton = (
				<Link to="/orders">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <OrderHead />;
		} else if (pathname.startsWith('/customer/')) {
			title = messages.customer;
			leftButton = (
				<Link to="/customers">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <CustomerHead />;
		} else if (
			pathname.startsWith('/product/') &&
			pathname.includes('/option/')
		) {
			const productId = pathname.split('/')[3];
			title = messages.editProductOption;
			leftButton = (
				<Link to={`/product/${productId}`}>
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/product/')) {
			title = messages.products_titleEdit;
			leftButton = (
				<Link to="/products">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <ProductHead />;
		} else if (pathname === '/products/categories') {
			title = productCategoryName
				? messages.productCategories_titleEdit
				: messages.productCategories_title;
			leftButton = (
				<Link to="/products">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <ProductCategoryHead />;
		} else if (pathname === '/customers') {
			title = messages.customers_title;

			if (customerGroupName) {
				title = (
					<span>
						{messages.customers_title}
						<FontIcon
							style={{ top: 6 }}
							color="#fff"
							className="material-icons"
						>
							chevron_right
						</FontIcon>
						{customerGroupName}
					</span>
				);
			}

			if (customersSelectedCount > 0) {
				title = `${customersSelectedCount} ${messages.selected}`;
			}

			rightElements = <CustomersHead />;
		} else if (pathname === '/customers/groups') {
			title = customerGroupName
				? messages.customerGroups_titleEdit
				: messages.customerGroups_title;
			leftButton = (
				<Link to="/customers">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <CustomerGroupHead />;
		} else if (pathname === '/settings/email') {
			title = messages.settings_emailSettings;
		} else if (pathname === '/settings/email/smtp') {
			title = messages.settings_smtpSettings;
			leftButton = (
				<Link to="/settings/email">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/email/templates/order_confirmation') {
			title = messages.settings_orderConfirmation;
			leftButton = (
				<Link to="/settings/email">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/email/templates/register_doi_en') {
			title = messages.settings_customerRegistration;
			leftButton = (
				<Link to="/settings/email">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/email/templates/forgot_password_en') {
			title = messages.settings_customerRecovery;
			leftButton = (
				<Link to="/settings/email">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/theme') {
			title = messages.settings_themeSettings;
		} else if (pathname === '/settings/checkout') {
			title = messages.settings_checkoutSettings;
		} else if (pathname === '/settings/import') {
			title = messages.drawer_importing;
		} else if (pathname === '/settings/checkout/fields/email') {
			title = messages.email;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/first_name') {
			title = messages.first_name;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/last_name') {
			title = messages.last_name;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/password') {
			title = messages.password;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/password_verify') {
			title = messages.password_verify;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/address1') {
			title = messages.address1;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/address2') {
			title = messages.address2;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/postal_code') {
			title = messages.postal_code;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/mobile') {
			title = messages.mobile;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/country') {
			title = messages.country;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/state') {
			title = messages.state;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/city') {
			title = messages.city;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/checkout/fields/comments') {
			title = messages.comments;
			leftButton = (
				<Link to="/settings/checkout">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/shipping') {
			title = messages.settings_shippingMethods;
			rightElements = <ShippingMethodListHead />;
		} else if (pathname === '/settings/payments') {
			title = messages.settings_paymentsMethods;
			rightElements = <PaymentMethodListHead />;
		} else if (pathname === '/settings/shipping/add') {
			title = messages.settings_addShippingMethod;
			leftButton = (
				<Link to="/settings/shipping">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/payments/add') {
			title = messages.settings_addPaymentMethod;
			leftButton = (
				<Link to="/settings/payments">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/settings/shipping/')) {
			title = messages.settings_editShippingMethod;
			leftButton = (
				<Link to="/settings/shipping">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <ShippingMethodHead />;
		} else if (pathname.startsWith('/settings/payments/')) {
			title = messages.settings_editPaymentMethod;
			leftButton = (
				<Link to="/settings/payments">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <PaymentMethodHead />;
		} else if (pathname === '/settings/general' || pathname === '/settings') {
			title = messages.settings_generalSettings;
		} else if (pathname === '/settings/general/logo') {
			title = messages.logo;
			leftButton = (
				<Link to="/settings">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/general/favicon') {
			title = messages.logo;
			leftButton = (
				<Link to="/settings">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/general/brandimage') {
			title = messages.logo;
			leftButton = (
				<Link to="/settings">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/pages') {
			title = messages.settings_pages;
			rightElements = null;
		} else if (pathname === '/pages/add') {
			title = messages.settings_addPage;
			leftButton = (
				<Link to="/settings/pages">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/pages/')) {
			title = messages.settings_editPage;
			leftButton = (
				<Link to="/settings/pages">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = null;
		} else if (pathname === '/files') {
			title = messages.files;
			rightElements = <FileListHead />;
		} else if (pathname === '/settings/tokens') {
			title = messages.settings_tokens;
			rightElements = <TokenListHead />;
		} else if (pathname === '/settings/tokens/add') {
			title = messages.settings_addToken;
			leftButton = (
				<Link to="/settings/tokens">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/settings/tokens/')) {
			title = messages.settings_editToken;
			leftButton = (
				<Link to="/settings/tokens">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/settings/redirects') {
			title = messages.redirects;
			rightElements = <RedirectsListHead />;
		} else if (pathname === '/settings/redirects/add') {
			title = messages.redirectAdd;
			leftButton = (
				<Link to="/settings/redirects">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/settings/redirects/')) {
			title = messages.redirectEdit;
			leftButton = (
				<Link to="/settings/redirects">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <RedirectsEditHead />;
		} else if (pathname === '/settings/webhooks') {
			title = messages.webhooks;
			rightElements = <WebhooksListHead />;
		} else if (pathname === '/settings/webhooks/add') {
			title = messages.webhookAdd;
			leftButton = (
				<Link to="/settings/webhooks">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname.startsWith('/settings/webhooks/')) {
			title = messages.webhookEdit;
			leftButton = (
				<Link to="/settings/webhooks">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
			rightElements = <WebhooksEditHead />;
		} else if (pathname === '/apps') {
			title = messages.apps;
			rightElements = <AppsHead />;
		} else if (pathname === '/apps/login') {
			title = messages.loginTitle;
			rightElements = <AppsHead />;
			leftButton = (
				<Link to="/apps">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (pathname === '/apps/account') {
			title = messages.account;
			leftButton = (
				<Link to="/apps">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		} else if (
			pathname.startsWith('/apps/service/') ||
			pathname.startsWith('/apps/app/')
		) {
			title = messages.apps;
			leftButton = (
				<Link to="/apps">
					<IconButton>
						<FontIcon color="#fff" className="material-icons">
							arrow_back
						</FontIcon>
					</IconButton>
				</Link>
			);
		}
		const headerRightElements = (
			<div style={{ minWidth: '260px', paddingTop: ' 10px' }}>
				<Grid container>
					<Grid item xs={2} className="notifyBar">
						{/* <img src="/assets/images/apps/search-icon.svg" alt="" />
						<span className="notistatus">
							<img src="/assets/images/apps/bell-icon.svg" alt="" />
							<span></span>
						</span> */}
					</Grid>
					<Grid item xs={10} container>
						<Grid item xs={3}>
							<div className="imgBlock" style={{ cursor: 'pointer' }}>
								<img
									src="/assets/images/apps/profile.png"
									alt=""
									className="profile-img"
								/>
							</div>
						</Grid>
						<Grid
							item
							xs={9}
							className="profileInfo"
							style={{ alignSelf: 'center' }}
						>
							<div className="textBlock">
								<Typography variant="h5" gutterBottom>
									{tokenParsed ? tokenParsed.name : ''}
									{/* tokenParsed.given_name */}
								</Typography>
								<Typography variant="h6" gutterBottom>
									{/* tokenParsed.family_name */}
									{tokenParsed ? tokenParsed.email : ''}
								</Typography>
								<div className="dropIcon">
									<Button
										aria-controls="simple-menu"
										aria-haspopup="true"
										onClick={e => {
											this.handleClick(e);
										}}
										className="dropdown-btn"
									>
										<FontIcon className="material-icons">
											arrow_drop_down
										</FontIcon>
									</Button>
									<Menu
										id="simple-menu"
										anchorEl={this.state.anchorEl}
										keepMounted
										open={Boolean(this.state.anchorEl)}
										onClose={e => this.handleClose(e)}
									>
										<MenuItem>Profile</MenuItem>
										<MenuItem>My account</MenuItem>
										<MenuItem onClick={this.logout}>Logout</MenuItem>
									</Menu>
								</div>
							</div>
						</Grid>
					</Grid>
				</Grid>
			</div>
		);
		const headerLeftElements = (
			<div className="my-logo">
				<img src="/assets/images/apps/trinity-logo.svg" alt="" />
			</div>
		);

		return (
			<div>
				<AppBar
					className="header"
					iconElementLeft={headerLeftElements}
					iconElementRight={headerRightElements}
					position="fixed"
				/>
				{/* <AppBar
					className="appBar"
					titleStyle={{
						fontSize: 24,
						color: '#171725',
						fontFamily: '"Poppins", sans-serif',
						fontWeight: 600,
						lineHeight: '70px'
					}}
					title={title}
					iconElementLeft={leftButton}
					iconElementRight={rightElements}
					position="fixed"
					showMenuIconButton={false}
				/> */}
				<DrawerMenu
					// open={this.state.open}
					// onClose={this.handleClose}
					currentUrl={pathname}
				/>
			</div>
		);
	}
}
