import MongoDBContainer from '../../containers/mongoDBContainer.js';
import productModel from '../../models/mongoose/products.model.js';

let instanceMongoDB = null;
class ProductsDAOMongoDB extends MongoDBContainer {
  constructor() {
    super();
    this.collectionName = productModel;
  }

  static getInstance = () => {
    if (!instanceMongoDB) {
      instanceMongoDB = new ProductsDAOMongoDB();
    }
    return instanceMongoDB;
  };

  insertProduct = async (productData) => {
    try {
      await this.collectionName.create(productData);
      return { msg: 'El producto fue añadido al sistema.' };
    } catch (error) {
      throw error.message;
    }
  };

  getAll = async () => {
    try {
      const products = await this.collectionName.find();
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
      const product = await this.collectionName.findById(id);
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

  searchByFilter = async (filters) => {
    try {
      const products = await this.collectionName.find({
        $or: [
          { name: { $regex: '.*' + filters.name + '.*', $options: 'i' } },
          { code: filters.code },
          { price: { $gte: filters.minPrice, $lte: filters.maxPrice } },
          { stock: { $gte: filters.minStock, $lte: filters.maxStock } },
        ],
      });
      
      if (products.length < 1) {
        throw new Error(
          'Error al buscar: no hay productos que coincidan con los filtros.'
        );
      }
      return products;
    } catch (error) {
      throw error.message;
    }
  };

  updateProduct = async ({ id }, productData) => {
    try {
      const productUpdated = await this.collectionName.findByIdAndUpdate(
        { _id: id },
        productData
      );
      if (!productUpdated) {
        throw new Error(
          'Error al actualizar: no se encontró el producto con el id indicado.'
        );
      }
      return { msg: 'El producto fue actualizado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteById = async (id) => {
    try {
      const productDeleted = await this.collectionName.findByIdAndRemove(
        { _id: id },
        { rawResult: true }
      );
      if (!productDeleted.value) {
        throw new Error(
          'Error al borrar: no se encontró el producto con el id indicado.'
        );
      }
      return { msg: 'El producto fue eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };
}

export default ProductsDAOMongoDB;
