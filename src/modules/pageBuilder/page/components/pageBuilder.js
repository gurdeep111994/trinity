import '@ivfuture/theme-builder/dist/css/style.css';
import '@ivfuture/theme-luxury/dist/css/style.css';

import React from 'react';
import { ThemeContext, ThemeModel, ThemeMode } from '@ivfuture/theme-core';
import { LuxuryTheme } from '@ivfuture/theme-luxury';
import { observer } from 'mobx-react';
import { pageBuilderApi, getEnv } from 'lib/settings';
import PropTypes from 'prop-types';

const {
	BuilderWrapper,
	PreviewWrapper,
	ApolloApp,
	setupModal,
	Store,
	loadPages,
	setApolloClient
} = require('@ivfuture/theme-builder');
setupModal('#app');
setApolloClient(getEnv(pageBuilderApi));
Store.main.linksDisabled = true;

const builderSettings = {
	injectedProps: {
		algoliaAppId: 'B3Q4ZBV3QG',
		algoliaAdminKey: '91a14dabec5820dcaf93142978ecae6e',
		externalResourcesHost: 'http://minio.ivfuture.tk',
		externalResourcesPort: '9000'
	},
	schemaValues: {
		plpIndex: {
			allowedValues: []
		}
	}
};

class PageBuilder extends React.Component {
	static get propTypes() {
		return {
			onLoad: PropTypes.func.isRequired,
			fetchStoreIndexes: PropTypes.func.isRequired,
			// eslint-disable-next-line react/forbid-prop-types
			settings: PropTypes.object.isRequired,
			// eslint-disable-next-line react/forbid-prop-types
			storeIndexes: PropTypes.array.isRequired
		};
	}

	componentDidMount() {
		const { onLoad, fetchStoreIndexes } = this.props;
		onLoad();
		fetchStoreIndexes();
		loadPages();
	}

	render() {
		const {
			storeIndexes,
			settings: { algoliaIndex }
		} = this.props;

		builderSettings.schemaValues.plpIndex.allowedValues = storeIndexes;
		builderSettings.injectedProps.defaultPlpIndex = `${algoliaIndex}_ALL`;

		return (
			<div className="pagebuilder-container">
				<div className="pagebuilder">
					<ApolloApp>
						<ThemeContext.Provider
							value={
								new ThemeModel(
									LuxuryTheme,
									Store.main.isPreviewMode
										? ThemeMode.RENDER_ONLY
										: ThemeMode.BUILDER
								)
							}
						>
							{Store.main.isPreviewMode ? (
								<PreviewWrapper />
							) : (
								<BuilderWrapper
									context={ThemeContext}
									settings={builderSettings}
								/>
							)}
						</ThemeContext.Provider>
					</ApolloApp>
				</div>
			</div>
		);
	}
}
export default observer(PageBuilder);
