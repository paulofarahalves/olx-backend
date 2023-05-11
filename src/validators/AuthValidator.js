const { checkSchema } = require('express-validator');

module.exports = {
	signup: checkSchema({
		name: {
			trim: true,
			isLength: {
				options: {
					min: 2,
				},
				errorMessage: 'Name must have at least 2 characters',
			},
		},
		email: {
			isEmail: true,
			normalizeEmail: true,
			errorMessage: 'Not valid email',
		},
		password: {
			isLength: {
				options: {
					min: 2,
				},
			},
			errorMessage: 'Password must have at least 2 characters',
		},
		state: {
			notEmpty: true,
			errorMessage: 'State not filled',
		},
	}),
	signin: checkSchema({
		email: {
			isEmail: true,
			normalizeEmail: true,
			errorMessage: 'Not valid email',
		},
		password: {
			isLength: {
				options: {
					min: 2,
				},
			},
			errorMessage: 'Password must have at least 2 characters',
		},
	}),
};
