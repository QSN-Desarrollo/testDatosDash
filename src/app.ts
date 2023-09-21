import express from 'express'
// import passport from 'passport'
// import passportMiddleware from './auth/passport';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routers/searchRouter';


const app = express();

// settings
app.set('port', 3000);

// middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
// app.use(passport.initialize());
// passport.use(passportMiddleware);
app.get('/', (req, res) => {
  return res.send(` si dije que no lo abrieras porque lo haces? 💥😡😡💥`);
})

app.use(authRoutes);

export default app;