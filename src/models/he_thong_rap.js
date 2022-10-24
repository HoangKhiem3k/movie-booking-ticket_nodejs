const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return he_thong_rap.init(sequelize, DataTypes);
}

class he_thong_rap extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maHeThongRap: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    tenHeThongRap: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    biDanh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    logo: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'he_thong_rap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maHeThongRap" },
        ]
      },
    ]
  });
  }
}
