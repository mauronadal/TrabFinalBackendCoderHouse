import { LoggerInfo, LoggerWarn, LoggerError } from '../config/log4.js';

const requestsLogger = (req, res, next) => {
  res.on('finish', () => {
    const msg = `Ruta: "${req.originalUrl}" | Método: "${req.method}" | Respuesta HTTP: "${res.statusCode}: ${res.statusMessage}"`;
    if (res.statusCode < 400) {
      LoggerInfo.info(msg);
    } else if (res.statusCode < 500) {
      LoggerWarn.warn(msg);
    } else {
      LoggerError.error(msg);
    }
  });

  next();
};

export default requestsLogger;
