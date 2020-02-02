/* eslint-disable camelcase */
'use strict';
const {promises: fs} = require('fs');
const path = require('path');
const execa = require('execa');
const findUp = require('find-up');
const plist = require('plist');
const tempfile = require('tempfile');
const Conf = require('conf');
const CacheConf = require('cache-conf');
const env = require('./lib/env');
const {AlfyTestError} = require('./lib/error');
const mainFile = require('./lib/main-file');

module.exports = options => {
	options = {
		...options,
		workflow_data: tempfile(),
		workflow_cache: tempfile()
	};

	const alfyTest = async (...input) => {
		const filePath = await findUp('info.plist');
		const directory = path.dirname(filePath);
		const info = plist.parse(await fs.readFile(filePath, 'utf8'));

		// Detect executable file
		let file = path.join(directory, mainFile(info));
		file = path.relative(process.cwd(), file);

		const {stdout} = await execa('run-node', [file, ...input], {
			env: env(info, options),
			preferLocal: true,
			localDir: __dirname
		});

		try {
			return JSON.parse(stdout).items;
		} catch (_) {
			throw new AlfyTestError('Could not parse result as JSON', stdout);
		}
	};

	alfyTest.config = new Conf({
		cwd: options.workflow_data
	});

	alfyTest.cache = new CacheConf({
		configName: 'cache',
		cwd: options.workflow_cache
	});

	return alfyTest;
};
