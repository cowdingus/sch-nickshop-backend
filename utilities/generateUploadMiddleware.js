const multer = require("multer");
const slugify = require("slugify");
const {checkUploadedFileType} = require("../middlewares/checkUploadedFileType");
const path = require("path");

module.exports = function(uploadDirectory, allowedMimeTypes, allowedExtnames) {
  const upload = multer({
    storage: multer.diskStorage({
      destination: path.join("public", uploadDirectory),
      filename: (_req, file, cb) => {
        const name = slugify(file.originalname, { lower: true });

        cb(
          null,
          `${new Date().getTime()}-${name}`
        );
      },
    }),
    limits: {
      fields: 6,
      fileSize: 6000000, // 6 MB
    },
    fileFilter: (_req, file, cb) => {
      const isExtnameValid = allowedExtnames.test(path.extname(file.originalname).toLowerCase());
      const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

      if (isExtnameValid && isMimeTypeValid) {
        return cb(null, true);
      } else {
        cb("Error: Images only!");
      }
    },
  });

  const deepFileTypeCheck = checkUploadedFileType(allowedMimeTypes);

  return {
    upload,
    deepFileTypeCheck
  };
}
