import React from 'react';
import { Link } from 'react-router-dom';
import ImageUpload from 'modules/shared/imageUpload';
import Paper from 'material-ui/Paper';

import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';

export default class FavIconSettingsForm extends React.Component {
	componentDidMount() {
		this.props.onLoad();
	}

	render() {
		const { onImageUpload, onImageDelete, settings } = this.props;
		const imageUrl = settings && settings.brandImage ? settings.brandImage : '';

		return (
			<Paper className="paper-box" zDepth={1}>
				<Link to="/settings">
					<IconButton>
						<FontIcon color="#92929D" className="material-icons">
							keyboard_arrow_left
						</FontIcon>
					</IconButton>
				</Link>
				<div style={{ padding: 30 }}>
					<ImageUpload
						uploading={false}
						imageUrl={imageUrl}
						onDelete={onImageDelete}
						onUpload={onImageUpload}
					/>
				</div>
			</Paper>
		);
	}
}
