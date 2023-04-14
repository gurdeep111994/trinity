import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import { TextField } from 'material-ui';
import style from '../../styles/style.css';

export default class Sitemap extends React.PureComponent {
	static get propTypes() {
		return {
			onLoad: PropTypes.func.isRequired,
			// eslint-disable-next-line react/forbid-prop-types
			sitemap: PropTypes.array.isRequired
		};
	}

	state = {
		filteredSitemap: [],
		sitemapSearchVal: ''
	};

	componentDidMount() {
		const { onLoad } = this.props;
		onLoad();
	}

	// eslint-disable-next-line no-unused-vars
	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({ filteredSitemap: nextProps.sitemap });
	}

	filterSitemap = event => {
		let { filteredSitemap } = this.state;
		const { sitemap } = this.props;
		const searchedItem = event.target.value;
		this.setState({ sitemapSearchVal: event.target.value });
		if (event.target.value === '') {
			this.setState({ filteredSitemap: sitemap });
		} else {
			filteredSitemap = filteredSitemap.filter(
				item =>
					item.path.toLowerCase().indexOf(searchedItem.toLowerCase()) !== -1
			);
			this.setState({ filteredSitemap });
		}
	};

	render() {
		const { filteredSitemap, sitemapSearchVal } = this.state;

		filteredSitemap.sort((a, b) => {
			const textA = a.path.substr(1).toLowerCase();
			const textB = b.path.substr(1).toLowerCase();
			// eslint-disable-next-line no-nested-ternary
			return textA < textB ? -1 : textA > textB ? 1 : 0;
		});

		const listItems = filteredSitemap.map(item => (
			<div className="pagelistItem" key={item.path}>
				<ListItem className={style.sitemapList}>
					<div className="row">
						<div className="col-xs-8">
							<p>{item.path}</p>
						</div>
						<div className="col-xs-4">
							<p>{item.type}</p>
							<p>
								{item.page_type && item.page_type === 'pagebuilder'
									? 'pagebuilder'
									: ''}
							</p>
						</div>
					</div>
				</ListItem>
			</div>
		));

		return (
			<div className={style.sitemapContent}>
				<div className={style.sitemapSearch}>
					<TextField
						id="sitemapSearchInput"
						underlineShow={false}
						className="searchField"
						onChange={this.filterSitemap}
						value={sitemapSearchVal}
						placeholder="Type to search"
						hintStyle={{
							color: '#92929D',
							textIndent: '16px',
							fontSize: '14px',
							fontFamily: 'Poppins, sans-serif',
							fontWeight: 400,
							bottom: '8px'
						}}
						inputStyle={{
							color: '#44444F',
							backgroundColor: '#ffffff',
							borderRadius: '10px',
							textIndent: '16px',
							border: '1px solid #E2E2EA',
							height: '38px',
							fontSize: '14px',
							fontFamily: 'Poppins, sans-serif',
							fontWeight: 400,
							marginTop: '6px'
						}}
					/>
				</div>
				<List>{listItems}</List>
				{filteredSitemap && filteredSitemap.length === 0 ? (
					<p style={{ marginTop: '20px' }}>No items available</p>
				) : (
					''
				)}
			</div>
		);
	}
}
