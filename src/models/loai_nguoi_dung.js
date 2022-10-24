const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return loai_nguoi_dung.init(sequelize, DataTypes);
}

class loai_nguoi_dung extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maLoaiNguoiDung: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    tenLoai: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'loai_nguoi_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maLoaiNguoiDung" },
        ]
      },
    ]
  });
  }
}
