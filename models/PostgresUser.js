const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const PostgresUser = sequelize.define("PostgresUser", {

  name: {
    type: DataTypes.STRING
  },

  email: {
    type: DataTypes.STRING,
    unique: true
  },

  mobile: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },

  referredBy: {
    type: DataTypes.STRING,
    defaultValue: null
  },

  password: {
    type: DataTypes.STRING
  },

  referralcode: {
    type: DataTypes.STRING
  },

  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  walletId: {
    type: DataTypes.STRING
  },

  myReferralCode: {
    type: DataTypes.STRING
  },

  transactionPin: {
    type: DataTypes.STRING
  }

});

module.exports = PostgresUser;