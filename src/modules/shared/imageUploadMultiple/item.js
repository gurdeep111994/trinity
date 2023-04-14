import React from 'react';
import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import style from './style.css';

const GalleryItem = ({ url, alt, id, onDelete, onImageEdit }) => (
	<Paper zDepth={1} rounded={false} className="customImgUploader">
		<div className={style.preview}>
			<img src={url} title={alt} />
		</div>
		<div className={style.footer}>
			<IconButton
				touch
				tooltip={messages.edit}
				tooltipPosition="top-right"
				onClick={onImageEdit}
			>
				<img
					src={'/assets/images/apps/editgrey.svg'}
					alt=""
					style={{ width: '19px' }}
				/>
			</IconButton>
			<IconButton
				touch
				tooltip={messages.actions_delete}
				tooltipPosition="top-right"
				onClick={() => {
					onDelete(id);
				}}
			>
				<img
					src={'/assets/images/apps/rdelete.svg'}
					alt=""
					style={{ width: '19px' }}
				/>
			</IconButton>
		</div>
	</Paper>
);

export default GalleryItem;
