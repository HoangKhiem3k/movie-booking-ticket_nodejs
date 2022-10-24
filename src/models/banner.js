const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return banner.init(sequelize, DataTypes);
}

class banner extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maBanner: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    maPhim: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hinhAnh: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'banner',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maBanner" },
        ]
      },
    ]
  });
  }
}
