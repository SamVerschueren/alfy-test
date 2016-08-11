'use strict';
module.exports = info => {
	let script;

	for (const object of info.objects) {
		if (object.config && object.config.script) {
			script = object.config.script;
			break;
		}
	}

	const match = /run-node (.*?).js/.exec(script);

	return match ? `${match[1]}.js` : 'index.js';
};
