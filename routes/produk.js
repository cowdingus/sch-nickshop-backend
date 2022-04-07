const router = require("express").Router();

const { mustLogin, mustBeAdmin } = require("../middlewares/must");
const { Produk } = require("../models");

router.get("/", (_req, res, next) => {
  Produk.findAll()
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => { next(error) });
});

router.get("/:id", (req, res, next) => {
  Produk.findByPk(req.params.id)
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => { next(error) });
});

router.post("/", mustLogin, mustBeAdmin, (req, res, next) => {
  Produk.create(req.body, {
    fields: ["nama", "deskripsi", "img_path"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.put("/:id", mustLogin, mustBeAdmin, (req, res, next) => {
  Produk.update(req.body, {
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
