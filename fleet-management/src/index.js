const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { StatusCodes: Sc } = require('http-status-codes');

const { connectToDb } = require('./models');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev')
);

app.use('/', routes);

connectToDb();

const PORT = process.env.PORT || 5004;

app.listen(PORT, (err) => {
	if (err) {
		console.log('Error:', err);
	} else {
		console.log(`Server listening on PORT: ${PORT}`);
	}
});
