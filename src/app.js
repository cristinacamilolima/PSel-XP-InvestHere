const express = require('express');
const bodyParser = require('body-parser');
const accountController = require('./controllers/accountController');
const walletController = require('./controllers/walletController');
const productCotroller = require('./controllers/productController');
const { isValidDeposit, isValidWithdraw } = require('./middlewares/accountValidator');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.status(200).send());

app.get('/conta/:clientId', accountController.getBalanceController);
app.post('/conta/deposito', isValidDeposit, accountController.depositController);
app.post('/conta/saque', isValidWithdraw, accountController.withdrawController);

app.post('/investimento/comprar', walletController.buyActiveController);
app.post('/investimento/vender', walletController.sellActiveController);

app.get('/ativos/:param', (req, res) => {
  const isnum = /^\d+$/.test(req.params.param);
  if (isnum) {
    return walletController.getActivesController(req, res);
  }
  return productCotroller.getActiveByNameController(req, res);
});

app.listen(process.env.PORT, () => {
  setTimeout(() => {
    console.log('Waiting for db');
  }, 5000);

  console.log(`Running on port ${process.env.PORT}`);
});
