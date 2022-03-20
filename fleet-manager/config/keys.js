if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod.keys');
} else {
  module.exports = require('./dev.keys');
}
