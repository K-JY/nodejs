module.exports = (sequelize, DataTypes) => {
	return sequelize.define('comments',{
		comment: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		},
		create_date:{
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW,
		},
	}, {
		timestamps: false,
	});
}