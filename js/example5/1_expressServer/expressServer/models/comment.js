module.exports = (sequelize, DataTypes) => {
	return sequelize.define('comment',{
		comment: {
			type: DataTypes.STRING(1000),
			allowNull: false,
		},
		create_date:{
			type: DataType.DATE,
			allowNull: true,
			defaultValue: DataTypes.NOW,
		},
	}, {
		timestamps: false,
	}),
}