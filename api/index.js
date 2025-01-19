const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const multer = require("multer");
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
require('dotenv').config()

const eventRouter = require('./../routers/eventRouter');
const authRouter = require('./../routers/authRouter');
const userRouter = require('./../routers/userRouter');

// Konfigurasi Cloudinary
cloudinary.config({
	cloud_name: 'doebhykyu', // Ganti dengan Cloud Name Anda
	api_key: '443541184964513',       // Ganti dengan API Key Anda
	api_secret: 'Vf9hly20DHcSoPi7LqvGiD3Kpeg', // Ganti dengan API Secret Anda
});

// Konfigurasi Multer dengan Cloudinary Storage
const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
	  folder: 'uploads', // Nama folder di Cloudinary
	  allowed_formats: ['jpg', 'png'], // Format yang diperbolehkan
	},
});

const upload = multer({ storage });


// Konfigurasi CORS
const corsOptions = {
	// origin: process.env.BASE_URL, // Ganti dengan asal yang diperbolehkan
	origin: ['http://localhost:3000', 'http://localhost:5000', 'https://wedding-eight-pi.vercel.app/'],
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metode yang diizinkan
	credentials: true, // Jika menggunakan cookie atau header otentikasi
};

const app = express();
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(upload);
app.use(express.urlencoded({ extended: true }));

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log('Database connected');
	})
	.catch((err) => {
		console.log(err);
	});

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