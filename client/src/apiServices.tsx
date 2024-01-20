const BASE_URL = 'http://localhost:3000';

export async function getTransactions() {
  try {
    const response = await fetch(`${BASE_URL}/transactions`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteTransaction(transactionId: number) {
  try {
    const response = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
      method: 'DELETE',
      mode: 'cors',
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
