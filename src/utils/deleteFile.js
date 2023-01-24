import fs from 'fs';
import { LoggerError } from '../config/log4.js';

export default async (path) => {
  try {
    await fs.promises.unlink(path);
  } catch (error) {
    LoggerError.error(error);
  }
};


