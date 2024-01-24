import { TransactionData, Transaction } from './transaction';

const BASE_URL = 'http://localhost:3000/transactions';

async function apiClient(): Promise<Transaction[]> {
  const response = await fetch(`${BASE_URL}`);
  if (response.ok) {
    return response.json() as Promise<Transaction[]>;
  }
  return Promise.reject(new Error('Something went wrong'));
}

export function getTransactions(): Promise<Transaction[]> {
  return apiClient();
}

export async function postTransaction(transactionData: TransactionData) {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTransaction(transactionId: number) {
  try {
    const response = await fetch(`${BASE_URL}/${transactionId}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    if (response.ok) {
      return;
    } else {
      throw new Error('Failed to delete transaction');
    }
  } catch (e) {
    console.log(e);
  }
}

export async function changeTransaction(
  transactionData: TransactionData,
  transactionId: number
) {
  try {
    const response = await fetch(`${BASE_URL}/${transactionId}`, {
      method: 'PUT',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transactionData),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
