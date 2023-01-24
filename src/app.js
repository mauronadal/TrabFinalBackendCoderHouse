import express, { json } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import { create } from 'express-handlebars';
import session from 'express-session';
import { default as MongoStore } from 'connect-mongo';

import { COOKIES_SECRET, SESSION_SECRET, MONGO_URL } from './config/index.js';
import badRequest from './middlewares/error404.middleware.js';
import errorHandler from './middlewares/errorHandler.middleware.js';
import requestsLogger from './middlewares/reqLogger.middleware.js';
import passport from './middlewares/passport/passport-local.middleware.js';

import homeRouter from './routes/home.routes.js';
import apiRouter from './routes/api/index.routes.js';
import authRouter from './routes/auth/index.routes.js';

const app = express();

/* -------------------------- middlewares settings -------------------------- */
app.use(json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(COOKIES_SECRET));
app.use(express.static(process.cwd() + '/src/public'));
app.use(requestsLogger);

/* -------------------------- template engine settings -------------------------- */
const hbs = create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(process.cwd(), '/src/views'));

/* ---------------------------- session settings ---------------------------- */
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      collection: 'sessions',
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    cookie: {
      maxAge: 600000,
    },
  })
);

/* ---------------------------- passport settings --------------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* -------------------------- routes settings -------------------------- */
app.use('/', homeRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

app.use(errorHandler);
app.use(badRequest); // Middleware que evalua si el endpoint visitado existe o no

export default app;
