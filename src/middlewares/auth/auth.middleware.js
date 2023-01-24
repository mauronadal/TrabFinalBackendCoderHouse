const authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    error: -3,
    description: `ruta ${req.originalUrl} método ${req.method} no autenticado`,
  });
};

export default authenticationMiddleware;
