import React from 'react';
import messages from 'lib/text';

import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import style from './style.css';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	},
	nested: {
		paddingLeft: theme.spacing(4)
	},
	goBackContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		marginBottom: 100
	},
	goBackBtn: {
		color: '#fff',
		width: '165px',
		border: '1px solid #0F978B',
		borderRadius: '10px',
		background: '#0F978B',
		textDecoration: 'none',
		display: 'inline-flex',
		fontSize: '14px',
		fontFamily: `'Poppins', sans-serif`,
		letterSpacing: '0.1px',
		justifyContent: 'center',
		height: '38px',
		alignItems: 'center',
		marginTop: '4rem'
	},
	goBackText: {
		textAlign: 'center',
		letterSpacing: '0.1px',
		color: '#0F978B'
	}
}));

const bookingMenuItems = [
	{
		title: 'Dining',
		icon: 'restaurant',
		iconType: '-outlined',
		children: [
			{
				title: 'Dashboard',
				url: '/bookings/dashboard',
				icon: 'icon-dashboard'
			},
			{
				title: 'Bookings',
				url: '/bookings/bookings',
				icon: 'icon-assignments-outline'
			},
			{
				title: 'Requests',
				url: '/bookings/requests',
				icon: 'icon-assignments-outline'
			},
			{
				title: 'Restaurants',
				url: '/bookings/restaurants',
				icon: 'icon-sales'
			},
			{
				title: 'Tables',
				url: '/bookings/tables',
				icon: 'toc',
				iconType: '-outlined'
			},
			{
				title: 'Slots',
				url: '/bookings/time-slots',
				icon: 'icon-bar-chart'
			}
		]
	},
	{
		title: 'Active',
		icon: 'fitness_center',
		iconType: '-outlined',
		children: [
			{
				title: 'Dashboard',
				url: '/active/dashboard',
				icon: 'icon-dashboard'
			},
			{
				title: 'Booking',
				url: '/active/booking',
				icon: 'icon-assignments-outline'
			},
			{
				title: 'Classes',
				url: '/active/classes',
				icon: 'class',
				iconType: 'icon-outlined'
			},
			{
				title: 'Requests',
				url: '/active/requests',
				icon: 'class',
				iconType: '-outlined'
			}
		]
	},
	{
		title: 'Spa',
		icon: 'spa',
		iconType: '-outlined',
		access: 'common',
		children: [
			{
				title: 'Dashboard',
				access: 'common',
				url: '/spa/dashboard',
				icon: 'icon-dashboard'
			},
			{
				access: 'common',
				title: 'Booking',
				url: '/spa/booking',
				icon: 'icon-assignments-outline'
			},
			{
				access: 'common',
				title: 'Treatments',
				url: '/spa/treatment',
				icon: 'spa',
				iconType: '-outlined'
			}
		]
	}
];
const menuItems = [
	{
		title: messages.myTrinity,
		url: '/mytrinity',
		icon: 'icon-dashboard'
	},
	// {
	// 	title: messages.drawer_home,
	// 	url: '/',
	// 	icon: 'home'
	// },

	{
		title: messages.drawer_products,
		url: '/products',
		icon: 'icon-t-shirt'
	},
	{
		title: messages.drawer_orders,
		url: '/orders',
		icon: 'icon-assignments-outline'
	},
	{
		title: messages.drawer_customers,
		url: '/customers',
		icon: 'icon-friends'
	},
	// {
	// 	title: messages.settings_pages,
	// 	url: '/pages',
	// 	icon: 'pages',
	// 	iconType: '-outlined'
	// },
	// {
	// 	title: messages.files,
	// 	url: '/files',
	// 	icon: 'icon-assignments-outline'
	// },
	{
		title: 'Main Navigation',
		url: '/navigation',
		icon: 'explore',
		iconType: '-outlined'
	},
	{
		title: 'Analytics',
		url: '/',
		icon: 'icon-bar-chart',
		iconType: '-outlined'
	},
	// {
	// 	title: messages.drawer_settings,
	// 	url: '/settings',
	// 	icon: 'icon-settings'
	// },
	// {
	// 	title: messages.apps,
	// 	url: '/apps',
	// 	icon: 'icon-card-view'
	// },
	// {
	// 	title: messages.settings_pages,
	// 	url: '/pages',
	// 	icon: 'description'
	// },
	// {
	// 	title: messages.files,
	// 	url: '/files',
	// 	icon: 'folder'
	// },
	// {
	// 	title: '-',
	// 	url: 'settings'
	// },
	// {
	// 	title: messages.drawer_settings,
	// 	url: '/settings',
	// 	icon: 'settings'
	// },
	// {
	// 	title: messages.apps,
	// 	url: '/apps',
	// 	icon: 'apps'
	// },
	// {
	// 	title: messages.marketing,
	// 	url: '/marketing',
	// 	icon: 'icon-goal'
	// },
	// {
	// 	title: messages.discount,
	// 	url: '/discount',
	// 	icon: 'icon-percentage'
	// },
	{
		title: '-'
	},
	{
		title: 'Apps',
		url: '/',
		icon: 'icon-card-view',
		children: [
			{
				title: 'Bookings',
				url: '/bookings/dashboard'
				// icon: 'icon-assignments-outline'
			},
			{
				title: 'Product Designer',
				url: '/pod-product'
				// url: '/product-designer'
				// icon: 'format_paint',
				// iconType: '-outlined'
			}
			// {
			// 	title: 'Reviews System',
			// 	url: '/#'
			// 	// icon: 'rate_review',
			// 	// iconType: '-outlined'
			// }
		]
	},
	{
		title: 'Online Store',
		url: '/',
		icon: 'icon-sales',
		children: [
			{
				title: messages.drawer_settings,
				url: '/settings'
				// icon: 'icon-settings'
			},
			// {
			// 	title: 'Configuration',
			// 	url: '/',
			// 	// icon: 'settings_ethernet',
			// 	// iconType: '-outlined',
			// 	children: [
			// 		{
			// 			title: 'Theme',
			// 			url: '/'
			// 		},
			// 		{
			// 			title: 'Currency',
			// 			url: '/'
			// 		},
			// 		{
			// 			title: 'Language',
			// 			url: '/'
			// 		},
			// 		{
			// 			title: 'Payments',
			// 			url: '/'
			// 		},
			// 		{
			// 			title: 'Shipping',
			// 			url: '/'
			// 		}
			// 	]
			// },
			{
				title: 'Visual Merchandiser',
				access: 'trinity',
				url: '/vmerchandiser'
			},
			{
				title: 'Page Builder',
				access: 'trinity',
				url: '/page-builder'
				// icon: 'layers',
				// iconType: '-outlined'
			}
			// {
			// 	title: 'Blog',
			// 	url: '/blog'
			// icon: 'eco',
			// iconType: '-outlined'
			// }
		]
	}
	// {
	// 	title: messages.drawer_logout,
	// 	url: '/logout',
	// 	icon: 'icon-sales'
	// }
	/*
	Supports children nav (drop down lists)
	Example:
	{
		title: "Children Example",
		icon: 'view_agenda',
		children: [
			{
				title: "child 1",
				url: '/child1',
				icon: 'view_agenda'
			},
			{
				title: "child 2",
				url: '/child2',
				icon: 'calendar_today'
			},
		]
	} */
];

const NavListItem = ({ currentUrl, item, subItem, onClick, isChild }) => {
	const classes = useStyles();
	const isCustom = name => (name.startsWith('icon-') ? false : true);
	return (
		<Link
			to={item.url}
			className={item.url === currentUrl ? style.linkActive : style.link}
		>
			<ListItem
				button
				onClick={onClick}
				className={`${subItem ? style.subItemInnerDiv : style.itemInnerDiv}  ${
					isChild ? style.subItemInnerDivPadding : ''
				}`}
			>
				{item.icon ? (
					<ListItemIcon className={style.icon}>
						<Icon
							className={
								item.url === currentUrl ? style.iconActive : style.icon
							}
						>
							{isCustom(item.icon) ? (
								<i
									className={`material-icons${
										item.iconType ? item.iconType : ''
									}`}
								>
									{item.icon}
								</i>
							) : (
								<span className={item.icon} />
							)}
						</Icon>
					</ListItemIcon>
				) : null}
				<ListItemText
					primary={item.title}
					className={style.item}
					classes={{
						primary: style.listItemText
					}}
				/>
			</ListItem>
		</Link>
	);
};

const SubNavListItem = ({ currentUrl, item, onClick, isChild }) => {
	const urlSelected = item.children.some(i => i.url === currentUrl);
	const isCustom = name => (name.startsWith('icon-') ? false : true);
	const [open, setOpen] = React.useState(
		currentUrl == '/' ? false : urlSelected
	);

	function subMenuClick() {
		setOpen(!open);
	}

	return (
		<div>
			<ListItem
				button
				onClick={subMenuClick}
				className={`${style.itemInnerDiv} ${
					isChild ? style.itemInnerDivPadding : ''
				} ${item.icon ? '' : style.listItemPaddingLeft}`}
			>
				{item.icon && (
					<ListItemIcon className={style.icon}>
						{isCustom(item.icon) ? (
							<i
								className={`material-icons${
									item.iconType ? item.iconType : ''
								}`}
							>
								{item.icon}
							</i>
						) : (
							<span className={item.icon} />
						)}
					</ListItemIcon>
				)}

				<ListItemText
					classes={{
						primary: style.listItemText
					}}
					primary={item.title}
					className={style.item}
				/>

				{open ? (
					<ExpandLess className={style.expandIcon} />
				) : (
					<ExpandMore className={style.expandIcon} />
				)}
			</ListItem>
			<SubNavList
				currentUrl={currentUrl}
				items={item.children}
				open={open}
				isChild={isChild}
				onClick={onClick}
			/>
		</div>
	);
};

const SubNavList = ({ currentUrl, items, onClick, open, isChild }) => (
	<Collapse in={open} unmountOnExit>
		<List component="div" disablePadding>
			{items.map((item, index) => {
				if (item.children && item.children.length > 0) {
					return (
						<SubNavListItem
							key={item.title + index}
							currentUrl={currentUrl}
							item={item}
							isChild={true}
							onClick={onClick}
						/>
					);
				} else {
					return (
						<NavListItem
							key={item.title + index}
							currentUrl={currentUrl}
							item={item}
							isChild={isChild}
							subItem
							onClick={onClick}
						/>
					);
				}
			})}
		</List>
	</Collapse>
);

const DrawerMenu = ({ open, onClose, currentUrl }) => {
	const styles = useStyles();
	const isBooking =
		currentUrl.includes('bookings') ||
		currentUrl.includes('active') ||
		currentUrl.includes('spa');
	const menu = isBooking ? bookingMenuItems : menuItems;
	const items = menu.map((item, index) => {
		if (item.children) {
			return (
				<SubNavListItem
					key={index}
					currentUrl={currentUrl}
					item={item}
					onClick={onClose}
				/>
			);
		}
		if (item.title === '-') {
			return (
				<h3 key={index} className={style.menuTitle + ' ' + style.menuTitle2}>
					OTHER
				</h3>
			);
		}
		return (
			<NavListItem
				key={index}
				currentUrl={currentUrl}
				item={item}
				onClick={onClose}
			/>
		);
	});

	return (
		<Drawer
			width="250px"
			anchor="left"
			className={style.drawer}
			variant="permanent"
			// open={open}
			PaperProps={{
				classes: {
					root: style.drawerPaper
				}
			}}
		>
			<List component="nav" className="menu">
				<h3 className={style.menuTitle}>Dashboard</h3>
				{items}
			</List>
			{isBooking ? (
				<div className={styles.goBackContainer}>
					<Link to="/" className={styles.goBackBtn}>
						<ArrowBackIosOutlinedIcon style={{ width: '14px' }} /> &nbsp; Back
						to Trinity
					</Link>
				</div>
			) : null}
		</Drawer>
	);
};

export default DrawerMenu;
