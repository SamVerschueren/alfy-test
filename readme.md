# alfy-test ![CI](https://github.com/SamVerschueren/alfy-test/workflows/CI/badge.svg)

> Test your [Alfy](https://github.com/sindresorhus/alfy) workflows

## Install

```
$ npm install alfy-test
```

## Usage

```js
import test from 'ava';
import alfyTest from 'alfy-test';

test('foo', async t => {
	const alfy = alfyTest();

	const result = await alfy('workflow input');

	t.deepEqual(result, [
		{
			title: 'foo',
			subtitle: 'bar'
		}
	]);
});
```

## API

### alfyTest(options?)

Returns an [alfy](#alfyinput) instance.

### options

Type: `object`

#### version

Type: `string`\
Default: `'3.0.3'`

Alfred version.

#### theme

Type: `string`<br>
Default: `'theme.urlimport.153A3C58-B2D9-4F08-B342-B0BF7F6E8DE9'`

Alfred theme.

#### theme_background

Type: `string`<br>
Default: `'rgba(252,254,255,0.85)'`

Background color.

#### theme_selection

Type: `string`<br>
Default: `'rgba(255,255,255,0.26)'`

Background color of a selected item.

#### theme_subtext

Type: `string`<br>
Default: `'1'`

Show the item subtitle.

### alfy(...input)

Returns a `Promise` that returns the `items` of the workflow.

#### input

Type: `string[]`

Workflow input.

#### .config

The [alfy config](https://github.com/sindresorhus/alfy#config) instance.

#### .cache

The [alfy cache](https://github.com/sindresorhus/alfy#cache) instance.

## Examples

- [alfred-ng2](https://github.com/SamVerschueren/alfred-ng2) - Search for Angular 2 API references
