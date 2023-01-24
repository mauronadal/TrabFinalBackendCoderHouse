import FileSystemContainer from '../../containers/fileSystemContainer.js';
import fs from 'fs';

let instanceFileSystem = null;

class ProductDAOFileSystem extends FileSystemContainer {
  constructor() {
    super('src/dbFileSystem/products.json');
  }

  static getInstance() {
    if (!instanceFileSystem) {
      instanceFileSystem = new ProductDAOFileSystem();
    }

    return instanceFileSystem;
  }
  insertProduct = async (productData) => {
    try {
      const objects = await this.viewFile();
      const timestamp = Date.now();

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(
          [...objects, { id: objects.length + 1, timestamp, ...productData }],
          null,
          2
        ),
        'utf-8'
      );

      return { msg: `El producto fue añadido al sistema.` };
    } catch (error) {
      throw error.message;
    }
  };
  getById = async (id) => {
    try {
      const objects = await this.viewFile();
      let objectWithId = objects.find((item) => item.id === Number(id));
      if (!objectWithId) {
        throw new Error(
          'Error al listar: no se encontró el producto con el id indicado.'
        );
      }
      return objectWithId;
    } catch (error) {
      throw error.message;
    }
  };

  getAll = async () => {
    try {
      const objects = await this.viewFile();
      if (objects.length < 1) {
        throw new Error(
          'Error al listar: no hay productos cargados en el sistema.'
        );
      }
      return objects;
    } catch (error) {
      throw error.message;
    }
  };

  deleteById = async (id) => {
    try {
      const objects = await this.viewFile();
      let productCounter = 1;
      let objectWithId = objects.find((item) => item.id === Number(id));
      if (!objectWithId) {
        throw new Error(
          'Error al borrar: no se encontró el producto con el id indicado.'
        );
      }

      let objectsWithoutIdItem = objects.filter(
        (item) => item.id !== Number(id)
      );
      const objectsWithIdsFixed = objectsWithoutIdItem.map((item) => {
        item.id = productCounter;
        productCounter++;
        return item;
      });

      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify([...objectsWithIdsFixed], null, 2)
      );
      return { msg: 'El producto fue eliminado con éxito.' };
    } catch (error) {
      throw error.message;
    }
  };

  deleteAll = async () => {
    try {
      const objects = await this.viewFile();
      if (objects.length) {
        await fs.promises.writeFile(this.fileRoute, '[]', 'utf8');
      }
    } catch (error) {
      throw error.message;
    }
  };

  getRandomProduct = async () => {
    try {
      const objects = await this.viewFile();
      if (!objects.length) {
        throw new Error(
          'Error al listar: no hay productos cargados en el sistema.'
        );
      }
      const randomId = Math.ceil(Math.random() * objects.length);
      const object = await this.getById(randomId);
      return object;
    } catch (error) {
      throw error.message;
    }
  };

  updateProduct = async ({ id }, productData) => {
    id = Number(id);
    try {
      let products = await this.viewFile();
      const objectIndex = products.findIndex((object) => object.id === id);
      if (objectIndex === -1) {
        throw new Error(
          'Error al actualizar: no se encontró el producto con el id indicado.'
        );
      }

      products[objectIndex] = { id, ...productData };
      await fs.promises.writeFile(
        this.fileRoute,
        JSON.stringify(products, null, 2),
        'utf-8'
      );

      return { msg: `El producto fue actualizado con éxito.` };
    } catch (error) {
      throw error.message;
    }
  };
}

export default ProductDAOFileSystem;
