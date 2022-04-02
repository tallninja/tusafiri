const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');

const { ROUTES } = require('../config');
const { connectToDb } = require('./models');
const { verifyToken } = require('./middlewares/auth');
const routes = require('./routes');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev')
);
connectToDb();

app.use('/', routes);

ROUTES.forEach((route) => {
	app.use(
		route.url,
		[route.auth && verifyToken],
		createProxyMiddleware(route.proxy)
	);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
	if (err) {
		console.log('Error:', err);
	} else {
		console.log(`Server listening on PORT: ${PORT}`);
	}
});
