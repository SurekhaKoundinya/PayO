const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const PostgresNotification = sequelize.define("PostgresNotification", {

  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },

  title: {
    type: DataTypes.STRING
  },

  message: {
    type: DataTypes.STRING
  },

  type: {
    type: DataTypes.ENUM(
      "PAYMENT",
      "REWARD",
      "SECURITY",
      "SYSTEM"
    ),
    defaultValue: "SYSTEM"
  },

  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  timestamps: true
});

module.exports = PostgresNotification;