const router = require("express").Router();

const { mustLogin, mustBeAdmin } = require("../middlewares/must");
const { filterProperties } = require("../utilities");
const { Produk } = require("../models");
const generateUploadMiddleware = require("../utilities/generateUploadMiddleware");
const path = require("path");

const imageUploadDirectory = "/uploads/produk";

const allowedMimeTypes = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp"
];

const allowedExtnames = /png|jpg|jpeg|webp/;

const { upload, deepFileTypeCheck } = generateUploadMiddleware(imageUploadDirectory, allowedMimeTypes, allowedExtnames);

router.get("/", (req, res, next) => {
  const query = filterProperties(req.query, ["nama"]);

  Produk.findAll({
    where: query
  }).then((result) => {
      res.json({ result });
  }).catch((error) => { next(error) });
});

router.get("/:id", (req, res, next) => {
  Produk.findByPk(req.params.id)
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => { next(error) });
});

router.post("/", mustLogin, mustBeAdmin, upload.single("image"), deepFileTypeCheck, (req, res, next) => {
  if (!req.file) {
    res.status(400).json({message: "`image` field is empty"});
  }

  Produk.create({
    ...req.body,
    img_path: path.join(imageUploadDirectory, req.file.filename)
  }, {
    fields: ["nama", "deskripsi", "img_path"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.put("/:id", mustLogin, mustBeAdmin, upload.single("image"), deepFileTypeCheck, (req, res, next) => {
  if (!req.file) {
    res.status(400).json({message: "`image` field is empty"});
  }

  Produk.update({
    ...req.body,
    img_path: path.join(imageUploadDirectory, req.file.filename)
  }, {
    where: { id: req.params.id },
    fields: ["nama", "deskripsi", "img_path"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error); });
});

router.delete("/:id", mustLogin, mustBeAdmin, (req, res, next) => {
  Produk.destroy({
    where: { id: req.params.id }
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

module.exports = router;
