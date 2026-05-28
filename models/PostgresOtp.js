const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const PostgresOtp = sequelize.define("PostgresOtp", {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  mobile: {
    type: DataTypes.STRING,
    allowNull: false
  },

  otp: {
    type: DataTypes.STRING
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  expiresAt: {
    type: DataTypes.DATE
  }

});

module.exports = PostgresOtp;