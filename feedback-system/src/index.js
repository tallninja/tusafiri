const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const { connectToDb } = require('./models');

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

const PORT = process.env.PORT || 5002;
app.listen(PORT, (err) => {
	if (err) {
		console.log('Error:', err);
	} else {
		console.log(`Server listening on PORT: ${PORT}`);
	}
});
