const isValidDeposit = async (req, res, next) => {
  const { Valor } = req.body;

  if (!Valor) {
    return res.status(400).json({ error: 'you need inform a value to deposit' });
  }

  if (Valor <= 0) {
    return res.status(400).json({ error: 'unable to deposit the amount informed' });
  }

  return next();
};

const isValidWithdraw = async (req, res, next) => {
  const { Valor } = req.body;

  if (!Valor) {
    return res.status(400).json({ error: 'you need inform a value to withdraw' });
  }

  if (Valor <= 0) {
    return res.status(400).json({ error: 'unable to withdraw the amount informed' });
  }

  return next();
};

module.exports = {
  isValidDeposit,
  isValidWithdraw,
};
