import React from 'react';

import messages from 'lib/text';

import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import Button from '@material-ui/core/Button';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import DynamicEditControl from './dynamicEditControl';
import style from './style.css';

const ArrayEditor = ({
	label,
	properties,
	fields,
	meta: { touched, error, submitFailed }
}) => (
	<div>
		<div className={style.arrayTitle}>
			{label}
			<FloatingActionButton
				mini
				primary
				onClick={() => fields.push({})}
				style={{ marginLeft: '20px' }}
			>
				<FontIcon className="material-icons">add</FontIcon>
			</FloatingActionButton>
		</div>

		<ol style={{ listStyle: 'none' }}>
			{fields.map((field, index) => (
				<li key={index}>
					<Paper
						style={{ margin: '20px 0 20px 20px', backgroundColor: '#f7f7f7' }}
						zDepth={1}
					>
						<div className={style.arrayItemHead}>
							<Button
								color="primary"
								onClick={() => fields.remove(index)}
								style={{ marginRight: '10px' }}
							>
								{messages.actions_delete}
							</Button>

							{index > 0 && (
								<Button
									variant="outlined"
									onClick={() => fields.move(index, index - 1)}
									style={{ marginRight: '10px' }}
								>
									{messages.actions_moveUp}
								</Button>
							)}

							{index + 1 < fields.length && (
								<Button
									variant="contained"
									onClick={() => fields.move(index, index + 1)}
									style={{ marginRight: '10px' }}
								>
									{messages.actions_moveDown}
								</Button>
							)}
						</div>

						<div className={style.arrayInnerBox}>
							{properties.map((property, propertyIndex) => {
								const fieldName = `${field}.${property.key}`;
								return (
									<div>
										<DynamicEditControl
											key={propertyIndex}
											type={property.type}
											fieldName={fieldName}
											label={property.label}
											options={property.options}
											properties={property.properties}
										/>
									</div>
								);
							})}
						</div>
					</Paper>
				</li>
			))}
		</ol>
	</div>
);

export default ArrayEditor;
