import { Model, DataTypes } from 'sequelize';
import sequelize from '.';

//define attributes for better type checking
export interface TransactionAttributes {
  id?: number;
  date: string;
  category: string;
  amount: number;
  note: string;
  type: string;
}

//Extend Model to define a new model
class Transaction extends Model<TransactionAttributes>
  implements TransactionAttributes {
  public id!: number; // Note: the `!` postfix indicates that this will be initialized by Sequelize, not in the constructor
  public date!: string;
  public category!: string;
  public amount!: number;
  public note!: string;
  public type!: string;
}
Transaction.init(
  {
    date: {
      type: DataTypes.DATEONLY,
    },
    category: {
      type: DataTypes.STRING,
    },
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
    sequelize,
    modelName: 'transaction',
    timestamps: false,
  }
);

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error(error);
  }
})();

export default Transaction;