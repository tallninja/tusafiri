const mongoose = require('mongoose');

const { db } = require('../../config');
const User = require('./User');
const { SystemRole, SYSTEM_ROLES } = require('./SystemRoles');

const initSystemRoles = () => {
	SystemRole.estimatedDocumentCount((err, count) => {
		if (err) {
			console.log('Error:', err);
			return;
		}

		const systemRoles = Object.values(SYSTEM_ROLES);

		if (count < systemRoles.length) {
			systemRoles.map((role) => {
				new SystemRole({ name: role }).save((err) => {
					if (err) {
						console.log('Error:', err);
						return;
					}
					console.log('Info:', `Role ${role} was created.`);
				});
			});
		}
	});
};

const connectToDb = () => {
	mongoose.connect(db.MONGO_URI, (err) => {
		if (err) {
			console.log('Error:', err);
		} else {
			console.log('Info:', 'Connected to database.');
			initSystemRoles();
		}
	});
};

module.exports = {
	connectToDb: connectToDb,
	User,
	SystemRole,
	SYSTEM_ROLES,
	RefreshToken: require('./RefreshToken'),
};
