'use strict';

module.exports = info => {
	let script;

	for (const object of info.objects) {
		if (object.config && object.config.script) {
			script = object.config.script;
			break;
		}
	}

	const match = /run-node (?<filename>.*?).js/.exec(script);

	return match ? `${match.groups.filename}.js` : 'index.js';
};
