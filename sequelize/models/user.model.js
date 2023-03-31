const { DataTypes } = require('sequelize');

// Export a function that defines the user model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
			validate: {
				// Length of at least 3, and only use letters, numbers and underscores.
				is: /^\w{3,}$/
			}
		},
	});
};
