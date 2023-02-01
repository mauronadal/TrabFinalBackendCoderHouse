import FileSystemContainer from '../../containers/fileSystemContainer.js';
import fs from 'fs';
import ProductsDAO from '../products/fileSystem.js';

let instanceFileSystem = null;

class CartDAOFileSystem extends FileSystemContainer {
  constructor() {
    super('src/dbFileSystem/carts.json');
    this.products = ProductsDAO.getInstance();
  }

  static getInstance() {
    if (!instanceFileSystem) {
      instanceFileSystem = new CartDAOFileSystem();
    }

    return instanceFileSystem;
  }
  #getCartById = async (id) => {
    try {
      const carts = await this.viewFile();
      const cartWithId = carts.find((cart) => cart.id === id);

      if (!cartWithId) {
        throw new Error('Error al listar: no existe un carrito con el id indicado.');
      }
      return cartWithId;
    } catch (error) {
      throw error.message;
    }
  };

  #updateCarts = async (cartData) => {
    try {
      let carts = await this.viewFile();
      const cartIndex = carts.findIndex((object) => object.id === cartData.id);

      carts[cartIndex] = cartData;
      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(carts, null, 2),
        'utf-8'
      );
    } catch (error) {
      throw error.message;
    }
  };

  #getProduct = async (id_prod) => {
    try {
      const product = await this.products.getById(id_prod);
      if (!product) throw new Error('Error al insertar: no existe un producto con el id indicado.');
      return product;
    } catch (error) {
      throw error.message;
    }
  };

  #compareStockAndQty = (stock, quantity) => {
    
    return quantity > stock ? stock : quantity;
  };

  createCart = async (_) => {
    try {
      const carts = await this.viewFile();
      const timestamp = Date.now();
      const products = [];

      const cart = await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(
          [...carts, { id: carts.length + 1, timestamp, products }],
          null,
          2
        ),
        'utf-8'
      );

      return cart.id;
    } catch (error) {
      throw error.message;
    }
  };
  deleteById = async (id) => {
    
    try {
      const carts = await this.viewFile();
      let cartCounter = 1;
      let cartWithId = carts.find((item) => item.id === Number(id));
      if (!cartWithId) {
        throw new Error('Error al borrar: no existe un carrito con el id indicado.');
      }

      let cartsWithoutIdItem = carts.filter((item) => item.id !== id);
      const cartsWithIdsFixed = cartsWithoutIdItem.map((item) => {
        item.id = cartCounter;
        cartCounter++;
        return item;
      });

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify([...cartsWithIdsFixed], null, 2)
      );
      return { msg: 'El carrito ha sido eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  getProductsFromCartById = async (id) => {
    try {
      const cart = await this.#getCartById(Number(id));
      if (cart.products < 1) {
        throw new Error('Error al listar: el carrito seleccionado no tiene productos.');
      }
      return cart.products;
    } catch (error) {
      throw error.message;
    }
  };

  insertProduct = async (id, id_prod, quantity) => {
    
    try {
      const { timestamp, name, description, code, thumbnail, price, stock } =
        await this.#getProduct(Number(id_prod));
      const cart = await this.#getCartById(Number(id));
      const qty = this.#compareStockAndQty(stock, quantity);

      cart.products = [
        ...cart.products,
        {
          id: cart.products.length + 1,
          timestamp,
          name,
          description,
          code,
          thumbnail,
          price,
          qty,
        },
      ];
      this.#updateCarts(cart);
      return { msg: 'El producto fue añadido al carrito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteProduct = async (id, id_prod) => {
    
    try {
      let cart = await this.#getCartById(Number(id));
      let productCounter = 1;

      if (cart.products < 1) {
        throw new Error('Error al listar: el carrito seleccionado no tiene productos.');
      }
      if (id_prod > cart.products.length) {
        throw new Error('Error al listar: el carrito no tiene un producto con el id indicado.');
      }

      const productsWithoutDeletedProduct = cart.products.filter(
        (product) => product.id !== Number(id_prod)
      );

      const productsWithIdsFixed = productsWithoutDeletedProduct.map(
        (product) => {
          product.id = productCounter;
          productCounter++;
          return product;
        }
      );

      cart.products = productsWithIdsFixed;
      await this.#updateCarts(cart);

      return { msg: `El producto fue eliminado del carrito con éxito.` };
    } catch (error) {
      throw error.message;
    }
  };
}

export default CartDAOFileSystem;