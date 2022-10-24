const initModel = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModel(sequelize);
const authController = require('./authControllers');

// Lay Thong Tin He Thong Rap
const getAllCinemaSystem = async (req, res) => {
    try {
        const { maHeThongRap } = req.body;
        const [result] = await sequelize.query(`SELECT * FROM he_thong_rap WHERE maHeThongRap like '%${maHeThongRap}%'`);
        if (result.length === 0) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy hệ thống rạp'
            })
        } else {
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
                content: result
            })
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}

// Lay Thong Tin Cum Rap Theo He Thong
const getAllCinemaCluster = async (req, res) => {
    try {
        const { maHeThongRap } = req.body;
        const result = await model.cum_rap.findAll({
            where: {
                maHeThongRap
            },
            include: [{
                model: model.rap,
                as: 'danhSachRap',
            }],
            // raw: true,
            // nest: true

        })
        if (result.length === 0) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy cụm rạp'
            })
        } else {
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
                content: result
            })
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}

// Lay Thong Tin Lich Chieu He Thong Rap
const getAllShowtimeCinemaSystem = async (req, res) => {
    try {
        const { maHeThongRap } = req.body;
        const result = await model.he_thong_rap.findAll({
            where: {
                maHeThongRap
            },
            // raw: true,
            // nest: true
            include: [{
                model: model.cum_rap,
                as: 'lstCumRap',
                attributes: ['maCumRap', 'tenCumRap', 'diaChi', 'hinhAnh'],
                include: [{
                    model: model.rap,
                    as: 'lstRap',
                    attributes: ['maRap', 'tenRap'],
                    include: {
                        model: model.phim_rap,
                        as: 'lichChieu',
                        include: [{ model: model.phim, as: "phim" }, { model: model.ghe, as: "ghes" }],
                    }
                }]
            }]
        })
        if (result.length === 0) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy hệ thống rạp'
            })
        } else {
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
                content: result
            })
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}

// Lay Thong Tin Lich Chieu Phim
const getAllShowtimeMovie = async (req, res) => {
    try {
        const { maPhim } = req.body;
        const checkPhim = await model.phim.findOne({
            where: {
                maPhim
            }
        });
        if (!checkPhim) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy phim'
            })
        } else {
            // const result = await model.phim.findAll({
            //     where: {
            //         maPhim
            //     },
            //     // raw: true,
            //     // nest: true
            //     include: [{
            //         model: model.phim_rap,
            //         as: 'lichChieu',
            //         include: { model: model.rap, as: "maRap_rap" },
            //     }]
            // })
            const result = await sequelize.query(`SELECT he_thong_rap.maHeThongRap,tenHeThongRap,he_thong_rap.biDanh,logo,cum_rap.maCumRap,tenCumRap,diaChi,cum_rap.hinhAnh,rap.maRap,tenRap,phim_rap.maLichChieu,ngayChieuGioChieu,thoiLuong,phim.maPhim,tenPhim,phim.biDanh FROM he_thong_rap inner join cum_rap on he_thong_rap.maHeThongRap = cum_rap.maHeThongRap inner join rap on cum_rap.maCumRap = rap.maCumRap inner join phim_rap on rap.maRap = phim_rap.maRap inner join phim on phim.maPhim = phim_rap.maPhim WHERE phim.maPhim = ${maPhim}`);
            if (result.length === 0) {
                res.send({
                    statusCode: 404,
                    message: 'Không tìm thấy phim'
                })
            } else {
                res.send({
                    statusCode: 200,
                    message: 'Xử lý thành công!',
                    content: result
                })
            }
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}
module.exports = {
    getAllCinemaSystem,
    getAllCinemaCluster,
    getAllShowtimeCinemaSystem,
    getAllShowtimeMovie
}