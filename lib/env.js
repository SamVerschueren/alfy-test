/* eslint-disable camelcase, import/no-anonymous-default-export, unicorn/no-anonymous-default-export */

export default (info, options) => ({
	alfred_workflow_name: info.name,
	alfred_workflow_version: info.version,
	alfred_uid: `alfred-${info.name}`,
	alfred_bundleId: info.bundleid,
	alfred_version: options.version || '3.0.3',
	alfred_theme: options.theme || 'theme.urlimport.153A3C58-B2D9-4F08-B342-B0BF7F6E8DE9',
	alfred_theme_background: options.theme_background || 'rgba(252,254,255,0.85)',
	alfred_theme_selection_background: options.theme_selection || 'rgba(255,255,255,0.26)',
	alfred_theme_subtext: options.theme_subtext || '0',
	alfred_workflow_data: options.workflow_data,
	alfred_workflow_cache: options.workflow_cache,
	alfred_preferences: '',
	alfred_preferences_localhash: '',
	alfred_debug: '1',
});
