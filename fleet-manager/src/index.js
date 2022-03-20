const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Fleet Manager' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
  if (err) {
    console.log('Error:', err);
  } else {
    console.log(`Server listening on PORT: ${PORT}`);
  }
});
