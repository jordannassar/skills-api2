import express, { json, urlencoded } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import authRouter from './routes/authRouter';
import postRouter from './routes/postRouter';
import categoryRouter from './routes/categoryRouter';
import https from 'https';
import fs from 'fs';
import cors from 'cors';
const app = express();

app.use(logger('dev'));
app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;

dotenv.config();

app.use(express.json());

app.use(cookieParser());

app.options(
	'*',
	cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }),
);

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));

//USER
app.use('/api/user', userRouter);

//AUTH
app.use('/api/auth', authRouter);

//POST
app.use('/api/post', postRouter);

//CATEGORY
app.use('/api/category', categoryRouter);

//var options = {
//	key: fs.readFileSync(__dirname + '/utils/certs/selfsigned.key'),
//	cert: fs.readFileSync(__dirname + '/utils/certs/selfsigned.crt')
//};
//
//var server = https.createServer(options, app);
//
//server.listen(port, () => {
//	console.log('server starting on port : ' + port);
//});
//


app.listen(port, () => {
	console.log('server starting on port : ' + port);
})

