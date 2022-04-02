module.exports = [
	{
		url: '/employees',
		auth: true,
		proxy: {
			target: 'http://employee-man:5005/api/employees',
			changeOrigin: true,
			pathRewrite: {
				[`^/employees`]: '',
			},
		},
	},
	{
		url: '/fleets',
		auth: true,
		proxy: {
			target: 'http://fleet-man:5004/api',
			changeOrigin: true,
			pathRewrite: {
				[`^/fleets`]: '',
			},
		},
	},
	{
		url: '/bookings',
		auth: true,
		proxy: {
			target: 'http://booking:5003/api/bookings',
			changeOrigin: true,
			pathRewrite: {
				[`^/bookings`]: '',
			},
		},
	},
];
