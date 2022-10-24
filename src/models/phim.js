const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return phim.init(sequelize, DataTypes);
}

class phim extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maPhim: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenPhim: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    biDanh: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    trailer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    hinhAnh: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    moTa: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    maNhom: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "GP01"
    },
    hot: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    dangChieu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    },
    sapChieu: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 1
    },
    ngayKhoiChieu: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    danhGia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    daXoa: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'phim',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maPhim" },
        ]
      },
    ]
  });
  }
}
