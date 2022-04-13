module.exports = {
	db: {
		MONGO_URI: process.env.DB_URI,
	},
	auth: {
		jwtSecret: 'pTm2$D0xxDTW2Iw5&b9#lcNMxmhjsOoh',
		jwtTokenExpire: 10, // 10 second/s
		jwtRefreshExpire: 60 * 60 * 24 * 1, // 1 day
	},
	ROUTES: require('./routes.config'),
};
