import express,{ Request, Response } from 'express';
import {
  getAllTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from './controllers/transaction';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

router.get('/transactions', getAllTransactions);
router.post('/transactions', createTransaction);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);

export default router;
