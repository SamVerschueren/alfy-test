import test from 'ava';
import fn from '../';

const dir = process.cwd();

test.afterEach(() => {
	process.chdir(dir);
});

test('result', async t => {
	process.chdir('./fixtures/default');

	t.deepEqual(await fn('bar'), {
		items: [
			{
				title: 'Foo',
				subtitle: 'bar'
			}
		]
	});
});

test('different filename', async t => {
	process.chdir('./fixtures/main');

	t.deepEqual(await fn('bar'), {
		items: [
			{
				title: 'Foo',
				subtitle: 'bar'
			}
		]
	});
});
