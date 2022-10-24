const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return phim_rap.init(sequelize, DataTypes);
}

class phim_rap extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maLichChieu: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maRap: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'rap',
        key: 'maRap'
      }
    },
    maPhim: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'phim',
        key: 'maPhim'
      }
    },
    ngayChieuGioChieu: {
      type: DataTypes.DATE,
      allowNull: true
    },
    thoiLuong: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'phim_rap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maLichChieu" },
        ]
      },
      {
        name: "FK_rap_phim_2",
        using: "BTREE",
        fields: [
          { name: "maPhim" },
        ]
      },
      {
        name: "FK_rap_phim_1",
        using: "BTREE",
        fields: [
          { name: "maRap" },
        ]
      },
    ]
  });
  }
}
