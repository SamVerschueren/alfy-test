/* eslint-disable camelcase, import/no-anonymous-default-export, unicorn/no-anonymous-default-export */
import process from 'node:process';
import fs from 'node:fs';
import path from 'node:path';
import execa from 'execa';
import findUp from 'find-up';
import {parse} from 'plist';
import * as tempy from 'tempy';
import Conf from 'conf';
import CacheConf from 'cache-conf';
import env from './lib/env.js';
import {AlfyTestError} from './lib/error.js';
import mainFile from './lib/main-file.js';

const __dirname = import.meta.dirname;

export default options => {
	options = {
		...options,
		workflow_data: tempy.directory(),
		workflow_cache: tempy.directory(),
	};

	if (options.userConfig) {
		fs.writeFileSync(
			path.join(options.workflow_data, 'user-config.json'),
			JSON.stringify(options.userConfig),
			'utf8',
		);
	}

	const alfyTest = async (...input) => {
		const filePath = await findUp('info.plist');
		const directory = path.dirname(filePath);
		const info = parse(await fs.promises.readFile(filePath, 'utf8'));

		// Detect executable file
		let file = path.join(directory, mainFile(info));
		file = path.relative(process.cwd(), file);

		const {stdout} = await execa('run-node', [file, ...input], {
			env: env(info, options),
			preferLocal: true,
			localDir: __dirname,
		});

		try {
			return JSON.parse(stdout).items;
		} catch {
			throw new AlfyTestError('Could not parse result as JSON', stdout);
		}
	};

	alfyTest.config = new Conf({
		cwd: options.workflow_data,
	});

	alfyTest.cache = new CacheConf({
		configName: 'cache',
		cwd: options.workflow_cache,
	});

	return alfyTest;
};
