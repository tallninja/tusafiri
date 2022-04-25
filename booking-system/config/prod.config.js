module.exports = {
	db: {
		MONGO_URI: process.env.DB_URI,
	},
	payments: {
		salesTax: 0.16,
		invoiceDue: 60 * 15, // Customer has 10 minutes to make the payment
	},
};
