module.exports = {
  db: {
    MONGO_URI: process.env.MONGO_URI,
  },
  payments: {
    salesTax: 0.16,
    invoiceDue: 60 * 60 * 1, // Customer has 1 hour to make the payment
  },
};
