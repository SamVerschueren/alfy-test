'use strict';
const fs = require('fs');
const path = require('path');
const execa = require('execa');
const findUp = require('find-up');
const pify = require('pify');
const plist = require('plist');
const env = require('./lib/env');
const mainFile = require('./lib/main-file');

const fsP = pify(fs);

module.exports = function () {
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

			const options = {
				env: env(info)
			};

			return execa.stdout('run-node', [file].concat(input), options)
				.then(res => JSON.parse(res).items);
		});
};
