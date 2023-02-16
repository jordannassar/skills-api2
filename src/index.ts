import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';
import categoryRouter from './routes/categoryRouter';

const app = express();

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

const port = 3001;

dotenv.config();

app.use(express.json());

app.use(cookieParser());

//USER
app.use('/api/user', userRouter);

//AUTH
app.use('/api/auth', authRouter);

//POST
app.use('/api/post', postRouter);

//CATEGORY
app.use('/api/category', categoryRouter);

app.listen(port, () => {
	console.log(`Server started on port ${port}`);
});
