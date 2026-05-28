const { DataTypes } = require("sequelize");
const sequelize = require("../config/postgres");

const PostgresTransaction = sequelize.define("PostgresTransaction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  transactionId: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  senderWallet: {
    type: DataTypes.STRING
  },
  receiverWallet: {
    type: DataTypes.STRING
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending"
  },
  failureReason: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

module.exports = PostgresTransaction;