const router = require("express").Router();

const { mustLogin, mustBeAdmin } = require("../middlewares/must");
const { Produk, Paket } = require("../models");
const {filterProperties} = require("../utilities");

router.get("/", (req, res, next) => {
  const query = filterProperties(req.query, ["produk", "nama", "harga"]);

  if (query.produk) {
    Produk.findOne({
      where: {
        nama: query.produk
      },
      include: {
        model: Paket,
        as: 'paket_paket'
      }
    }).then((produk) => {
      if (produk === null) {
        res.json({ result: [] });
        return;
      }

      console.log(JSON.stringify(produk));

      res.json({ result: produk["paket_paket"] });
    }).catch((error) => { next(error) });
    return;
  }

  Paket.findAll({
    where: query
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.get("/:id", (req, res, next) => {
  Paket.findByPk(req.params.id)
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => { next(error) });
});

router.post("/", mustLogin, mustBeAdmin, (req, res, next) => {
  Paket.create(req.body, {
    fields: ["nama", "harga", "id_produk"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.put("/:id", mustLogin, mustBeAdmin, (req, res, next) => {
  Paket.update(req.body, {
    where: { id: req.params.id },
    fields: ["nama", "harga", "id_produk"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error); });
});

router.delete("/:id", mustLogin, mustBeAdmin, (req, res, next) => {
  Paket.destroy({
    where: { id: req.params.id }
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

module.exports = router;
