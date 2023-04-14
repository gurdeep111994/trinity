import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import messages from 'lib/text';
import Gallery from 'modules/shared/imageUploadMultiple';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import ProductImages from 'modules/products/edit/images';
import style from './style.css';
import EditDialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';

class VariantImages extends React.Component {
	constructor() {
		super();
		this.state = {
			openEdit: false,
			imageData: null
		};
	}

	closeEdit = () => {
		this.setState({ openEdit: false });
	};

	openEdit = () => {
		this.setState({ openEdit: true });
	};

	handleEditOpen = image => {
		this.setState({ imageData: image });
		this.openEdit();
	};

	handleEditSave = () => {
		this.props.onImageUpdate(
			this.props.productId,
			this.props.variantId,
			this.state.imageData
		);
		this.closeEdit();
	};

	handleAltChange = (event, value) => {
		const newImageData = Object.assign({}, this.state.imageData, {
			alt: value
		});
		this.setState({ imageData: newImageData });
	};

	render() {
		const {
			productId,
			onImageUpload,
			uploadingImages,
			onImageDelete,
			images,
			variantId,
			open,
			togglePopup
		} = this.props;
		const { openEdit, imageData } = this.state;
		const alt = imageData ? imageData.alt : '';
		const onImageSort = () => {};
		return (
			<div>
				{images && images.length > 0 ? null : (
					<Fragment>
						<FontIcon
							style={{ fontSize: 30, color: '#cccccc' }}
							className="material-icons"
							onClick={() => {
								togglePopup(!open);
							}}
						>
							photo_camera
						</FontIcon>
					</Fragment>
				)}
				<Dialog
					contentStyle={{ maxWidth: 540 }}
					className="customModal"
					open={openEdit}
				>
					<DialogTitle id="alert-dialog-title">{messages.edit}</DialogTitle>
					<DialogContent>
						<TextField
							floatingLabelText={messages.alt}
							fullWidth
							value={alt}
							onChange={this.handleAltChange}
						/>
						<Button
							onClick={this.closeEdit}
							style={{ marginRight: 10 }}
							variant="outlined"
						>
							{messages.cancel}
						</Button>
						<Button
							keyboardFocused
							onClick={this.handleEditSave}
							variant="contained"
						>
							{messages.save}
						</Button>
					</DialogContent>
				</Dialog>

				<Dialog
					open={open}
					onClose={() => {
						togglePopup(!open);
					}}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{'Upload variant image'}
					</DialogTitle>
					<DialogContent>
						<Paper className="paper-box" zDepth={0}>
							<div className={style.innerBox}>
								<div className="edit-product-section-title">
									{messages.images}
								</div>
							</div>
							<div style={{ padding: '10px 10px 30px 10px' }}>
								<Gallery
									productId={productId}
									images={images}
									onImageDelete={(productId, imageId) => {
										onImageDelete(productId, variantId, imageId);
									}}
									onImageSort={onImageSort}
									onImageUpload={form => {
										onImageUpload(productId, variantId, form);
									}}
									uploading={uploadingImages}
									onImageEdit={this.handleEditOpen}
								/>
							</div>
						</Paper>
					</DialogContent>
					<DialogActions>
						{/* <Button onClick={()=>{ this.togglePopup() }} color="primary">
                  Upload
                </Button> */}
						<Button
							onClick={() => {
								togglePopup(!open);
							}}
							color="primary"
							autoFocus
						>
							{messages.close}
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default VariantImages;
