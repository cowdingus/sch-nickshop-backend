const router = require('express').Router();

const { mustLogin, mustBeAdmin } = require('../middlewares/must');

const { User } = require('../models');

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

router.get('/:id', mustLogin, mustBeAdmin, (req, res, next) => {
  User.findByPk(req.params.id, { attributes: { exclude: ["password"] } })
    .then((user) => {
      res.json({ result: user });
    })
    .catch((error) => { next(error) });
});

router.get('/', mustLogin, mustBeAdmin, (_req, res, next) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((users) => {
      res.json({ result: users });
    })
    .catch((error) => { next(error) });
});

module.exports = router;
