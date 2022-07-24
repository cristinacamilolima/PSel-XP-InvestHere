const connection = require('./connection');

const getNewProduct = (productData) => {
  const {
    id, name, quantity, amount,
  } = productData;

  return {
    id, name, quantity, amount,
  };
};

const getProductModel = async (nameProduct) => {
  const query = 'select id, name, quantity, amount from InvestHere.Product where name = ?';

  const [result] = await connection.execute(query, [nameProduct]);
  if (result.length === 0) {
    return null;
  }

  return getNewProduct(result[0]);
};

const updateProductModel = async (productId, quantity) => {
  const query = 'update InvestHere.Product set quantity=? where id = ?';

  await connection.execute(query, [quantity, productId]);
};

module.exports = {
  getProductModel,
  updateProductModel,
};
