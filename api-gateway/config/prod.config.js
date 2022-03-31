module.exports = {
	db: {
		MONGO_URI: process.env.MONGO_URI,
	},
	auth: {
		jwtSecret: 'pTm2$D0xxDTW2Iw5&b9#lcNMxmhjsOoh',
		jwtTokenExpire: 60 * 60, // 1 minute
		jwtRefreshExpire: 60 * 60 * 24 * 1, // 1 day
	},
};
