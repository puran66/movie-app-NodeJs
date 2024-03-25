const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
});

const uploadImage = (imagePath) => {
  const result = cloudinary.uploader.upload(imagePath);
  return result
}

module.exports = uploadImage;