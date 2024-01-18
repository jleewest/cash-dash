'use strict';
import 'dotenv/config';
import express, { Application } from 'express';
import cors from 'cors';
import router from './router'

const app: Application = express();

app.use(cors()).use(express.json()).use(router);

const PORT: number = parseInt(process.env.Port as string, 10) || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}...`);
});
