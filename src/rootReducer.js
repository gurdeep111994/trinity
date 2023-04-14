import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import productCategories from 'modules/productCategories/reducer';
import products from 'modules/products/reducer';
import customerGroups from 'modules/customerGroups/reducer';
import customers from 'modules/customers/reducer';
import orders from 'modules/orders/reducer';
import orderStatuses from 'modules/orderStatuses/reducer';
import pages from 'modules/pages/reducer';
import settings from 'modules/settings/reducer';
import apps from 'modules/apps/reducer';
import files from 'modules/files/reducer';
import booking from 'modules/booking/reducer';
import loader from 'modules/loader/reducer';
import newBooking from 'modules/new-booking/reducer';
import active from 'modules/active/reducer';
import spa from 'modules/spa/reducer';
import productDesigner from 'modules/productDesigner/reducer';
import pageBuilder from 'modules/pageBuilder/reducer';
import sitemap from 'modules/sitemap/reducer';

export default combineReducers({
	form: formReducer,
	productCategories,
	products,
	settings,
	customerGroups,
	customers,
	orders,
	orderStatuses,
	pages,
	apps,
	files,
	booking,
	loader,
	newBooking,
	spa,
	active,
	productDesigner,
	pageBuilder,
	sitemap
});
