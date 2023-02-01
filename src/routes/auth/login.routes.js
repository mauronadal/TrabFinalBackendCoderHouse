import { Router } from 'express';
import { loginReqValidation } from '../../middlewares/auth/requestValidator.middleware.js';
import loginValidator from '../../middlewares/auth/loginValidator.middleware.js';
import passport from '../../middlewares/passport/passport-local.middleware.js';

const router = Router();

/* ---------------------------- inicio de sesión ---------------------------- */

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
