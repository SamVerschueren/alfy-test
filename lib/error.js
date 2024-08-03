export class AlfyTestError extends Error {
	constructor(message, result) {
		super(message);
		Error.captureStackTrace(this, this.constructor);
		this.name = 'AlfyTestError';

		Object.assign(this, {result});
	}
}
