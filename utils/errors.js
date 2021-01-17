const errors = {
	// 500
	internal_error: {
		status: 500,
		code: 'INTERNAL_ERROR',
		message: 'Internal Server Error.',
	},
	invalid_list: {
		status: 500,
		code: 'INVALID_LIST',
		message: 'Invalid List.',
	},
	// 404
	not_found: {
		status: 404,
		code: 'NOT_FOUND',
		message: 'Not Found.',
	},
};

module.exports = errors;