import DAOFactory from '../../DAOs/DAOFactory.js';
import { PERSISTENCY } from '../../config/index.js';
import { LoggerError } from '../../config/log4.js';
import { sendOrderMail } from '../../utils/sendMail.js';
import sendOrderWpp from '../../utils/sendWPP.js'

let orderDAO;

(async () => {
  try {
    orderDAO = await DAOFactory.getPersistency('orders', PERSISTENCY);
    return orderDAO;
  } catch (error) {
    LoggerError.error(error);
    throw `${error}`;
  }
})();

const ordersController = {
  getAllOrders: async (req, res, next) => {
    try {
      let orders = await orderDAO.getAll(req.user.email);
      res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  },
  getOrderById: async (req, res, next) => {
    try {
      let order = await orderDAO.getOrderById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
  createOrder: async (req, res, next) => {
    try {
      const client = {
        id: req.user.id,
        email: req.user.email,
        address: req.user.address,
      };

      const data = await orderDAO.create(client);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  confirmOrder: async (req, res, next) => {
    try {
      const confirmedOrder = await orderDAO.confirm(req.params.id, {
        status: 'Enviada',
      });
      sendOrderMail(confirmedOrder);
      sendOrderWpp(confirmedOrder);
      res.status(200).json(confirmedOrder);
    } catch (error) {
      next(error);
    }
  },
  deleteOrderById: async (req, res, next) => {
    try {
      let order = await orderDAO.deleteById(req.params.id);
      res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  },
};

export default ordersController;
