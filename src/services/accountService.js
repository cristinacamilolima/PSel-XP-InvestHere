const accountModel = require('../models/accountModel');

const randomNumber = (min, max) => Math.floor(
  Math.random() * (max - min) + min,
);

const createAccountService = async (clientId) => {
  const agency = randomNumber(1000, 9999).toString();
  const account = randomNumber(100000, 999999).toString();

  await accountModel.createAccount(clientId, agency, account);
};

const getBalanceService = async (clientId) => {
  const balance = await accountModel.getBalanceModel(clientId);

  if (!balance) return null;

  return balance;
};

const depositService = async (clientId, valueDeposit) => {
  const account = await accountModel.getAccountModel(clientId);

  await accountModel.depositModel(account.id, account.balance + valueDeposit);

  const op = {
    clientId,
    accountId: account.id,
    amount: valueDeposit,
    type: 'D',
  };

  await accountModel.registerAccountOperation(op);
};

const withdrawService = async (clientId, valueWithdraw) => {
  const account = await accountModel.getAccountModel(clientId);

  if (account.balance < valueWithdraw) {
    return { error: 'you have no balance' };
  }

  await accountModel.withdrawModel(account.id, account.balance - valueWithdraw);

  const op = {
    clientId,
    accountId: account.id,
    amount: valueWithdraw,
    type: 'S',
  };

  await accountModel.registerAccountOperation(op);

  return null;
};

module.exports = {
  getBalanceService,
  depositService,
  withdrawService,
  createAccountService,
};
