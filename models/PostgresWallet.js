const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const PostgresWallet = sequelize.define("PostgresWallet", {

  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },

  balance: {
    type: DataTypes.FLOAT,
    defaultValue: 10000
  },

  walletAddress: {
    type: DataTypes.STRING
  },

  walletExpiry: {
    type: DataTypes.DATE
  },

  qrCode: {
    type: DataTypes.TEXT
  },

  qrExpiry: {
    type: DataTypes.DATE
  },

  qrToken: {
    type: DataTypes.STRING
  }

});

module.exports = PostgresWallet;