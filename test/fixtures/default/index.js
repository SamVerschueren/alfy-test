'use strict';
const result = {
	items: [
		{
			title: 'Foo',
			subtitle: process.argv[2]
		}
	]
};

console.log(JSON.stringify(result));
