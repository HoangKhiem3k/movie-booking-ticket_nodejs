const initModel = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModel(sequelize);
const authController = require('./authControllers');

// Tao Lich Chieu
const createShowtime = async (req, res) => {
    try {
        const { maRap, maPhim, ngayChieuGioChieu, giaVe,thoiLuong } = req.body;
        const checkMaRap = await model.rap.findOne({
            where: {
                maRap
            }
        })
        const checkMaPhim = await model.phim.findOne({
            where: {
                maPhim
            }
        })
        if(!checkMaRap) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy rạp'
            })
        }else if(!checkMaPhim) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy phim'
            })
        }else{
            const modelPhimRap = {
                maRap,maPhim,ngayChieuGioChieu,thoiLuong
            }
            const result = await model.phim_rap.create(modelPhimRap)
            const maLichChieuLast = result.dataValues.maLichChieu;
            let giaVeVip = giaVe + 200
            await sequelize.query(`insert into ghe(tenGhe,loaiGhe,stt,giaVe,daDat,maLichChieu) values ('A1','Thuong','01','${giaVe}',false,'${maLichChieuLast}'),('A2','Thuong','02','${giaVe}',false,'${maLichChieuLast}'),('B1','Thuong','03','${giaVe}',false,'${maLichChieuLast}'),('B2','Thuong','04','${giaVeVip}',false,'${maLichChieuLast}')`)
            
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
            })
        
        }
    }
       
    catch (err) {
        res.send({
            statusCode: 500,
            message: 'Thất bại, lỗi server!'
        });
        console.log(err);
    }
    
}
module.exports = {
    createShowtime
}