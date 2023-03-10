import { validationResult } from 'express-validator';
import deleteFile from '../../utils/deleteFile.js';
const signupValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  if(req.file) deleteFile(process.cwd() + `/src/public/img/${req.file.filename}`);

  return res.status(400).json({ errors: errors.array() });
};

export default signupValidator;