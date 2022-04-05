const { whitelist } = require('../../config/cors.config');

module.exports = (req, res, next) => {
	const origin = req.headers.origin;
	if (whitelist.includes(origin)) {
		res.header('Access-Control-Allow-Credentials', true);
	}
	next();
};
