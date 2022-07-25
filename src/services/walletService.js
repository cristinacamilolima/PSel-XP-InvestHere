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
  // Obtendo os dados da ação pesquisada.
  const product = await productModel.getProductModel(CodAtivo);

  if (product === null) {
    return { error: 'the active not exist' };
  }

  // Calculando o preço da ação
  const priceActive = QtdAtivo * product.amount;

  // Obtendo os dados da conta do cliente.
  const account = await accountModel.getAccountModel(CodCliente);

  // Verificando se o cliente possui saldo suficiente para compra da ação.
  if (priceActive > account.balance) {
    return { error: 'you don\t have balance to buy this active' };
  }

  // Verificando se a corretora possui o volume de ações para ser negociada.
  if (product.quantity < QtdAtivo) {
    return { error: 'we don\'t have that amount of shares for sale' };
  }

  // Atualizando a base de ações disponíveis na corretora.
  await productModel.updateProductModel(product.id, product.quantity - QtdAtivo);

  // Obtendo os dados da carteira de ações do cliente.
  const act = await walletModel.getActiveModel(product.id);

  // Somando o volume de ações da carteira com a ação que está sendo comprada,
  // caso ela exista na carteira.
  const activeQuantityProduct = act !== null ? act.quantity + QtdAtivo : QtdAtivo;
  // Somando o valor da ação da carteira com a ação que está sendo comprada,
  // caso ela exista na carteira.
  const activeValueProduct = act !== null
    ? act.amount + priceActive : priceActive;

  // Criando o objeto que irá atualizar a carteira.
  const active = {
    clientId: CodCliente,
    productId: product.id,
    quantity: activeQuantityProduct,
    amount: activeValueProduct,
  };

  // Atualizando ou adicionando uma ação na carteira.
  if (act !== null) {
    await walletModel.updateActiveModel(active);
  } else {
    await walletModel.addNewActiveModel(active);
  }

  // Sacando o valor da compra da conta.
  await accountModel.withdrawModel(account.id, account.balance - priceActive);

  // Registrando a operação de saque da conta.
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

  // Registrando a operação de compra da ação na carteira.
  await walletModel.registerWalletOperation(op);

  return null;
};

const sellActiveService = async ({ CodCliente, CodAtivo, QtdAtivo }) => {
  // Obtendo os dados da ação pesquisada.
  const product = await productModel.getProductModel(CodAtivo);

  // Obtendo os dados da conta do cliente.
  const account = await accountModel.getAccountModel(CodCliente);

  if (product === null) {
    return { error: 'the active not exist' };
  }

  // Obtendo os dados da carteira do cliente.
  const walletActive = await walletModel.getActiveModel(product.id);

  // Verificando se o cliente possúi a ação que está querendo vender.
  if (walletActive === null) {
    return { error: 'you do not have this active' };
  }

  // Verificando se o cliente possui o volume de ação que está querendo vender.
  if (walletActive.quantity < QtdAtivo) {
    return { error: 'you do not have this active of shares for sale' };
  }

  // Atualizando a base de ações disponíveis na corretora.
  await productModel.updateProductModel(product.id, product.quantity + QtdAtivo);

  // Diminuindo o volume de ações da carteira com a ação que está sendo vendida.
  const activeQuantityProduct = walletActive.quantity - QtdAtivo;
  // Diminuindo o valor da ação que está sendo vendida.
  const activeValueProduct = walletActive.amount - (QtdAtivo * product.amount);

  const active = {
    clientId: CodCliente,
    productId: product.id,
    quantity: activeQuantityProduct,
    amount: activeValueProduct,
  };

  // Atualizando a carteira
  await walletModel.updateActiveModel(active);

  // Calculando o preço da ação que está sendo vendida.
  const priceSell = QtdAtivo * product.amount;
  // Somando o preço da ação com o valor da ação que está sendo vendida.
  const amount = account.balance + priceSell;

  // Depositando o valor da ação vendida na conta do cliente.
  await accountModel.depositModel(account.id, amount);

  // Registrando a operação de deposito da conta.
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

  // Registrando a operação de venda da ação na carteira.
  await walletModel.registerWalletOperation(op);

  return null;
};

module.exports = {
  buyActiveService,
  sellActiveService,
  getAllActivesService,
};
