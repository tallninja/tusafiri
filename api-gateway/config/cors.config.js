const corsConfig = {
	whitelist: [
		'http://localhost:3005',
		'http://localhost:3004',
		'http://localhost:3003',
		'http://localhost:3002',
		'http://localhost:3001',
		'http://localhost:3000',
	],

	corsOptions: {
		origin: (origin, callback) => {
			if (corsConfig.whitelist.indexOf(origin) !== -1 || !origin) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
		optionsSuccessStatus: 200,
	},
};

module.exports = corsConfig;
