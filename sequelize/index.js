const { Sequelize } = require('sequelize');
const { applyRelations } = require('./relations');

// TODO: Keep the database connection URL as an environment variable.
const sequelize = new Sequelize('postgres://username:password@ip:port/datbase-name');

const modelDefiners = [
	require('./models/user.model'),
	require('./models/task.model'),
	// Add more models here...
];

// Define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// Execute relations after the models are defined
applyRelations(sequelize);

// Export the sequelize connection instance to be used around our app.
module.exports = sequelize;
