import React, { Component } from 'react';
import Subheader from 'material-ui/Subheader';
import messages from 'lib/text';
import FontIcon from 'material-ui/FontIcon';
import style from './style.css';
import { TextField } from 'material-ui';
import ProductsHead from 'modules/products/listHead/index';
import Searchinput from './search-input';

export default class ListHead extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false
		};
	}

	handleClick = () => {
		this.setState({ open: !this.state.open });
	};

	render() {
		const { onCreate, setSearch, selected, onPodProductCreate } = this.props;

		return (
			<Subheader className={style.subheader}>
				<div className="d-flex">
					{/* <div className="col-md-7 col--no-gutter">
				<h1 className={style.listHeadH1}>Product List</h1>
				<span className={style.listdropdown}>
					Show:
					<select style={{ marginLeft: '10px' }}>
						<option style={{ border: '0px', outline: '0px' }}>
							All Products
						</option>
					</select>
				</span>
			</div>
			<div className="col-md-2">
				<span className={`${style.listdropdown2} ${style.card}`}>
					Sort by:
					<select className={style.select2}>
						<option style={{ border: '0px', outline: '0px' }}>Default</option>
					</select>
				</span>
			</div>
			<div className="col-md-1">
				<span>
					<FontIcon className="material-icons">filter_list</FontIcon>
				</span>
			</div>
			<div className="col-md-2">
				<span className={`${style.listdropdown} ${style.actiondropdown}`}>
					<select style={{ marginLeft: '10px' }}>
						<option style={{ border: '0px', outline: '0px' }}>Action</option>
					</select>
				</span>
			</div> */}
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
									onChange={setSearch}
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
									alt="search icon"
								/>
							</span>
						</div>
						{/* <div className={style.searchbox}>
					<input type="text" placeholder="Search by Name, Brand, Variant etc…" onchange={(e, input) => { setSearch.bind(e, input) }} />
					<FontIcon color="#92929D" className="material-icons">
						search
					</FontIcon>
				</div> */}
					</div>
					<div className="col">
						<div className={style.dropdowngroupcontainer}>
							<button
								type="button"
								className={style.addnewbtn}
								onClick={this.handleClick}
							>
								Create Product
								<FontIcon color="#fff" className="material-icons">
									arrow_drop_down
								</FontIcon>
							</button>
							<div
								className={
									style.dropdowngrouplist +
									' ' +
									(this.state.open ? style.opened : '')
								}
							>
								<button
									type="button"
									className={style.dropdownButton}
									onClick={onCreate}
								>
									{/*<FontIcon color="#fff" className="material-icons">
										add
									</FontIcon>*/}
									Base product
								</button>
								<button
									type="button"
									className={style.dropdownButton}
									onClick={onPodProductCreate}
								>
									{/*<FontIcon color="#fff" className="material-icons">
										add
									</FontIcon>*/}
									Print on Demand
								</button>
							</div>
						</div>
					</div>
					<div>
						<ProductsHead />
					</div>
				</div>
			</Subheader>
		);
	}
}
