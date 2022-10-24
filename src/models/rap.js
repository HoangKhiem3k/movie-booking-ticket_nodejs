const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return rap.init(sequelize, DataTypes);
}

class rap extends Sequelize.Model {
  static init(sequelize, DataTypes) {
  return super.init({
    maRap: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    tenRap: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    maCumRap: {
      type: DataTypes.STRING(50),
      allowNull: true,
      references: {
        model: 'cum_rap',
        key: 'maCumRap'
      }
    }
  }, {
    sequelize,
    tableName: 'rap',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "maRap" },
        ]
      },
      {
        name: "maCumRap",
        using: "BTREE",
        fields: [
          { name: "maCumRap" },
        ]
      },
    ]
  });
  }
}
