module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		// Giving the Author model a name of type STRING
		email: DataTypes.STRING,
		password: DataTypes.STRING
	});

	return User;
};
