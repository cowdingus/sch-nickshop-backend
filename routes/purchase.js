const router = require('express').Router();

const { mustLogin } = require('../middlewares/must');
const { Transaksi, User, Paket } = require("../models");

router.post("/:item_id", mustLogin, (req, res, next) => {
  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(400).json({message: "Logged in user id doesn't exist, try logging out"})
      }

      Paket.findByPk(req.params.item_id)
        .then((paket) => {
          if (user.saldo < paket.harga) {
            res.json({status: "saldo_kurang", message: "Saldo anda kurang"})
            return
          }

          Transaksi.create({
            id_paket: req.params.item_id,
            id_user: req.user.id
          }).then((_result) => {
            user.update({
              saldo: user.saldo - paket.harga
            }).then((result) => {
              res.json({ status: 1, message: "Pembelian berhasil!", sisa_saldo: result.saldo })
            }).catch(err => next(err));
          }).catch(err => next(err));
        }).catch(err => next(err));
    }).catch(err => next(err));
});

module.exports = router;
