const { StatusCodes: Sc } = require('http-status-codes');

module.exports = (err, res) => {
	if (err.isJoi) {
		return res.status(Sc.BAD_REQUEST).json(err.details[0]);
	}
	console.log('Error:', err);
	return res.status(Sc.INTERNAL_SERVER_ERROR).json(err);
};
