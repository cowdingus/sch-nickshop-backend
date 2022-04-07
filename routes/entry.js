const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { Op } = require('sequelize');

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      [Op.or]: [{ username: req.body.username }, { email: req.body.username }]
    },
  }).then((user) => {
    if (user === null) {
      res.status(403).json({ message: 'Wrong username or password' });
      return;
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(403).json({ message: 'Wrong username or password' });
      return;
    }

    jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
      },
      process.env.SECRET_KEY,
      (err, token) => {
        if (err) {
          res.status(500).json({message: err.message});
          return;
        }

        res.json({
          type: "Bearer",
          token: token
        });
      }
    );
  }).catch((error) => {
    next(error);
  });
});

router.post('/signup', (req, res, next) => {
  User.create(req.body, { fields: ['username', 'email', 'password'] })
    .then((user) => {
      res.json({
        result: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    })
    .catch((error) => { next(error) });
});

module.exports = router;
