const productModel = require('../models/productModel');

const getProductByNameService = async (activeName) => {
  const activeData = await productModel.getProductModel(activeName);

  return {
    CodAtivo: activeData.name,
    QtdAtivo: activeData.quantity,
    Valor: activeData.amount / 100,
  };
};

module.exports = {
  getProductByNameService,
};
