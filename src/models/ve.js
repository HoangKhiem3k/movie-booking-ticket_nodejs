const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return ve.init(sequelize, DataTypes);
}

class ve extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maVe: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maNguoiDung: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'nguoi_dung',
        key: 'maNguoiDung'
      }
    },
    maPhim: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'phim',
        key: 'maPhim'
      }
    }
  }, {
    sequelize,
    tableName: 've',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maVe" },
        ]
      },
      {
        name: "FK_nguoi_dung_phim_1",
        using: "BTREE",
        fields: [
          { name: "maNguoiDung" },
        ]
      },
      {
        name: "FK_nguoi_dung_phim_2",
        using: "BTREE",
        fields: [
          { name: "maPhim" },
        ]
      },
    ]
  });
  }
}
