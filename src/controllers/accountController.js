const accountService = require('../services/accountService');

const getBalanceController = async (req, res) => {
  const { clientId } = req.params;

  const balance = await accountService.getBalanceService(clientId);

  return res.status(200).json({ codCliente: parseInt(clientId, 10), saldo: balance / 100 });
};

const depositController = async (req, res) => {
  const { CodCliente, Valor } = req.body;

  await accountService.depositService(CodCliente, Valor);

  return res.status(200).json({ message: 'Deposit made successfully' });
};

const withdrawController = async (req, res) => {
  const { CodCliente, Valor } = req.body;

  const result = await accountService.withdrawService(CodCliente, Valor);

  if (result !== null) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(200).json({ message: 'Withdraw made successfully' });
};

module.exports = {
  getBalanceController,
  depositController,
  withdrawController,
};
