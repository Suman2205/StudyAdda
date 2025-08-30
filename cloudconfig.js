const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'studyadda_DEV',
//     resource_type: 'raw',
//     allowedFormats: ['pdf'],
//   },
// });
// module.exports={cloudinary,storage};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    // Clean title to be URL-safe
    let title = req.body.contributor.title || "file";
    title = title.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_-]/g, "");

    return {
      folder: 'studyadda_DEV',
      resource_type: 'raw',       // IMPORTANT: for PDFs
      allowedFormats: ['pdf'],
      public_id: title,           // filename in URL
      overwrite: true,            // overwrite if exists
    };
  },
});

module.exports = { cloudinary, storage };
