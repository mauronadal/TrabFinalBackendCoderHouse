import { LoggerError } from '../config/log4.js';

class DAOFactory {
  static getPersistency = async (entity, type) => {
    try {
      const { default: persistency } = await import(`./${entity}/${type}.js`);
      return persistency.getInstance();
    } catch (error) {
      LoggerError.error(error);
      throw `${error}`;
    }
  };
}

export default DAOFactory;
