/* eslint-disable camelcase */
'use strict';
const fs = require('fs');
const path = require('path');
const execa = require('execa');
const findUp = require('find-up');
const pify = require('pify');
const plist = require('plist');
const tempfile = require('tempfile');
const Conf = require('conf');
const env = require('./lib/env');
const mainFile = require('./lib/main-file');

const fsP = pify(fs);

module.exports = options => {
	const opts = Object.assign({}, options, {
		workflow_data: tempfile(),
		workflow_cache: tempfile()
	});

	const alfyTest = function () {
		const input = Array.from(arguments);

		let dir;

		return findUp('info.plist')
			.then(filePath => {
				dir = path.dirname(filePath);

				return fsP.readFile(filePath, 'utf8');
			})
			.then(info => {
				info = plist.parse(info);

				// Detect executable file
				let file = path.join(dir, mainFile(info));
				file = path.relative(process.cwd(), file);

				return execa.stdout('run-node', [file].concat(input), {env: env(info, opts)})
					.then(res => JSON.parse(res).items);
			});
	};

	alfyTest.config = new Conf({
		cwd: opts.workflow_data
	});

	alfyTest.cache = new Conf({
		configName: 'cache',
		cwd: opts.workflow_cache
	});

	return alfyTest;
};
