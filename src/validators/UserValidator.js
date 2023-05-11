const { checkSchema } = require('express-validator');

module.exports = {
	editAction: checkSchema({
		token: {
			notEmpty: true,
		},
		name: {
			optional: true,
			trim: true,
			isLength: {
				options: {
					min: 2,
				},
				errorMessage: 'Name must have at least 2 characters',
			},
		},
		email: {
			optional: true,
			isEmail: true,
			normalizeEmail: true,
			errorMessage: 'Not valid email',
		},
		password: {
			optional: true,
			isLength: {
				options: {
					min: 2,
				},
			},
			errorMessage: 'Password must have at least 2 characters',
		},
		state: {
			optional: true,
			notEmpty: true,
			errorMessage: 'State not filled',
		},
	}),
};
