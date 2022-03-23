const mongoose = require('mongoose');

const { db } = require('../../config');

const { Role, ROLES } = require('./Role');
const Employee = require('./Employee');

const connectToDb = () => {
  mongoose.connect(db.MONGO_URI, (err) => {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Info:', 'Connected to database.');
    }
  });
};

const initDb = () => {
  Role.estimatedDocumentCount((err, count) => {
    const roles = Object.values(ROLES);

    if (err) {
      console.log('Error:', err);
    } else {
      if (count < roles.length) {
        roles.map((role) => {
          new Role({
            name: role,
          }).save((err, role) => {
            if (err) {
              console.log('Error:', err);
            } else {
              console.log('Info:', `Created ${role.name} role.`);
            }
          });
        });
      }
    }
  });
};

module.exports = {
  connectToDb: connectToDb,
  initDb: initDb,
  Role: Role,
  ROLES: ROLES,
  Employee: Employee,
};
