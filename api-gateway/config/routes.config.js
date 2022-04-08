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
			onProxyRes: (proxyRes, req, res) => {
				proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin;
			},
		},
	},
	{
		url: '/fleets',
		auth: false,
		proxy: {
			target: 'http://fleet-man:5004/api',
			changeOrigin: true,
			pathRewrite: {
				[`^/fleets`]: '',
			},
			onProxyRes: (proxyRes, req, res) => {
				proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin;
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
			onProxyRes: (proxyRes, req, res) => {
				proxyRes.headers['Access-Control-Allow-Origin'] = req.headers.origin;
			},
		},
	},
];
