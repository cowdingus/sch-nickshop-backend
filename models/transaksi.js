'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaksi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaksi.belongsTo(models.User, {
        foreignKey: 'id_user',
      });

      Transaksi.belongsTo(models.Paket, {
        foreignKey: 'id_paket',
      });
    }
  }
  Transaksi.init({
    id_user: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    id_paket: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Transaksi',
    underscored: true,
  });
  return Transaksi;
};
