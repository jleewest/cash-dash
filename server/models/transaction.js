'use strict';
const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Transaction = sequelize.define(
  'transaction',
  {
    date: {
      type: DataTypes.DATEONLY,
    },
    category: {
      type: DataTypes.STRING,
    },
    // Stored in cents
    amount: {
      type: DataTypes.INTEGER,
    },
    note: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.log(error);
  }
})();

module.exports = Transaction;
