import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../../models/mongoose/users.model.js';
import { LoggerError, LoggerWarn, LoggerInfo } from '../../config/log4.js';

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const existUser = await User.findOne({ email });
        if (existUser) {
          LoggerWarn.warn('El usuario ya está registrado.');
          return done(null, false);
        }
        
        const { fullName, age, phone, address } = req.body;
        let photo = req.file === undefined ? null : req.file.filename;
        
        const newUser = new User();
        newUser.email = email;
        newUser.fullName = fullName;
        newUser.age = age;
        newUser.password = newUser.encryptPassword(password);
        newUser.phone = phone;  
        newUser.address = address; 
        newUser.photo = photo; 
        try {
          const user = await User.create(newUser);
          LoggerInfo.info('Se ha registrado un nuevo usuario.');
          return done(null, user);
        } catch (error) {
          LoggerError.error(`Error creando el usuario: ${error}`);
          return done(error);
        }
      } catch (error) {
        LoggerError.error(`Falló el registro de usuario: ${error}`);
        return done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          LoggerWarn.warn('No existe el usuario.');
          return done(null, false);
        }
        if (!user.comparePassword(password)) {
          LoggerError.error('La contraseña no coincide.');
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        LoggerError.error(`Error iniciando sesión: ${error}`);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

export default passport;
