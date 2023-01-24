import mongoose from 'mongoose';
import MongoDBContainer from '../../containers/mongoDBContainer.js';
import orderModel from '../../models/mongoose/orders.model.js';
import CartsDAO from '../carts/mongoDB.js';

let instanceMongoDB = null;
class OrdersDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = orderModel;
    this.carts = CartsDAO.getInstance();
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new OrdersDAOMongoDB();
    }
    return instanceMongoDB;
  };

  getAll = async (clientEmail) => {
    try {
      const orders = await this.collectionName.find({
        clientEmail: clientEmail,
      });
      if (orders.length < 1) {
        throw new Error('Error al listar: no hay ordenes adjuntas al cliente.');
      }
      return orders;
    } catch (error) {
      throw error.message;
    }
  };

  getOrderById = async (orderId) => {
    try {
      const order = await this.collectionName.findById(orderId);
      if (!order) {
        throw new Error(
          'Error al listar: no se encontró el producto con el id indicado.'
        );
      }
      return order;
    } catch (error) {
      throw error.message;
    }
  };

  create = async (client) => {
    try {
      const cart = await this.carts.findCartByClientId(client.id);

      if (!cart.products) {
        throw new Error(
          'Error al generar orden: no hay productos en el carrito.'
        );
      }

      let products = cart.products.map((product) => {
        return {
          name: product.name,
          description: product.description,
          code: product.code,
          thumbnail: product.thumbnail,
          price: product.price,
          quantity: product.quantity,
        };
      });
      const msg = await this.carts.deleteById(cart.id);

      await this.collectionName.create({
        clientEmail: client.email,
        clientAddress: client.address,
        products,
      });
      return { success: 'Se ha generado la orden con éxito' };
    } catch (error) {
      throw error.message;
    }
  };

  confirm = async (orderId, status) => {
    try {
      const orderUpdated = await this.collectionName.findByIdAndUpdate({ _id: orderId }, status, {
        new: true,
      });  
      return orderUpdated;
    } catch (error) {
      throw error.message;
    }
  }

  deleteById = async (id) => {
    try {
      const orderDeleted = await this.collectionName.findByIdAndDelete(
        { _id: mongoose.Types.ObjectId(id) },
        { rawResult: true }
      );
      if (!orderDeleted.value) {
        throw new Error(
          'Error al borrar: no existe una orden con el id indicado.'
        );
      }
      return { success: 'La orden ha sido eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };
}

export default OrdersDAOMongoDB;
