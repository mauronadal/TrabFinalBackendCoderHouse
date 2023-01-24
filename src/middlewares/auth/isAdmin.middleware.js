import { ADMIN_MODE } from '../../config/index.js';

const isAdmin = (req, res, next) => {
  if (ADMIN_MODE) {
    return next();
  }
  res.status(403).json({
    error: -1,
    description: `ruta ${req.originalUrl} método ${req.method} no autorizada`,
  });
};

export default isAdmin;
