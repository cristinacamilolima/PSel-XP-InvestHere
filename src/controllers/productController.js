const productService = require('../services/productService');

const getActiveByNameController = async (req, res) => {
  const result = await productService.getProductByNameService(req.params.param);

  return res.status(200).json(result);
};

module.exports = {
  getActiveByNameController,
};
