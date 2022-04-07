'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Paket.belongsTo(models.Produk);
    }
  }
  Paket.init({
    nama: {
      allowNull: false,
      type: DataTypes.STRING
    },
    harga: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id_produk: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Paket',
    underscored: true,
  });
  return Paket;
};
