const router = require('express').Router();

const { mustLogin } = require('../middlewares/mustLogin');

const { User } = require('../models');

router.delete('/:id', mustLogin, (req, res, next) => {
  User.destroy({ where: { id: req.params.id } })
    .then((result) => {
      res.json({ result });
    })
    .catch((error) => { next(error) });
});

router.put('/:id', mustLogin, (req, res, next) => {
  User.update(req.body, {
    where: {
      id: req.params.id
    },
    fields: ["username", "email", "password"]
  }).then((result) => {
    res.json({ result });
  }).catch((error) => { next(error) });
});

router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id, { attributes: { exclude: ["password"] } })
    .then((user) => {
      res.json({ result: user });
    })
    .catch((error) => { next(error) });
});

router.get('/', (_req, res, next) => {
  User.findAll({ attributes: { exclude: ["password"] } })
    .then((users) => {
      res.json({ result: users });
    })
    .catch((error) => { next(error) });
});

module.exports = router;
