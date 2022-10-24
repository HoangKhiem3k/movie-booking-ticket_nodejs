const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return nguoi_dung.init(sequelize, DataTypes);
}

class nguoi_dung extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maNguoiDung: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    taiKhoan: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    matKhau: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    soDt: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    maNhom: {
      type: DataTypes.STRING(10),
      allowNull: true,
      defaultValue: "GP01"
    },
    maLoaiNguoiDung: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "KhachHang"
    },
    hoTen: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'nguoi_dung',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maNguoiDung" },
        ]
      },
    ]
  });
  }
}
