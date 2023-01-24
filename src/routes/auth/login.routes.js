import { Router } from 'express';
import { loginReqValidation } from '../../middlewares/auth/requestValidator.middleware.js';
import loginValidator from '../../middlewares/auth/loginValidator.middleware.js';
import passport from '../../middlewares/passport/passport-local.middleware.js';

const router = Router();

/* ---------------------------- inicio de sesión ---------------------------- */
/* No entiendo porque debo llamar al post dos veces pero es la única forma que encontré para que funcione esto */
router.post(
  '/',
  loginReqValidation,
  loginValidator,
  passport.authenticate('login', {
    passReqToCallBack: true,
  })
);

router.post('/', (req, res, next) => {
  passport.authenticate('login', (_) => {
    return res
      .status(200)
      .json({ success: 'Sesión iniciada de manera éxitosa.' });
  })(req, res, next);
});
export default router;
