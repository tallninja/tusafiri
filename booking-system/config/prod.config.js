module.exports = {
  db: {
    MONGO_URI: process.env.MONGO_URI,
  },
  payments: {
    salesTax: 0.16,
    invoiceDue: 60 * 60 * 0.5, // Customer has 30 minutes to make the payment
  },
};
