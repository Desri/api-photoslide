const multer = require('multer');
const cloudinary = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: 'doebhykyu', // Ganti dengan Cloud Name Anda
  api_key: '443541184964513', // Ganti dengan API Key Anda
  api_secret: 'Vf9hly20DHcSoPi7LqvGiD3Kpeg', // Ganti dengan API Secret Anda
});

// Konfigurasi Multer dengan Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Nama folder di Cloudinary
    allowed_formats: ['jpg', 'png'], // Format yang diperbolehkan
	transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

const upload = multer({ storage });

module.exports = upload;