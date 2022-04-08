'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Transaksi, {
        foreignKey: "id_user"
      });
    }
  }
  User.init({
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', bcrypt.hashSync(value, saltRounds));
      }
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM,
      values: ['admin', 'member'],
      defaultValue: 'member'
    },
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
  });
  return User;
};
