import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Head from 'modules/head';
import Header from 'modules/header';
import Login from 'routes/login';
import Home from 'routes/home';
import NotFound from 'routes/notFound';
import Products from 'routes/products';
import ProductImport from 'routes/products/import';
import ProductDetails from 'routes/products/edit';
import ProductCategories from 'routes/products/categories';
import Customers from 'routes/customers';
import CustomerDetails from 'routes/customers/edit';
import CustomerGroups from 'routes/customers/groups';
import Orders from 'routes/orders';
import OrderDetails from 'routes/orders/edit';
import OrderStatuses from 'routes/orders/statuses';
import Pages from 'routes/pages';
import Settings from 'routes/settings';
import Apps from 'routes/apps';
import Files from 'routes/files';
import Navigation from 'routes/navigation';
import PageBuilder from 'routes/pageBuilder';
import ProductDesigner from 'routes/productDesigner';
import VisualMerchandiser from 'routes/visualMerchandiser';

import {
	blue700,
	pinkA200,
	grey100,
	white,
	darkBlack,
	fullBlack
} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Spinner from './modules/spinner/index';
import NewBookingRoutes from './routes/new-booking';
import ActiveRoutes from './routes/active';
import SpaRoutes from './routes/spa';
import 'react-toastify/dist/ReactToastify.css';

const muiTheme = getMuiTheme({
	fontFamily: 'Roboto, sans-serif',
	palette: {
		primary1Color: '#009C8F',
		primary2Color: '#00978B',
		primary3Color: '#00BEA3',
		accent1Color: pinkA200,
		accent2Color: grey100,
		accent3Color: blue700,
		textColor: darkBlack,
		alternateTextColor: white,
		canvasColor: white,
		borderColor: '#004C61',
		pickerHeaderColor: '#009C8F',
		shadowColor: fullBlack
	},
	appBar: {
		color: 'transparent'
	},
	toggle: {
		thumbOffColor: '#D3D3D3',
		trackOffColor: '#E4E4EA'
	}
});

const App = () => (
	<Router>
		<MuiThemeProvider muiTheme={muiTheme}>
			<div id="container">
				<div id="headContainer">
					<Head />
				</div>

				<div id="bodyContainer" className="currentPage">
					<ToastContainer
						position="bottom-right"
						autoClose={5000}
						hideProgressBar={false}
						newestOnTop
						closeOnClick
						rtl={false}
						pauseOnVisibilityChange
						draggable
						pauseOnHover
						style={{ minWidth: '400px' }}
					/>
					<Header />
					<Spinner />
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/login" component={Login} />
						<Route path="/products" exact component={Products} />
						<Route path="/pod-product" exact component={ProductDesigner} />
						<Route path="/products/import" component={ProductImport} />
						<Route
							path="/products/categories"
							exact
							component={ProductCategories}
						/>
						<Route path="/orders" exact component={Orders} />
						<Route path="/orders/statuses" exact component={OrderStatuses} />
						<Route path="/order/:orderId" exact component={OrderDetails} />
						<Route path="/customers" exact component={Customers} />
						<Route path="/customers/groups" exact component={CustomerGroups} />
						<Route
							path="/customer/:customerId"
							exact
							component={CustomerDetails}
						/>
						<Route path="/product/:productId" component={ProductDetails} />
						<Route path="/pages" exact component={Pages} />
						<Route path="/settings" component={Settings} />
						<Route path="/apps" component={Apps} />
						<Route path="/files" exact component={Files} />
						<Route path="/bookings" component={NewBookingRoutes} />
						<Route path="/navigation" exact component={Navigation} />
						<Route path="/page-builder" exact component={PageBuilder} />
						<Route path="/active" component={ActiveRoutes} />
						<Route path="/spa" component={SpaRoutes} />
						<Route path="/vmerchandiser" component={VisualMerchandiser} />
						<Route component={NotFound} />
					</Switch>
				</div>
			</div>
		</MuiThemeProvider>
	</Router>
);
export default App;
