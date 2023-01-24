import FirebaseContainer from '../../containers/firebaseContainer.js';
import ProductsDAO from '../products/firebase.js';

let instanceFirebase = null;
class CartsDAOFirebase extends FirebaseContainer {
  constructor() {
    super('carts');
    this.products = ProductsDAO.getInstance();
  }

  static getInstance = () => {
    if (!instanceFirebase) {
      instanceFirebase = new CartsDAOFirebase();
    }
    return instanceFirebase;
  };

  #getProduct = async (idProd) => {
    try {
      const product = await this.products.getById(idProd);
      return product;
    } catch (error) {
      return [];
    }
  };

  #findCartBy = async (document) => {
    try {
      let cart = await document.get();
      return cart.data();
    } catch (error) {
      throw [];
    }
  };

  createCart = async (_) => {
    try {
      const cart = await this.collectionName.add({
        timestamp: new Date(),
        products: [],
      });
      return cart.id;
    } catch (error) {
      throw error.message;
    }
  };

  deleteById = async (id) => {
    try {
      const document = await this.collectionName.doc(id);
      let cart = await this.#findCartBy(document);

      if (!cart) {
        throw new Error(
          'Error al borrar: no existe un carrito con el id indicado.'
        );
      }
      await document.delete();
      return { msg: 'El carrito ha sido eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  getProductsFromCartById = async (id) => {
    try {
      const document = await this.collectionName.doc(id);
      let cart = await this.#findCartBy(document);
      if (!cart) {
        throw new Error(
          'Error al listar: no existe un carrito con el id indicado.'
        );
      }
      if (!cart.products.length) {
        throw new Error(
          'Error al listar: el carrito seleccionado no tiene productos.'
        );
      }
      return cart.products;
    } catch (error) {
      throw error.message;
    }
  };

  insertProduct = async (idCart, idProd, quantity) => {
    try {
      const document = await this.collectionName.doc(idCart);
      let cart = await this.#findCartBy(document);
      if (!cart) {
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

      const productToInsert = {
        id: idProd,
        timestamp: new Date(),
        name: productDetail.name,
        description: productDetail.description,
        code: productDetail.code,
        thumbnail: productDetail.thumbnail,
        price: productDetail.price,
        quantity,
      };
      await document.update({
        products: [...cart.products, productToInsert],
        timestamp: new Date(),
      });

      return { msg: 'El producto fue añadido al carrito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteProduct = async (idCart, idProd) => {
    try {
      const document = await this.collectionName.doc(idCart);
      let cart = await this.#findCartBy(document);
      if (!cart) {
        throw new Error(
          'Error al borrar: no existe un carrito con el id indicado.'
        );
      }
      const product = cart.products.find((product) => product.id === idProd);

      if (!product) {
        throw new Error(
          'Error al borrar: no existe en el carrito un producto con el id indicado.'
        );
      }

      const productsToInsert = cart.products.filter(
        (product) => product.id !== idProd
      );
      await document.update({
        products: productsToInsert,
        timestamp: new Date(),
      });

      return { msg: 'El producto fue eliminado del carrito con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };
}

export default CartsDAOFirebase;
