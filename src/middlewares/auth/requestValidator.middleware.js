import { check } from 'express-validator';

const signupReqValidation = [
  check('email')
    .exists()
    .notEmpty()
    .withMessage('El campo email es requerido')
    .isEmail()
    .withMessage('El campo del correo debe ser en formato email'),
  check('password')
    .exists()
    .notEmpty()
    .withMessage('El campo password es requerido')
    .isString()
    .withMessage('El campo password debe ser de tipo alfanumérico'),
  check('fullName')
    .exists()
    .notEmpty()
    .withMessage('El campo nombre es requerido')
    .isString()
    .withMessage('El campo nombre debe ser de tipo texto'),
  check('address')
    .exists()
    .notEmpty()
    .withMessage('El campo dirección es requerido')
    .isString()
    .withMessage('El campo direccion debe ser de tipo alfanumérico'),
  check('age')
    .exists()
    .notEmpty()
    .withMessage('El campo edad es requerido')
    .isInt({ min: 15 })
    .withMessage('El campo edad debe ser de tipo entero mayor a 15 años'),
  check('phone')
    .exists()
    .notEmpty()
    .withMessage('El campo telefono es requerido')
    .isString()
    .withMessage('El campo telefono debe ser de tipo alfanumérico'),
];

const loginReqValidation = [
  check('email')
    .exists()
    .notEmpty()
    .withMessage('El campo email es requerido')
    .isEmail()
    .withMessage('El campo del correo debe ser en formato email'),
  check('password')
    .exists()
    .notEmpty()
    .withMessage('El campo password es requerido')
    .isString()
    .withMessage('El campo password debe ser de tipo alfanumérico'),
];

export { signupReqValidation, loginReqValidation };
