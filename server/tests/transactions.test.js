import request from 'supertest';
import { app } from '../index';

describe('/transactions routes', () => {

  test('simple test', () => {
    expect(1 + 1).toBe(2);
});
  // test('GET /transactions should return a list of transactions', async () => {
  //   const response = await request(app).get('/transactions');
  //   expect(response.statusCode).toBe(200);
  // });

  // test('POST /transactions should create a new transaction', async () => {
  //   const newTransactionData = {
  //     date: '2021-01-01',
  //     category: 'Utilities',
  //     amount: 5000,
  //     note: 'Electricity bill',
  //     type: 'expense',
  //   };

  //   const response = await request(app)
  //     .post('/transactions')
  //     .send(newTransactionData);

  //   expect(response.statusCode).toBe(201);
  // });

  // test('POST /transactions should validate the request body', async () => {
  //   const invalidData = {
  //     amount: 'not a number',
  //     note: 'This should not be processed',
  //   };

  //   const response = await request(app)
  //     .post('/transactions')
  //     .send(invalidData);

  //   expect(response.statusCode).toBe(400);
  //   expect(response.body).toHaveProperty('error');
  //   expect(response.body.error).toMatch(/validation error/i);
  // });

  // test('GET /transactions/:id should return a single transaction', async () => {
  //   const transactionId = 1;
  //   const response = await request(app).get(`/transactions/${transactionId}`);
  //   expect(response.statusCode).toBe(200);
  // });

  // test('PUT /transactions/:id should update a transaction', async () => {
  //   const updateData = {
  //     date: '2021-01-02',
  //     category: 'Utilities',
  //     amount: 5500,
  //     note: 'Updated electricity bill',
  //     type: 'expense',
  //   };
  //   const transactionId = 1;

  //   const response = await request(app)
  //     .put(`/transactions/${transactionId}`)
  //     .send(updateData);

  //   expect(response.statusCode).toBe(200);
  // });

  // test('DELETE /transactions/:id should return an error for non-existent transaction', async () => {
  //   const transactionId = 9999;
  //   const response = await request(app).delete(`/transactions/${transactionId}`);
  //   expect(response.statusCode).toBe(404);
  //   expect(response.body).toHaveProperty('error');
  //   expect(response.body.error).toMatch(/not found/i);
  // });

  // test('DELETE /transactions/:id should delete a transaction', async () => {
  //   const transactionId = 1;

  //   const response = await request(app).delete(`/transactions/${transactionId}`);

  //   expect(response.statusCode).toBe(204);
  // });



});
