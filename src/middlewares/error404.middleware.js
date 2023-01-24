const badRequest = (req, res, next) => {
  res.status(404).json({
    error: -2,
    description: `ruta ${req.originalUrl} método ${req.method} no implementada`,
  });
};

export default badRequest;
