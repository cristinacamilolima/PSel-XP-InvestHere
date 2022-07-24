const walletService = require('../services/walletService');

const getActivesController = async (req, res) => {
  const result = await walletService.getAllActivesService(req.params.param);

  return res.status(200).json(result);
};

const buyActiveController = async (req, res) => {
  const result = await walletService.buyActiveService(req.body);

  if (result !== null) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(200).json({ message: 'successful purchase' });
};

const sellActiveController = async (req, res) => {
  const result = await walletService.sellActiveService(req.body);

  if (result !== null) {
    return res.status(400).json({ message: result.error });
  }

  return res.status(200).json({ message: 'successful sale' });
};

module.exports = {
  buyActiveController,
  sellActiveController,
  getActivesController,
};
