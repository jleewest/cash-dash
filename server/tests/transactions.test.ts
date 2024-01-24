import request from 'supertest';
import { app } from '../index';
import Transaction from '../models/transaction';

jest.mock('../models/transaction');

// Function to create a mock instance of Transaction
const createMockTransaction = (data: Partial<Transaction>) => {
  return {
    ...data,
    save: jest.fn().mockResolvedValue(null),
    update: jest.fn().mockResolvedValue(null),
    destroy: jest.fn().mockResolvedValue(null),
  } as Transaction;
};

const mockedTransaction = Transaction as jest.Mocked<typeof Transaction>;

describe('Transaction Controller', () => {
    beforeEach(() => {
        jest.clearAllMocks();

        mockedTransaction.findAll.mockResolvedValue([createMockTransaction({ id: 1, amount: 100 })]);
        mockedTransaction.create.mockResolvedValue(createMockTransaction({ id: 2 }));
        mockedTransaction.findByPk.mockImplementation(id =>
            id === 1 ? Promise.resolve(createMockTransaction({ id, amount: 100 })) : Promise.resolve(null)
        );
        mockedTransaction.destroy.mockResolvedValue(1);
    });

    test('GET /transactions should return a list of transactions', async () => {
        const response = await request(app).get('/transactions');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: 1, amount: 100 }]);
    });

    test('POST /transactions should create a new transaction', async () => {
        const newTransaction = { amount: 500, category: 'Food' };
        const response = await request(app)
            .post('/transactions')
            .send(newTransaction);
        expect(response.statusCode).toBe(201);
        expect(response.body).toEqual({ id: 2, ...newTransaction });
    });

    test('PUT /transactions/:id should update a transaction', async () => {
        const updatedData = { amount: 600, category: 'Utilities' };
        const transactionId = 1;

        const response = await request(app)
            .put(`/transactions/${transactionId}`)
            .send(updatedData);

        expect(response.statusCode).toBe(200);
        expect(mockedTransaction.findByPk).toHaveBeenCalledWith(transactionId);
        expect(createMockTransaction({}).update).toHaveBeenCalledWith(updatedData);
    });

    test('DELETE /transactions/:id should delete a transaction', async () => {
        const transactionId = 1;

        const response = await request(app)
            .delete(`/transactions/${transactionId}`);

        expect(response.statusCode).toBe(204);
        expect(mockedTransaction.destroy).toHaveBeenCalledWith({ where: { id: transactionId } });
    });

});
