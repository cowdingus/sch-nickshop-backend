const router = require('express').Router();

const { mustLogin, mustBeAdmin } = require('../middlewares/must');

const { User } = require('../models');
const {filterProperties} = require('../utilities');

router.delete('/:id', mustLogin, (req, res, next) => {
  if (req.params.id !== req.user.id && req.user.role !== "admin") {
    res.status(403).json({message: "If you're not doing the operation for your own account, admin role required"});
    return;
  }

  User.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => { next(error) });
});

router.put('/:id', mustLogin, (req, res, next) => {
  if (req.params.id !== req.user.id && req.user.role !== "admin") {
    res.status(403).json({message: "If not deleting your own account, admin role required"});
    return;
  }

  User.update(req.body, {
    where: {
      id: req.params.id
    },
    fields: ["username", "email", "password"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.get('/:id', mustLogin, (req, res, next) => {
  if (req.params.id !== req.user.id && req.user.role !== "admin") {
    res.status(403).json({message: "If not fetching your own account, admin role required"});
    return;
  }

  User.findByPk(req.params.id, { attributes: { exclude: ["password"] } })
    .then((user) => {
      res.json({ result: user });
    })
    .catch((error) => { next(error) });
});

router.get('/', mustLogin, mustBeAdmin, (req, res, next) => {
  const query = filterProperties(req.query, ["username", "email", "role"]);

  User.findAll({ where: query, attributes: { exclude: ["password"] } })
    .then((users) => {
      res.json({ result: users });
    })
    .catch((error) => { next(error) });
});

router.post('/topup', mustLogin, (req, res, next) => {
  if (!req.body.jumlah) {
    res.status(400).json({ message: "`jumlah` field isn't defined" });
  }

  User.findByPk(req.user.id)
    .then((user) => {
      if (!user) {
        res.status(400).json({ message: "Logged-in user doesn't exist" });
      }

      user.update({
        saldo: user.saldo + parseInt(req.body.jumlah)
      }).then((result) => {
        res.json({ status: 1, message: "Berhasil Topup" });
      }).catch(err => next(err));
    }).catch(err => next(err));
});

module.exports = router;
