const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev')
);

app.use('/', routes);

const PORT = process.env.PORT || 5200;
app.listen(PORT, (err) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log(`Server listening on PORT: ${PORT}`);
  }
});
