const walletModel = require('../services/walletService');

const buyActiveController = async (req, res) => {
  const result = await walletModel.buyActiveService(req.body);

  if (result !== null) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(200).json({ message: 'successful purchase' });
};

const sellActiveController = async (req, res) => {
  const result = await walletModel.sellActiveService(req.body);

  if (result !== null) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(200).json({ message: 'successful sale' });
};

module.exports = {
  buyActiveController,
  sellActiveController,
};
