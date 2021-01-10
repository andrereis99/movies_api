const errors = {
	// 500
	internal_error: {
		status: 500,
		code: 'INTERNAL_ERROR',
		message: 'Internal Server Error.',
	},
	// 404
	not_found: {
		status: 404,
		code: 'NOT_FOUND',
		message: 'Not Found.',
	},
};

module.exports = errors;