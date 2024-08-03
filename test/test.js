/* eslint-disable camelcase */
import process from 'node:process';
import test, {afterEach} from 'ava';
import {AlfyTestError} from '../lib/error.js';
import makeAlfyTest from '../index.js';

const directory = process.cwd();

afterEach(() => {
	process.chdir(directory);
});

test('result', async t => {
	process.chdir('test/fixtures/default');

	const alfyTest = makeAlfyTest();

	t.deepEqual(await alfyTest('bar'), [
		{
			title: 'Foo',
			subtitle: 'bar',
		},
	]);
});

test('different filename', async t => {
	process.chdir('test/fixtures/main');

	const alfyTest = makeAlfyTest();

	t.deepEqual(await alfyTest('bar'), [
		{
			title: 'Foo',
			subtitle: 'bar',
		},
	]);
});

test('cache', async t => {
	process.chdir('test/fixtures/cache');

	const alfyTest = makeAlfyTest();

	t.deepEqual(await alfyTest('foo'), [
		{
			title: 'foo',
			subtitle: 'bar',
		},
	]);

	t.is(alfyTest.config.get('foo'), 'bar');
});

test('environment variables', async t => {
	process.chdir('test/fixtures/default');

	const alfyTest = makeAlfyTest({
		version: '2.0.0',
		theme: 'foobar',
		theme_background: 'rgba(0,0,0,1)',
		theme_selection: 'rgba(255,255,255,1)',
		theme_subtext: '0',
	});

	const returnValue = await alfyTest('Bar', '--env');

	t.deepEqual(returnValue[0], {
		title: 'Foo',
		subtitle: 'Bar',
	});

	delete returnValue[1].env.alfred_workflow_cache;
	delete returnValue[1].env.alfred_workflow_data;

	t.deepEqual(returnValue[1], {
		title: 'Env',
		env: {
			alfred_theme_background: 'rgba(0,0,0,1)',
			alfred_preferences_localhash: '',
			alfred_version: '2.0.0',
			alfred_preferences: '',
			alfred_theme_selection_background: 'rgba(255,255,255,1)',
			alfred_bundleId: 'com.samverschueren.ng2',
			alfred_theme_subtext: '0',
			alfred_debug: '1',
			alfred_workflow_version: '0.3.2',
			alfred_uid: 'alfred-ng2',
			alfred_workflow_name: 'ng2',
			alfred_theme: 'foobar',
		},
	});
});

test('non-json result', async t => {
	process.chdir('test/fixtures/non-json');

	const alfyTest = makeAlfyTest();

	await t.throwsAsync(alfyTest('bar'), {
		instanceOf: AlfyTestError,
		message: 'Could not parse result as JSON',
	});
});

test('user config', async t => {
	process.chdir('test/fixtures/user-config');

	const helloAlfyTest = makeAlfyTest({
		userConfig: {
			title: 'hello',
		},
	});

	t.deepEqual(await helloAlfyTest('foo'), [
		{
			title: 'hello',
		},
	]);

	const worldAlfyTest = makeAlfyTest({
		userConfig: {
			title: 'world',
		},
	});

	t.deepEqual(await worldAlfyTest('foo'), [
		{
			title: 'world',
		},
	]);
});
