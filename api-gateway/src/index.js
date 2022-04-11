const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { corsOptions } = require('../config/cors.config');
const { ROUTES } = require('../config');
const { connectToDb } = require('./models');
const { verifyToken } = require('./middlewares/auth');

const credentials = require('./middlewares/credentials');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(credentials);

ROUTES.forEach((route) => {
	app.use(
		route.url,
		[
			route.auth
				? verifyToken
				: (req, res, next) => {
						next();
				  },
		],
		createProxyMiddleware(route.proxy)
	);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev')
);
app.use(cookieParser());

connectToDb();

app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
	if (err) {
		console.log('Error:', err);
	} else {
		console.log(`Server listening on PORT: ${PORT}`);
	}
});
