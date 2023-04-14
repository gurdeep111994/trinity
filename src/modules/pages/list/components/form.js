import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import { List, ListItem } from 'material-ui/List';
import Dialog from './dialog';
import style from './style.css';
import { TextField } from 'redux-form-material-ui';

const PageItem = ({ page, openModal }) => {
	const tags = page.tags && page.tags.length > 0 ? page.tags.join(', ') : '';
	const openId = () => {
		openModal(page.id);
	};
	return (
		<div className="pagelistItem" onClick={openId}>
			<ListItem
				rightIcon={<img src="/assets/images/apps/editgrey.svg" />}
				leftIcon={
					page.is_system ? (
						<FontIcon
							className="material-icons"
							color="#92929D"
							style={{ fontSize: '16px' }}
						>
							lock_outline
						</FontIcon>
					) : null
				}
				style={!page.enabled ? { color: 'rgba(0, 0, 0, 0.3)' } : {}}
				primaryText={
					<div className="row">
						<div className="col-xs-7 pageMetaTitle">{page.meta_title}</div>
						<div
							className="col-xs-4"
							style={{ color: 'rgba(0, 0, 0, 0.4)', textAlign: 'right' }}
						>
							{tags}
						</div>
						<div className="col-xs-1"></div>
					</div>
				}
			/>
		</div>
	);
};

export default class PagesList extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}
	openAddModal = () => {
		this.props.openModal();
	};
	render() {
		const { pages, openModal } = this.props;

		const listItems = pages.map((item, index) => (
			<PageItem key={index} page={item} openModal={openModal} />
		));

		return (
			<div className="row products-box setting-box">
				{/*<div className="sidebar">*/}
				{/*	<h1>Pages</h1>*/}
				{/*</div>*/}
				<div className="content-area" style={{ width: '100%' }}>
					<div className="product-list">
						<Dialog {...this.props} />
						<span>
							<div className="d-flex">
								<div className="col-100">
									<div className={style.searchbox}>
										<form
											onSubmit={(event, val) => {
												setSearch(
													event,
													document.getElementById('productSearchInput').value
												);
												event.preventDefault();
											}}
										>
											<TextField
												id="productSearchInput"
												underlineShow={false}
												className="searchField"
												placeholder="Search by Name, Brand, Variant etc…"
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
													backgroundColor: 'rgba(255,255,255,0.2)',
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
										</form>
										<span>
											{' '}
											<img
												src="/assets/images/apps/search-icon.svg"
												style={{ width: '20px' }}
											/>
										</span>
									</div>
								</div>
								<div className="col">
									<span>
										<div
											className={style.addnewbtn}
											onClick={this.openAddModal}
										>
											<FontIcon color="#fff" className="material-icons">
												add
											</FontIcon>
											Add New Page
										</div>
									</span>
								</div>
							</div>
						</span>
						<Paper className="paper-box" zDepth={1}>
							<div style={{ width: '100%' }}>
								<List style={{ padding: 0 }}>{listItems}</List>
							</div>
						</Paper>
					</div>
				</div>
			</div>
		);
	}
}
