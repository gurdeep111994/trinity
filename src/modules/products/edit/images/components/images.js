import React from 'react';
import messages from 'lib/text';
import Gallery from 'modules/shared/imageUploadMultiple';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Button from '@material-ui/core/Button';
import style from './style.css';

export default class ProductImages extends React.Component {
	constructor(props) {
		super(props);
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
		this.props.onImageUpdate(this.state.imageData);
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
			images,
			onImageDelete,
			onImageSort,
			onImageUpload,
			uploadingImages
		} = this.props;
		const { openEdit, imageData } = this.state;
		const alt = imageData ? imageData.alt : '';

		const dialogButtons = [
			<Button
				onClick={this.closeEdit}
				style={{ marginRight: 10 }}
				variant="outlined"
			>
				{messages.cancel}
			</Button>,
			<Button keyboardFocused onClick={this.handleEditSave} variant="contained">
				{messages.save}
			</Button>
		];

		return (
			<Paper className="paper-box" zDepth={0}>
				<div className={style.innerBox}>
					<div className="edit-product-section-title">{messages.images}</div>
				</div>
				<div style={{ padding: '10px 10px 30px 10px' }}>
					<Gallery
						productId={productId}
						images={images}
						onImageDelete={onImageDelete}
						onImageSort={onImageSort}
						onImageUpload={onImageUpload}
						uploading={uploadingImages}
						onImageEdit={this.handleEditOpen}
					/>
					<Dialog
						contentStyle={{ maxWidth: 540 }}
						title={messages.edit}
						actions={dialogButtons}
						className="customModal"
						modal={false}
						open={openEdit}
						onRequestClose={this.closeEdit}
						autoScrollBodyContent={false}
					>
						<TextField
							floatingLabelText={messages.alt}
							fullWidth
							value={alt}
							onChange={this.handleAltChange}
						/>
					</Dialog>
				</div>
			</Paper>
		);
	}
}
