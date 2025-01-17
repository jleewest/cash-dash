import { useContext, createContext, Dispatch, SetStateAction } from 'react';

export type Transaction = {
  amount: number;
  category: string;
  date: string;
  id: number;
  note: string;
  type: string;
};

export type TransactionData = {
  date: string;
  category: string;
  amount: number;
  note: string;
  type: string;
};

export type TTransactionContext = {
  transactions: Transaction[];
  setTransactions: Dispatch<SetStateAction<Transaction[]>>;
};

export const TransactionsContext = createContext<TTransactionContext | null>(
  null
);

export const useTransactionContext = () => {
  const context = useContext(TransactionsContext);
  if (!context) throw Error('TransactionContext not provided');
  return context;
};
