const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const PostgresBank = sequelize.define("PostgresBank", {

  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },

  accountHolderName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },

  bankName: {
    type: DataTypes.STRING,
    allowNull: false
  },

  accountNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },

  ifscCode: {
    type: DataTypes.STRING,
    allowNull: false
  },

  accountType: {
    type: DataTypes.ENUM("Savings", "Current"),
    allowNull: false
  },

  tpin: {
    type: DataTypes.STRING,
    defaultValue: null
  },

  isTpinCreated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }

}, {
  timestamps: true
});

module.exports = PostgresBank;