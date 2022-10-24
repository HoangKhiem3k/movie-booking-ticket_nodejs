const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return cum_rap.init(sequelize, DataTypes);
}

class cum_rap extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maCumRap: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    tenCumRap: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    diaChi: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    maHeThongRap: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'he_thong_rap',
        key: 'maHeThongRap'
      }
    },
    hinhAnh: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cum_rap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maCumRap" },
        ]
      },
      {
        name: "maHeThongRap",
        using: "BTREE",
        fields: [
          { name: "maHeThongRap" },
        ]
      },
    ]
  });
  }
}
