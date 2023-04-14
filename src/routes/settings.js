import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import messages from 'lib/text';

import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

import General from 'modules/settings/general';
import Domains from 'modules/settings/domains';
import GeneralLogo from 'modules/settings/generalLogo';
import FavIcon from 'modules/settings/favIcon';
import Theme from 'modules/settings/theme';
import Pages from 'modules/settings/pages';
import Sitemap from 'modules/sitemap/page';
import Shipping from 'modules/settings/shipping';
import ShippingEdit from 'modules/settings/shippingEdit';
import Payments from 'modules/settings/payments';
import PaymentsEdit from 'modules/settings/paymentsEdit';
import Tokens from 'modules/settings/tokens/list';
import TokensEdit from 'modules/settings/tokens/edit';
import Email from 'modules/settings/email';
import Import from 'modules/settings/import';
import GoogleSpredsheet from 'modules/settings/googlespreadsheet';
import Smtp from 'modules/settings/smtp';
import EmailTemplate from 'modules/settings/emailTemplates';
import Checkout from 'modules/settings/checkout';
import CheckoutFields from 'modules/settings/checkoutFields';
import Redirects from 'modules/settings/redirects/list';
import RedirectsEdit from 'modules/settings/redirects/edit';
import Webhooks from 'modules/settings/webhooks/list';
import WebhooksEdit from 'modules/settings/webhooks/edit';
import BrandImage from 'modules/settings/brandImage';

const styles = {
	link: {
		color: 'inherit',
		textDecoration: 'none',
		fontWeight: 'inherit',
		display: 'block'
	},
	linkActive: {
		backgroundColor: 'rgba(0,0,0,0.1)'
	}
};

const SettingsMenu = () => (
	<div>
		<h1>Store Settings</h1>
		<List>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings"
				exact
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_general}
					leftIcon={
						<FontIcon className="material-icons gear-icon">settings</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/domains"
				exact
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_domains}
					leftIcon={
						<FontIcon className="material-icons gear-icon">domains</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/shipping"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_shipping}
					leftIcon={
						<FontIcon className="material-icons listicon ">
							local_shipping
						</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/payments"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_payments}
					leftIcon={
						<FontIcon className="material-icons listicon">payment</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/theme"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_theme}
					leftIcon={
						<FontIcon className="material-icons listicon">palette</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/pages"
			>
				<ListItem
					className="treeItem"
					primaryText={'Pages'}
					leftIcon={
						<FontIcon className="material-icons listicon">description</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/sitemap"
			>
				<ListItem
					className="treeItem"
					primaryText="Sitemap"
					leftIcon={
						<FontIcon className="material-icons listicon">description</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/checkout"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_checkout}
					leftIcon={
						<FontIcon className="material-icons listicon">
							shopping_cart
						</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/email"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_emails}
					leftIcon={
						<FontIcon className="material-icons listicon">email</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/import"
				exact={true}
			>
				<ListItem
					className="treeItem"
					primaryText={messages.drawer_importing}
					leftIcon={
						<FontIcon className="material-icons listicon">get_app</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/redirects"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.redirects}
					leftIcon={
						<FontIcon className="material-icons listicon">swap_calls</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/webhooks"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.webhooks}
					leftIcon={
						<FontIcon className="material-icons listicon">http</FontIcon>
					}
				/>
			</NavLink>
			<NavLink
				style={styles.link}
				activeStyle={styles.linkActive}
				to="/settings/tokens"
			>
				<ListItem
					className="treeItem"
					primaryText={messages.settings_tokens}
					leftIcon={
						<FontIcon className="material-icons listicon">vpn_key</FontIcon>
					}
				/>
			</NavLink>
			{/* <NavLink style={styles.link} activeStyle={styles.linkActive} to="/settings/taxes"><ListItem primaryText={messages.settings_taxes} leftIcon={<FontIcon className="material-icons">attach_money</FontIcon>}/></NavLink>
    <NavLink style={styles.link} activeStyle={styles.linkActive} to="/settings/security"><ListItem primaryText={messages.settings_security} leftIcon={<FontIcon className="material-icons">security</FontIcon>}/></NavLink> */}
		</List>
	</div>
);

const Settings = ({ match }) => (
	<div className="row products-box setting-box">
		<div className="sidebar">
			<SettingsMenu />
		</div>
		<div className="content-area ">
			<div className="product-list">
				<Switch>
					<Route path="/settings" exact component={General} />
					<Route path="/settings/domains" exact component={Domains} />
					<Route path="/settings/general/logo" component={GeneralLogo} />
					<Route path="/settings/general/favicon" component={FavIcon} />
					<Route path="/settings/theme" component={Theme} />
					<Route path="/settings/pages" component={Pages} />
					<Route path="/settings/sitemap" component={Sitemap} />
					<Route path="/settings/shipping" exact component={Shipping} />
					<Route path="/settings/shipping/add" exact component={ShippingEdit} />
					<Route path="/settings/shipping/:methodId" component={ShippingEdit} />
					<Route path="/settings/payments" exact component={Payments} />
					<Route path="/settings/payments/add" exact component={PaymentsEdit} />
					<Route path="/settings/payments/:methodId" component={PaymentsEdit} />
					<Route path="/settings/tokens" exact component={Tokens} />
					<Route path="/settings/tokens/add" exact component={TokensEdit} />
					<Route path="/settings/tokens/:tokenId" component={TokensEdit} />
					<Route path="/settings/email" exact component={Email} />
					<Route path="/settings/email/smtp" component={Smtp} />
					<Route
						path="/settings/email/templates/:templateName"
						component={EmailTemplate}
					/>
					<Route path="/settings/import" exact component={Import} />
					<Route
						path="/settings/import/googlespreadsheet"
						exact
						component={GoogleSpredsheet}
					/>
					<Route path="/settings/checkout" exact component={Checkout} />
					<Route
						path="/settings/checkout/fields/:fieldName"
						component={CheckoutFields}
					/>
					<Route path="/settings/redirects" exact component={Redirects} />
					<Route
						path="/settings/redirects/add"
						exact
						component={RedirectsEdit}
					/>
					<Route
						path="/settings/redirects/:redirectId"
						component={RedirectsEdit}
					/>
					<Route path="/settings/webhooks" exact component={Webhooks} />
					<Route path="/settings/webhooks/add" exact component={WebhooksEdit} />
					<Route
						path="/settings/webhooks/:webhookId"
						component={WebhooksEdit}
					/>
					<Route path="/settings/general/brandimage" component={BrandImage} />
				</Switch>
			</div>
		</div>
	</div>
);

export default Settings;
