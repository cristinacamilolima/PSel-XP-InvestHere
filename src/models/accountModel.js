const connection = require('./connection');

const getNewAccount = (accountData) => {
  const {
    id, clientId, agency, account, balance,
  } = accountData;

  return {
    id, clientId, agency, account, balance,
  };
};

const getAccountModel = async (clientId) => {
  const query = 'select id, clientId, agency, account, balance from InvestHere.Account where clientId = ?';

  const [result] = await connection.execute(query, [clientId]);

  return getNewAccount(result[0]);
};

const createAccount = async (clientId, agency, account) => {
  const query = 'insert into InvestHere.Account (clientId, agency, account, balance) values (?, ?, ?, ?)';

  await connection.execute(query, [clientId, agency, account, 0]);
};

const getBalanceModel = async (clientId) => {
  const acc = await getAccountModel(clientId);

  return acc.balance;
};

const depositModel = async (accountId, value) => {
  const query = 'update InvestHere.Account set balance=? where id = ?';

  await connection.execute(query, [value, accountId]);
};

const withdrawModel = async (accountId, value) => {
  const query = 'update InvestHere.Account set balance=? where id = ?';

  await connection.execute(query, [value, accountId]);
};

const registerAccountOperation = async (accountOperation) => {
  const {
    clientId, accountId, amount, type,
  } = accountOperation;

  const query = 'insert into InvestHere.AccountOperation (clientId, accountId, amount, type) values (?, ?, ?, ?)';

  await connection.execute(query, [clientId, accountId, amount, type]);
};

module.exports = {
  getAccountModel,
  getBalanceModel,
  depositModel,
  withdrawModel,
  createAccount,
  registerAccountOperation,
};
