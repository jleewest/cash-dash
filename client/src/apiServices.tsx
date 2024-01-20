import { TransactionData } from './transaction';

const BASE_URL = 'http://localhost:3000/transactions';

export async function getTransactions() {
  try {
    const response = await fetch(`${BASE_URL}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
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
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
