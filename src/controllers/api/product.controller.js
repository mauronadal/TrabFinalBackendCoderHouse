import DAOFactory from '../../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../../config/index.js';
import { LoggerError } from '../../config/log4.js';
import areFieldsFilled from '../../utils/areFieldsFilled.js';

let productDAO;
(async () => {
  try {
    productDAO = await DAOFactory.getPersistency('products', PERSISTENCY);
    return productDAO;
  } catch (error) {
    LoggerError.error(error);
    throw `${error}`;
  }
})();

const productsController = {
  getAllProducts: async (req, res, next) => {
    try {
      const allProducts = await productDAO.getAll();
      res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  },
  getProductById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await productDAO.getById(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
  searchProductByFilter: async (req, res, next) => {
    const filters = req.query;
    
    filters.name.length === 0 ? (filters.name = null) : '';
    filters.minPrice.length === 0 ? (filters.minPrice = null) : filters.minPrice = parseFloat(filters.minPrice);
    filters.maxPrice.length === 0 ? (filters.maxPrice = null) : filters.maxPrice = parseFloat(filters.maxPrice);
    filters.minStock.length === 0 ? (filters.minStock = null) : filters.minStock = parseFloat(filters.minStock);
    filters.maxStock.length === 0 ? (filters.maxStock = null) : filters.maxStock = parseFloat(filters.maxStock);
    try {
      const products = await productDAO.searchByFilter(filters);
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  },
  addProduct: async (req, res, next) => {
    if (areFieldsFilled(req.body)) {
      const { name, description, code, thumbnail, price, stock } = req.body;
      
      try {
        const msg = await productDAO.insertProduct({
          name,
          description,
          code,
          thumbnail,
          price: parseFloat(price),
          stock,
        });
        res.status(200).json(msg);
      } catch (error) {
        next(error);
      }
    } else {
      next('Error al insertar: uno o más campos quedaron vacíos.');
    }
  },
  updateProductById: async (req, res, next) => {
    if (areFieldsFilled(req.body)) {
      const { id } = req.params;
      const { name, description, code, thumbnail, price, stock } = req.body;
     
      try {
        const timestamp = new Date();
        const msg = await productDAO.updateProduct(
          { id },
          {
            timestamp,
            name,
            description,
            code,
            thumbnail,
            price: parseFloat(price),
            stock,
          }
        );
        res.status(200).json(msg);
      } catch (error) {
        next(error);
      }
    } else {
      next('Error al actualizar: uno o más campos quedaron vacíos.');
    }
  },
  deleteProductById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const msg = await productDAO.deleteById(id);
      res.status(200).json(msg);
    } catch (error) {
      next(error);
    }
  },
};
export default productsController;
