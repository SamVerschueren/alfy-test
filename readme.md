# alfy-test [![Build Status](https://travis-ci.org/SamVerschueren/alfy-test.svg?branch=master)](https://travis-ci.org/SamVerschueren/alfy-test)

> Test your [Alfy](https://github.com/sindresorhus/alfy) workflows


## Install

```
$ npm install --save alfy-test
```


## Usage

```js
import test from 'ava';
import fn from 'alfy-test';

test(() => {
	const result = await fn('workflow input');

	t.deepEqual(result, {
		items: [
			{
				title: 'foo',
				subtitle: 'bar'
			}
		]
	});
});
```


## API

### alfy(...input)

#### input

Type: `string[]`

Workflow input.


## License

MIT © [Sam Verschueren](https://github.com/SamVerschueren)
