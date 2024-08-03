import process from 'node:process';

const result = {
	items: [
		{
			title: 'Foo',
			subtitle: process.argv[2],
		},
	],
};

if (process.argv[3] === '--env') {
	const item = {
		title: 'Env',
		env: {},
	};

	for (const env of Object.keys(process.env)) {
		if (env.indexOf('alfred') === 0) {
			item.env[env] = process.env[env];
		}
	}

	result.items.push(item);
}

console.log(JSON.stringify(result));
