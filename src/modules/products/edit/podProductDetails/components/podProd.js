import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Paper } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import style from './style.css';
import messages from 'lib/text';

export function TabPanel(props) {
	const { children, value, index } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`wrapped-tabpanel-${index}`}
			aria-labelledby={`wrapped-tab-${index}`}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired
};

function a11yProps(index) {
	return {
		id: `wrapped-tab-${index}`,
		'aria-controls': `wrapped-tabpanel-${index}`
	};
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper
	}
}));

export default function PODTabs(props) {
	const classes = useStyles();
	let { data, host } = props;
	const [value, setValue] = React.useState(0);
	let $tags = null,
		$tagTable = null,
		$stageNames = [],
		$stageLayerTables = [],
		$stageTabs = null,
		$stageTabPanes = null;
	if (data && data.tags && data.tags.length > 0) {
		$tags = data.tags.map((item, index) => {
			return (
				<TableRow key={`${index}`}>
					<TableCell component="th" scope="row">
						{item.type ? item.type : null}
					</TableCell>
					<TableCell align="left">{item.name ? item.name : null}</TableCell>
					<TableCell align="left">
						{item.imageURL ? (
							<img
								src={`${host}/${item.imageURL}`}
								style={{ width: '60px', height: '60px', objectFit: 'cover' }}
								alt="TagImage"
							/>
						) : null}
					</TableCell>
				</TableRow>
			);
		});
		$tagTable = (
			<Table className="mb-5 mt-2">
				<TableHead>
					<TableRow>
						<TableCell className="p-0 pl-2">Type</TableCell>
						<TableCell className="p-0 pl-2" align="left">
							Name
						</TableCell>
						<TableCell className="p-0 pl-2" align="left">
							Image
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>{$tags}</TableBody>
			</Table>
		);
	}
	if (data && data.stages && data.stages.length > 0) {
		data.stages.forEach((item, index) => {
			let $layers = null,
				$layerTable = null;
			if (item && item.layers && item.layers.length > 0) {
				$layers = item.layers.map((layer, layerIndex) => {
					return (
						<TableRow key={layerIndex}>
							<TableCell component="th" scope="row">
								{layer.order ? layer.order : null}
							</TableCell>
							<TableCell align="left">{layer.top ? layer.top : null}</TableCell>
							<TableCell align="left">
								{layer.left ? layer.left : null}
							</TableCell>
							<TableCell align="left">
								{layer.artworkURL ? (
									<img
										src={`${host}/${layer.artworkURL}`}
										style={{
											width: '60px',
											height: '60px',
											objectFit: 'cover'
										}}
										alt="ArtWorkUrl"
									/>
								) : layer.text && layer.text.text ? (
									layer.text.text
								) : null}
							</TableCell>
						</TableRow>
					);
				});
				$layerTable = (
					<Table className="mb-5 mt-2">
						<TableHead>
							<TableRow>
								<TableCell className="p-0 pl-2">Order</TableCell>
								<TableCell className="p-0 pl-2" align="left">
									Top
								</TableCell>
								<TableCell className="p-0 pl-2" align="left">
									Left
								</TableCell>
								<TableCell className="p-0 pl-2" align="left">
									Artwork/Text
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{$layers}</TableBody>
					</Table>
				);
				$stageNames.push(item.name ? item.name : `STAGE ${index + 1}`);
				$stageLayerTables.push($layerTable);
			}
		});
		if ($stageNames.length === $stageLayerTables.length && $stageNames.length) {
			$stageTabs = $stageNames.map(name => (
				<Tab label={name} wrapped {...a11yProps(value)} />
			));
			$stageTabPanes = $stageLayerTables.map((table, idx) => (
				<TabPanel value={value} index={idx + 1}>
					{table}
				</TabPanel>
			));
		}
	}
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<div>
			{data ? (
				<div className={classes.root}>
					<Paper square className="paper-box" zDepth={0}>
						<div className={style.innerBox}>
							<div className="edit-product-section-title">
								{messages.printOnDemandDetails}
							</div>
							<Tabs
								value={value}
								onChange={handleChange}
								indicatorColor="primary"
								textColor="primary"
								variant="scrollable"
								className={style.customTabs}
								scrollButtons="auto"
								aria-label="wrapped label tabs example"
							>
								<Tab label="Tags" wrapped {...a11yProps(value)} />
								{$stageTabs}
							</Tabs>
							<TabPanel value={value} index={0}>
								{$tagTable}
							</TabPanel>
							{$stageTabPanes}
						</div>
					</Paper>
				</div>
			) : (
				<Fragment></Fragment>
			)}
		</div>
	);
}
