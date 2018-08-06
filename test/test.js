/* eslint-disable camelcase */
import test from 'ava';
import fn from '..';

const dir = process.cwd();

test.afterEach(() => {
	process.chdir(dir);
});

test('result', async t => {
	process.chdir('test/fixtures/default');

	const alfyTest = fn();

	t.deepEqual(await alfyTest('bar'), [
		{
			title: 'Foo',
			subtitle: 'bar'
		}
	]);
});

test('different filename', async t => {
	process.chdir('test/fixtures/main');

	const alfyTest = fn();

	t.deepEqual(await alfyTest('bar'), [
		{
			title: 'Foo',
			subtitle: 'bar'
		}
	]);
});

test('cache', async t => {
	process.chdir('test/fixtures/cache');

	const alfyTest = fn();

	t.deepEqual(await alfyTest('foo'), [
		{
			title: 'foo',
			subtitle: 'bar'
		}
	]);

	t.is(alfyTest.config.get('foo'), 'bar');
});

test('environment variables', async t => {
	process.chdir('test/fixtures/default');

	const alfyTest = fn({
		version: '2.0.0',
		theme: 'foobar',
		theme_background: 'rgba(0,0,0,1)',
		theme_selection: 'rgba(255,255,255,1)',
		theme_subtext: '0'
	});

	const ret = await alfyTest('Bar', '--env');

	t.deepEqual(ret[0], {
		title: 'Foo',
		subtitle: 'Bar'
	});

	delete ret[1].env.alfred_workflow_cache;
	delete ret[1].env.alfred_workflow_data;

	t.deepEqual(ret[1], {
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
			alfred_theme: 'foobar'
		}
	});
});
