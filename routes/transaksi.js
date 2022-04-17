const router = require('express').Router();

const { mustLogin, mustBeAdmin } = require('../middlewares/must');
const { Transaksi, User, Produk, Paket } = require("../models");

router.get("/", mustLogin, mustBeAdmin, (req, res, next) => {
  Transaksi.findAll({
    include: [
      { model: User, attributes: { exclude: ["password"] } },
      { model: Produk },
      { model: Paket }
    ]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.post("/", mustLogin, mustBeAdmin, (req, res, next) => {
  Transaksi.create(req.body, {
    fields: ["id_user", "id_paket", "id_produk"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.put("/:id", mustLogin, mustBeAdmin, (req, res, next) => {
  Transaksi.update(req.body, {
    where: { id: req.params.id },
    fields: ["id_user", "id_paket", "id_produk"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.delete("/:id", mustLogin, mustBeAdmin, (req, res, next) => {
  Transaksi.destroy({
    where: { id: req.params.id }
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

module.exports = router;
