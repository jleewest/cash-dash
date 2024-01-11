'use strict';
const sequelize = require('./index');
const { DataTypes } = require('sequelize');

const Transaction = sequelize.define('Transaction', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Category = sequelize.define('Category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Transaction.belongsTo(Category);
Category.hasMany(Transaction);

sequelize.sync();
