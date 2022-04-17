'use strict';
const {
  Model
} = require('sequelize');

const fs = require('fs');
const path = require('path');

module.exports = (sequelize, DataTypes) => {
  class Produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Produk.hasMany(models.Paket, {
        foreignKey: 'id_produk',
        as: 'paket_paket'
      });

      Produk.hasMany(models.Transaksi, {
        foreignKey: 'id_produk'
      });
    }
  }
  Produk.init({
    nama: {
      allowNull: false,
      type: DataTypes.STRING
    },
    deskripsi: {
      allowNull: false,
      type: DataTypes.STRING
    },
    img_path: {
      allowNull: false,
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Produk',
    underscored: true,
    hooks: {
      afterDestroy: (produk, _options) => {
        let imagePath = path.join(__dirname, "../public", produk.img_path);
        console.log(imagePath);
        fs.unlink(imagePath, err => console.error(err));
      },
      afterUpdate: (produk, _options) => {
        let imagePath = path.join(__dirname, "../public", produk.previous("img_path"));
        fs.unlink(imagePath, err => console.error(err));
      }
    }
  });
  return Produk;
};
