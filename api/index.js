const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config()

// const corsOptions = {
// 	origin: 'https://wedding-eight-pi.vercel.app',
// 	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// 	credentials: true,
// };

const app = express();
app.use(cors())
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware untuk menambahkan header CORS secara global
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', 'https://wedding-eight-pi.vercel.app'); // Ganti dengan domain yang diperbolehkan
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// 	res.setHeader('Access-Control-Allow-Credentials', 'true'); // Untuk mengizinkan cookie/credentials
// 	next();
// });

const albumRouter = require('./../routers/albumRouter');
const eventRouter = require('./../routers/eventRouter');
const authRouter = require('./../routers/authRouter');
const userRouter = require('./../routers/userRouter');

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});

app.use('/api/album', albumRouter);
app.use('/api/event', eventRouter);
app.use('/api/auth', authRouter);
app.use('/api', userRouter);
app.get('/', (req, res) => {
	res.json({ message: 'Hello from the server' });
});

app.listen(process.env.PORT, () => {
	console.log('listening...');
});

module.exports = app;