import DAOFactory from '../../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../../config/index.js';
import { LoggerError } from '../../config/log4.js';

let cartDAO;
(async () => {
  try {
    cartDAO = await DAOFactory.getPersistency('carts', PERSISTENCY);
    return cartDAO;
  } catch (error) {
    LoggerError.error(error);
    throw `${error}`;
  }
})();

const cartsController = {
  createCart: async (req, res, next) => {
    try {
      const { clientId } = req.params;
      const id = await cartDAO.createCart(clientId);
      res.status(200).json({id});
    } catch (error) {
      next(error);
    }
  },
  deleteCartById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const msg = await cartDAO.deleteById(id);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  getAllProductsFromCartByClientId: async (req, res, next) => {
    const { clientId } = req.params;
    try {
      const productsFromCart = await cartDAO.getProducts(clientId);
      res.status(200).json(productsFromCart);
    } catch (error) {
      next(error);
    }
  },
  addProductToCartById: async (req, res, next) => {
    const { id, idProd } = req.params;
    const { quantity } = req.body;
    try {
      const msg = await cartDAO.insertProduct(id, idProd, quantity);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
  deleteProductFromCartByClientId: async (req, res, next) => {
    const { clientId, idProd } = req.params;
    try {
      const msg = await cartDAO.deleteProduct(clientId, idProd);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
};

export default cartsController;
