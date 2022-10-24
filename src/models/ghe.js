const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ghe.init(sequelize, DataTypes);
}

class ghe extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maGhe: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenGhe: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    loaiGhe: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    stt: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    giaVe: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    daDat: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    maLichChieu: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'phim_rap',
        key: 'maLichChieu'
      }
    }
  }, {
    sequelize,
    tableName: 'ghe',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maGhe" },
        ]
      },
      {
        name: "maLichChieu",
        using: "BTREE",
        fields: [
          { name: "maLichChieu" },
        ]
      },
    ]
  });
  }
}
