const DataTypes = require("sequelize").DataTypes;
const _banner = require("./banner");
const _cum_rap = require("./cum_rap");
const _ghe = require("./ghe");
const _he_thong_rap = require("./he_thong_rap");
const _loai_nguoi_dung = require("./loai_nguoi_dung");
const _nguoi_dung = require("./nguoi_dung");
const _phim = require("./phim");
const _phim_rap = require("./phim_rap");
const _rap = require("./rap");
const _ve = require("./ve");

function initModels(sequelize) {
  const banner = _banner(sequelize, DataTypes);
  const cum_rap = _cum_rap(sequelize, DataTypes);
  const ghe = _ghe(sequelize, DataTypes);
  const he_thong_rap = _he_thong_rap(sequelize, DataTypes);
  const loai_nguoi_dung = _loai_nguoi_dung(sequelize, DataTypes);
  const nguoi_dung = _nguoi_dung(sequelize, DataTypes);
  const phim = _phim(sequelize, DataTypes);
  const phim_rap = _phim_rap(sequelize, DataTypes);
  const rap = _rap(sequelize, DataTypes);
  const ve = _ve(sequelize, DataTypes);

  rap.belongsTo(cum_rap, { as: "maCumRap_cum_rap", foreignKey: "maCumRap"});
  rap.hasMany(phim_rap, { as: "lichChieu", foreignKey: "maRap"});
  cum_rap.hasMany(rap, { as: "danhSachRap", foreignKey: "maCumRap"});
  cum_rap.hasMany(rap, { as: "lstRap", foreignKey: "maCumRap"});
  cum_rap.belongsTo(he_thong_rap, { as: "maHeThongRap_he_thong_rap", foreignKey: "maHeThongRap"});
  he_thong_rap.hasMany(cum_rap, { as: "lstCumRap", foreignKey: "maHeThongRap"});
  ve.belongsTo(nguoi_dung, { as: "maNguoiDung_nguoi_dung", foreignKey: "maNguoiDung"});
  nguoi_dung.hasMany(ve, { as: "ves", foreignKey: "maNguoiDung"});
  phim_rap.belongsTo(phim, { as: "phim", foreignKey: "maPhim"});
  phim_rap.belongsTo(rap, { as: "maRap_rap", foreignKey: "maRap"});
  phim_rap.hasMany(ghe, { as: "ghes", foreignKey: "maLichChieu"});
  phim.hasMany(phim_rap, { as: "lichChieu", foreignKey: "maPhim"});
  ve.belongsTo(phim, { as: "maPhim_phim", foreignKey: "maPhim"});
  phim.hasMany(ve, { as: "ves", foreignKey: "maPhim"});
  ghe.belongsTo(phim_rap, { as: "maLichChieu_phim_rap", foreignKey: "maLichChieu"});



  return {
    banner,
    cum_rap,
    ghe,
    he_thong_rap,
    loai_nguoi_dung,
    nguoi_dung,
    phim,
    phim_rap,
    rap,
    ve,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
