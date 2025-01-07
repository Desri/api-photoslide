const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// const authRouter = require('./routers/authRouter');
// const userRouter = require('./routers/userRouter');

// Konfigurasi CORS
const corsOptions = {
	origin: 'https://wedding-eight-pi.vercel.app', // Ganti dengan asal yang diperbolehkan
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metode yang diizinkan
	credentials: true, // Jika menggunakan cookie atau header otentikasi
};

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});

// Middleware atau logika lainnya
app.get('/', (req, res) => {
  res.json({ message: 'Hello World from Express.js' });
});

// Ekspor handler
module.exports = app;