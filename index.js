/* eslint-disable camelcase */
'use strict';
const fs = require('fs');
const path = require('path');
const execa = require('execa');
const findUp = require('find-up');
const plist = require('plist');
const tempy = require('tempy');
const Conf = require('conf');
const CacheConf = require('cache-conf');
const env = require('./lib/env');
const {AlfyTestError} = require('./lib/error');
const mainFile = require('./lib/main-file');

const fsP = fs.promises;

module.exports = options => {
	options = {
		...options,
		workflow_data: tempy.directory(),
		workflow_cache: tempy.directory()
	};

	if (options.userConfig) {
		fs.writeFileSync(path.join(options.workflow_data, 'user-config.json'), JSON.stringify(options.userConfig), 'utf8');
	}

	const alfyTest = async (...input) => {
		const filePath = await findUp('info.plist');
		const directory = path.dirname(filePath);
		const info = plist.parse(await fsP.readFile(filePath, 'utf8'));

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
