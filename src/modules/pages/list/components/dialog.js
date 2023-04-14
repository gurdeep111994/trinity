import React from 'react';
import EditForm from './editForm';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DeleteConfirmation from 'modules/shared/deleteConfirmation';
import IconButton from 'material-ui/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import messages from 'lib/text';
import FontIcon from 'material-ui/FontIcon';
import CloseIcon from '@material-ui/icons/Close';
export default class MatDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openDelete: false
		};
	}
	openDelete = () => {
		this.setState({ openDelete: true });
	};

	closeDelete = () => {
		this.setState({ openDelete: false });
	};

	deletePage = () => {
		this.setState({ openDelete: false });
		this.props.onDelete(this.props.page.id);
	};
	render() {
		const { page, pageId, open, closeModal, onSubmit } = this.props;
		const pageName =
			page && page.meta_title && page.meta_title.length > 0
				? page.meta_title
				: 'Draft';
		let $data = null;
		if (page && !page.is_system) {
			$data = (
				<DialogTitle
					id="customized-dialog-title"
					onClose={closeModal}
					className="popupBox"
				>
					{/* <IconButton onClick={closeModal}>
                    <FontIcon color="#000" className="material-icons">
                        keyboard_arrow_left
						</FontIcon>
                </IconButton> */}
					<CloseIcon
						style={{ position: 'absolute', right: '15px' }}
						onClick={closeModal}
						className="closeBtn"
					></CloseIcon>
					<span className="simple-modal-title">Edit Page </span>
					<IconButton
						touch
						style={{ padding: 0 }}
						tooltip={messages.actions_delete}
						onClick={this.openDelete}
					>
						{/* <FontIcon color="#000" className="material-icons">
                        delete
                        
						</FontIcon> */}
						<img src={'/assets/images/trash.svg'} alt="" />
					</IconButton>
					{page.enabled && (
						<a href={page.url} target="_blank">
							<IconButton touch tooltip={messages.viewOnWebsite}>
								{/* <FontIcon color="#000" className="material-icons">
                                open_in_new
								</FontIcon> */}
								<img src={'/assets/images/linkicon.svg'} alt="" />
							</IconButton>
						</a>
					)}
					<DeleteConfirmation
						open={this.state.openDelete}
						isSingle
						itemsCount={1}
						itemName={pageName}
						onCancel={this.closeDelete}
						onDelete={this.deletePage}
					/>
				</DialogTitle>
			);
		} else {
			$data = (
				<DialogTitle id="customized-dialog-title" onClose={closeModal}>
					<div style={{ display: 'flex' }}>
						<span className="simple-modal-title">Edit Page </span>
						<CloseIcon
							style={{ position: 'absolute', right: '15px' }}
							onClick={closeModal}
							className="closeBtn"
						></CloseIcon>
					</div>
				</DialogTitle>
			);
		}
		return (
			<Dialog
				title={messages.order}
				modal={false}
				className="customModal"
				open={open}
				onRequestClose={closeModal}
				autoScrollBodyContent
				contentStyle={{ width: 600 }}
				onBackdropClick={closeModal}
			>
				{$data}
				<DialogContent>
					<EditForm initialValues={page} pageId={pageId} onSubmit={onSubmit} />
				</DialogContent>
			</Dialog>
		);
	}
}
