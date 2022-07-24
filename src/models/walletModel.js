const connection = require('./connection');

const getNewActive = (walletData) => {
  const {
    id, clientId, productId, quantity, amount,
  } = walletData;

  return {
    id, clientId, productId, quantity, amount,
  };
};

const getActiveModel = async (activeId) => {
  const query = 'select id, clientId, productId, quantity, amount from InvestHere.Wallet where id = ?';

  const [result] = await connection.execute(query, [activeId]);

  if (result.length === 0) {
    return null;
  }

  return getNewActive(result[0]);
};

const addNewActiveModel = async (activeData) => {
  const {
    clientId, productId, quantity, amount,
  } = activeData;

  const query = 'insert into InvestHere.Wallet (clientId, productId, quantity, amount) values (?, ?, ?, ?)';

  await connection.execute(query, [clientId, productId, quantity, amount]);
};

const updateActiveModel = async (activeData) => {
  const {
    clientId, productId, quantity, amount,
  } = activeData;

  const query = 'update InvestHere.Wallet set quantity=?, amount=? where clientId=? and productId=?';

  await connection.execute(query, [quantity, amount, clientId, productId]);
};

const registerWalletOperation = async (walletOperation) => {
  const {
    clientId, productId, quantity, amount, type,
  } = walletOperation;

  const query = 'insert into InvestHere.WalletOperation (clientId, productId, quantity, amount, type) values (?,?,?,?,?)';

  await connection.execute(query, [clientId, productId, quantity, amount, type]);
};

module.exports = {
  getActiveModel,
  addNewActiveModel,
  updateActiveModel,
  registerWalletOperation,
};
