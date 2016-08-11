# alfy-test [![Build Status](https://travis-ci.org/SamVerschueren/alfy-test.svg?branch=master)](https://travis-ci.org/SamVerschueren/alfy-test)

> Test your [Alfy](https://github.com/sindresorhus/alfy) workflows


## Install

```
$ npm install --save alfy-test
```


## Usage

```js
import test from 'ava';
import alfyTest from 'alfy-test';

test(() => {
	const result = await alfyTest('workflow input');

	t.deepEqual(result, [
		{
			title: 'foo',
			subtitle: 'bar'
		}
	]);
});
```


## API

### alfyTest(...input)

Returns a `Promise` that returns the `items` of the workflow.

#### input

Type: `string[]`

Workflow input.


## Examples

- [alfred-ng2](https://github.com/SamVerschueren/alfred-ng2) - Search for Angular 2 API references


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
