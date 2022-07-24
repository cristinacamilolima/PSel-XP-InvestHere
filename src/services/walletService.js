const productModel = require('../models/productModel');
const walletModel = require('../models/walletModel');
const accountModel = require('../models/accountModel');

const getAllActivesService = async (clientId) => {
  const walletData = await walletModel.getAllActivesModel(clientId);

  return walletData.map((item) => ({
    CodCliente: item.clientId,
    CodAtivo: item.name,
    QtdAtivo: item.quantity,
    Valor: item.amount / 100,
  }));
};

const buyActiveService = async ({ CodCliente, CodAtivo, QtdAtivo }) => {
  const product = await productModel.getProductModel(CodAtivo);

  if (product === null) {
    return { error: 'the active not exist' };
  }

  const priceActive = QtdAtivo * product.amount;
  const account = await accountModel.getAccountModel(CodCliente);

  if (priceActive > account.balance) {
    return { error: 'you don\t have balance to buy this active' };
  }

  if (product.quantity < QtdAtivo) {
    return { error: 'we don\'t have that amount of shares for sale' };
  }

  await productModel.updateProductModel(product.id, product.quantity - QtdAtivo);

  const act = await walletModel.getActiveModel(product.id);

  const activeQuantityProduct = act !== null ? act.quantity + QtdAtivo : QtdAtivo;
  const activeValueProduct = act !== null
    ? act.amount + priceActive : priceActive;

  const active = {
    clientId: CodCliente,
    productId: product.id,
    quantity: activeQuantityProduct,
    amount: activeValueProduct,
  };

  if (act !== null) {
    await walletModel.updateActiveModel(active);
  } else {
    await walletModel.addNewActiveModel(active);
  }

  await accountModel.withdrawModel(account.id, account.balance - priceActive);

  await accountModel.registerAccountOperation({
    clientId: CodCliente, accountId: account.id, amount: priceActive, type: 'S',
  });

  const op = {
    clientId: CodCliente,
    productId: product.id,
    quantity: QtdAtivo,
    amount: priceActive,
    type: 'C',
  };

  await walletModel.registerWalletOperation(op);

  return null;
};

const sellActiveService = async ({ CodCliente, CodAtivo, QtdAtivo }) => {
  const product = await productModel.getProductModel(CodAtivo);
  const account = await accountModel.getAccountModel(CodCliente);

  if (product === null) {
    return { error: 'the active not exist' };
  }

  const walletActive = await walletModel.getActiveModel(product.id);

  if (walletActive === null) {
    return { error: 'you do not have this active' };
  }

  if (walletActive.quantity < QtdAtivo) {
    return { error: 'you do not have this active of shares for sale' };
  }

  await productModel.updateProductModel(product.id, product.quantity + QtdAtivo);

  const activeQuantityProduct = walletActive.quantity - QtdAtivo;
  const activeValueProduct = walletActive.amount - (QtdAtivo * product.amount);

  const active = {
    clientId: CodCliente,
    productId: product.id,
    quantity: activeQuantityProduct,
    amount: activeValueProduct,
  };

  await walletModel.updateActiveModel(active);

  const priceSell = QtdAtivo * product.amount;
  const amount = account.balance + priceSell;

  await accountModel.depositModel(account.id, amount);

  await accountModel.registerAccountOperation({
    clientId: CodCliente, accountId: account.id, amount: priceSell, type: 'D',
  });

  const op = {
    clientId: CodCliente,
    productId: product.id,
    quantity: QtdAtivo,
    amount: priceSell,
    type: 'V',
  };

  await walletModel.registerWalletOperation(op);

  return null;
};

module.exports = {
  buyActiveService,
  sellActiveService,
  getAllActivesService,
};
