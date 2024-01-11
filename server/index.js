'use strict';
const express = require('express');
const cors = require('cors');
const router = require('./router');
const { sync } = require('./models/transaction');

const app = express();

app.use(cors()).use(express.json()).use(router);

const PORT = 3000;

app.listen(PORT, () => {
  sync();
  console.log(`Server listening on port http://localhost:${PORT}...`);
});
