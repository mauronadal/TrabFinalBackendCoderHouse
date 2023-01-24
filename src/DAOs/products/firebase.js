import FirebaseContainer from '../../containers/firebaseContainer.js';

let instanceFirebase = null;
class ProductsDAOFirebase extends FirebaseContainer {
  constructor() {
    super('products');
  }

  static getInstance = () => {
    if (!instanceFirebase) {
      instanceFirebase = new ProductsDAOFirebase();
    }
    return instanceFirebase;
  };

  insertProduct = async (productData) => {
    try {
      await this.collectionName.add({
        timestamp: new Date(),
        name: productData.name,
        description: productData.description,
        code: productData.code,
        thumbnail: productData.thumbnail,
        price: productData.price,
        stock: productData.stock,
      });

      return { msg: 'El producto fue añadido al sistema.' };
    } catch (error) {
      throw error.message;
    }
  };

  getAll = async () => {
    try {
      const querySnapshot = await this.collectionName.get();
      let products = querySnapshot.docs;

      products = products.map((product) => ({
        id: product.id,
        timestamp: product.data().timestamp.toDate().toLocaleDateString(),
        ...product.data(),
      }));

      if (products.length < 1) {
        throw new Error(
          'Error al listar: no hay productos cargados en el sistema.'
        );
      }
      return products;
    } catch (error) {
      throw error.message;
    }
  };

  getById = async (id) => {
    try {
      const document = await this.collectionName.doc(id);
      let product = await document.get();
      product = product.data();

      if (!product) {
        throw new Error(
          'Error al listar: no se encontró el producto con el id indicado.'
        );
      }
      return product;
    } catch (error) {
      throw error.message;
    }
  };

  updateProduct = async ({ id }, productData) => {
    try {
      const document = await this.collectionName.doc(id);
      let prod = await document.get();

      if (!prod.data()) {
        throw new Error(
          'Error al actualizar: no se encontró el producto con el id indicado.'
        );
      }
      await document.update({ ...productData });
      return { msg: 'El producto fue actualizado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteById = async (id) => {
    try {
      const document = await this.collectionName.doc(id);
      let prod = await document.get();

      if (!prod.data()) {
        throw new Error(
          'Error al borrar: no se encontró el producto con el id indicado.'
        );
      }
      await document.delete();
      return { msg: 'El producto fue eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };
}

export default ProductsDAOFirebase;
