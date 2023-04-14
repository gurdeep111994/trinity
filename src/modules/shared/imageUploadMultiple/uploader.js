import React from 'react';
import Dropzone from 'react-dropzone';
import messages from 'lib/text';

import Snackbar from 'material-ui/Snackbar';
import Button from '@material-ui/core/Button';
import style from './style.css';

export default class MultiUploader extends React.Component {
	onDrop = files => {
		const form = new FormData();
		files.map(file => {
			form.append('file', file);
		});
		this.props.onUpload(form);
	};

	render() {
		const { uploading } = this.props;

		return (
			<div>
				<Dropzone
					onDrop={this.onDrop}
					multiple
					disableClick
					accept="image/*"
					ref={node => {
						this.dropzone = node;
					}}
					style={{}}
					className={style.dropzone}
					activeClassName={style.dropzoneActive}
					rejectClassName={style.dropzoneReject}
				>
					{this.props.children}
					{!this.props.children && (
						<div className={style.dropzoneEmpty}>{messages.help_dropHere}</div>
					)}
				</Dropzone>

				{!uploading && (
					<Button
						style={{ marginLeft: 20, marginTop: 10 }}
						onClick={() => {
							this.dropzone.open();
						}}
						variant="contained"
						className={style.btnCreate}
					>
						{messages.chooseImage}
					</Button>
				)}

				<Snackbar open={uploading} message={messages.messages_uploading} />
			</div>
		);
	}
}
