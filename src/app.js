const express = require('express');
const bodyParser = require('body-parser');
const accountController = require('./controllers/accountController');
const walletController = require('./controllers/walletController');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/conta/:clientId', accountController.getBalanceController);
app.post('/conta/deposito', accountController.depositController);
app.post('/conta/saque', accountController.withdrawController);

app.post('/investimento/comprar', walletController.buyActiveController);
app.post('/investimento/vender', walletController.sellActiveController);

app.listen(process.env.PORT, () => {
  console.log(`Running on port ${process.env.PORT}`);
});
