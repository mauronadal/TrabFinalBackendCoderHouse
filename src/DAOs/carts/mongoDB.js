import mongoose from 'mongoose';
import MongoDBContainer from '../../containers/mongoDBContainer.js';
import cartModel from '../../models/mongoose/carts.model.js';
import ProductsDAO from '../products/mongoDB.js';

let instanceMongoDB = null;
class CartsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = cartModel;
    this.products = ProductsDAO.getInstance();
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new CartsDAOMongoDB();
    }

    return instanceMongoDB;
  };

  #getProduct = async (idProd) => {
    try {
      const product = await this.products.getById(
        mongoose.Types.ObjectId(idProd)
      );
      return product;
    } catch (error) {
      return [];
    }
  };

  #findCartById = async (id) => {
    try {
      const cart = await this.collectionName.findById(id);
      return cart;
    } catch (error) {
      throw [];
    }
  };

  findCartByClientId = async (clientId) => {
    try {
      const cart = this.collectionName.findOne({
        clientId: { _id: mongoose.Types.ObjectId(clientId) },
      });

      return cart;
    } catch (error) {
      throw error;
    }
  };

  #updateProductToCart = async (cart, prodId, quantity) => {
    let product = cart.products.find(
      (product) =>
        product._id.toString() === mongoose.Types.ObjectId(prodId).toString()
    );
    if (product) {
      product.quantity += quantity;
      return true;
    } else {
      return false;
    }
  };

  createCart = async (clientId) => {
    try {
     
      let cart = await this.findCartByClientId(clientId);
      if (!cart) {
        cart = await this.collectionName.create({
          timestamp: new Date(),
          products: [],
          clientId,
        });
      }

      return cart.id;
    } catch (error) {
      throw error.message;
    }
  };

  deleteById = async (id) => {
    try {
      const cartDeleted = await this.collectionName.findByIdAndRemove(
        { _id: mongoose.Types.ObjectId(id)},
        { rawResult: true }
        );
      if (!cartDeleted.value) {
        throw new Error(
          'Error al borrar: no existe un carrito con el id indicado.'
        );
      }
      return { msg: 'El carrito ha sido eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  getProducts = async (clientId) => {
    try {
      const cart = await this.findCartByClientId(clientId);
      if (!cart) {
        throw new Error(
          'Error al listar: no existe un carrito con el id indicado.'
        );
      }
      const productsFromCart = cart.products;
      if (!productsFromCart) {
        throw new Error(
          'Error al listar: el carrito seleccionado no tiene productos.'
        );
      }
      return productsFromCart;
    } catch (error) {
      throw error.message;
    }
  };

  insertProduct = async (idCart, idProd, quantity) => {
    try {
      let cart = await this.#findCartById(idCart);
      if (cart.length < 1) {
        throw new Error(
          'Error al insertar: no existe un carrito con el id indicado.'
        );
      }

      let productDetail = await this.#getProduct(idProd);
      if (productDetail.length < 1) {
        throw new Error(
          'Error al insertar: no existe un producto con el id indicado.'
        );
      }

      const isUpdated = await this.#updateProductToCart(cart, idProd, quantity);
      if (!isUpdated) {
        cart.products.push({
          _id: mongoose.Types.ObjectId(productDetail.id),
          timestamp: productDetail.timestamp,
          name: productDetail.name,
          description: productDetail.description,
          code: productDetail.code,
          thumbnail: productDetail.thumbnail,
          price: productDetail.price,
          quantity,
        });
      }

      await this.collectionName.findByIdAndUpdate({ _id: idCart }, cart, {
        new: true,
      });

      return { msg: 'El producto fue añadido al carrito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteProduct = async (clientId, idProd) => {
    try {
      const cart = await this.findCartByClientId(clientId);
      if (cart.length < 1) {
        throw new Error(
          'Error al borrar: no existe un carrito con el id indicado.'
        );
      }

      const productDeleted = await this.collectionName.updateOne(
        {
          _id: mongoose.Types.ObjectId(cart.id),
        },
        {
          $pull: {
            products: { _id: mongoose.Types.ObjectId(idProd) },
          },
        }
      );

      if (!productDeleted.modifiedCount) {
        throw new Error(
          'Error al borrar: no existe en el carrito un producto con el id indicado.'
        );
      }

      return { msg: 'El producto fue eliminado del carrito con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };
}

export default CartsDAOMongoDB;
