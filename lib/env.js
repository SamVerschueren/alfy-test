/* eslint-disable camelcase */
'use strict';
const tempfile = require('tempfile');

module.exports = info => ({
	alfred_workflow_name: info.name,
	alfred_workflow_version: info.version,
	alfred_uid: `alfred-${info.name}`,
	alfred_bundleId: info.bundleid,
	alfred_version: process.env.alfred_version || '3.0.3',
	alfred_theme: process.env.alfred_theme || 'theme.urlimport.153A3C58-B2D9-4F08-B342-B0BF7F6E8DE9',
	alfred_theme_background: 'rgba(252,254,255,0.85)',
	alfred_theme_selection_background: 'rgba(255,255,255,0.26)',
	alfred_theme_subtext: '0',
	alfred_workflow_data: tempfile(),
	alfred_workflow_cache: tempfile(),
	alfred_preferences: '',
	alfred_preferences_localhash: '',
	alfred_debug: '1'
});
