'use strict';
const {
  Model
} = require('sequelize');
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
  });
  return Produk;
};
