import { Router } from 'express';
import upload from '../../middlewares/multer.middleware.js';
import { signupReqValidation } from '../../middlewares/auth/requestValidator.middleware.js';
import signupValidator from '../../middlewares/auth/signupValidator.middleware.js';
import passport from '../../middlewares/passport/passport-local.middleware.js';
import deleteFile from '../../utils/deleteFile.js';
import { sendNewSignupMail } from '../../utils/sendMail.js';

const router = Router();

/* --------------------------- registro de usuario -------------------------- */
router.post(
  '/',
  upload.single('photo'),
  signupReqValidation,
  signupValidator,
  (req, res, next) => {
    return passport.authenticate(
      'signup',
      { passReqToCallBack: true },
      (error, data) => {
        if (data) {
          sendNewSignupMail(data);
          return res
            .status(200)
            .json({ success: 'Se ha registrado correctamente al usuario.' });
        }
        /*Parche ineficiente para borrar foto subida al servidor, en caso de que falle el registro*/
        if (req.file)
          deleteFile(process.cwd() + `/src/public/img/${req.file.filename}`);
        if (error) return res.status(404).json({ error });
        res.status(400).json({ error: 'Falló el registro de usuario.' });
      }
    )(req, res, next);
  }
);

export default router;
