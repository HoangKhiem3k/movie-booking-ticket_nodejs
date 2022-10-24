const initModel = require('../models/init-models');
const sequelize = require('../models/index');
const model = initModel(sequelize);




// Lay Danh Sach Banner
const getAllBanner = async (req, res) => {
    try{
        const result = await model.banner.findAll();
        if(result.length===0) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy banner'
            })
        }else{
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
                content: result
            })
        }
    }catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}

// Lay Danh Sach Phim
const getAllMovie = async (req, res) => {
    try {
        const { tenPhim } = req.body;
        const [results, metadata] = await sequelize.query(
            `SELECT * FROM phim WHERE tenPhim LIKE '%${tenPhim}%'`,
            { tupleFormat: 'array' }
        );
        if (results.length === 0) {
            res.send({
                statusCode: 400,
                message: 'Không tìm thấy kết quả nào!'
            });
        } else {
            
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
                content: results
            });
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại, lỗi server!'
        });
        console.log(err);
    }
}

// Lay Thong Tin Phim
const getMovieById = async (req, res) => {
    try {
        const { maPhim } = req.body;
        const result = await model.phim.findOne({
            where: {
                maPhim
            }
        });
        if (result === null) {
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy kết quả nào!'
            });
        } else {
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
                content: result
            });
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại, lỗi server!'
        });
        console.log(err);
    }
}

// Lay Danh Sach Phim Phan Trang
const getAllMoviePagination = async (req, res) => {
    try {
        const { tenPhim, soTrang, soPhanTuTrenTrang } = req.body;
        const page = parseInt(soTrang);
        const limit = parseInt(soPhanTuTrenTrang);
        const [results, metadata] = await sequelize.query(
            `SELECT * FROM phim WHERE tenPhim LIKE '%${tenPhim}%' LIMIT ${limit} OFFSET ${(page - 1) * limit}`,
            { tupleFormat: 'array' }
        );
        if (results.length === 0) {
            res.send({
                statusCode: 400,
                message: 'Không tìm thấy kết quả nào!'
            });
        } else {
            res.send({
                statusCode: 200,
                message: 'Tìm kiếm thành công!',
                content: results
            });
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Tìm kiếm thất bại, lỗi server!'
        });
        console.log(err);
    }
}

// Lay Danh Sach Phim Theo Ngay
const getMovieByDate = async (req, res) => {
    try {
        const { ngayKhoiChieu } = req.body;
        const [results, metadata] = await sequelize.query(
            `SELECT * FROM phim WHERE ngayKhoiChieu = '${ngayKhoiChieu}'`,
            { tupleFormat: 'array' }
        );
        if (results.length === 0) {
            res.send({
                statusCode: 400,
                message: 'Không tìm thấy kết quả nào!'
            });
        } else {
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!',
                content: results
            });
        }
    } catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại, lỗi server!'
        });
        console.log(err);
    }
}

// Them Phim Upload Hinh
const addMovieUploadImage = async (req, res) => {
    try{
        const {tenPhim,biDanh,trailer,moTa,ngayKhoiChieu,sapChieu,dangChieu,hot,danhGia} = req.body;
        const movieModel = {
            tenPhim,
            biDanh,
            trailer,
            moTa,
            ngayKhoiChieu,
            sapChieu,
            dangChieu,
            hot,
            danhGia,
            hinhAnh: `${process.env.DOMAIN}/public/images/${req.file.filename}`
        }
        const result = await model.phim.create(movieModel);
        const data = {
            statusCode: 200,
            message: 'Xử lý thành công!',
            content: result
        }
        res.send(data);
    }catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}

// Cap Nhat Phim UpLoad Hinh
const updateMovieUploadImage = async (req, res) => {
    try{
        const {maPhim,tenPhim,biDanh,trailer,moTa,ngayKhoiChieu,sapChieu,dangChieu,hot,danhGia} = req.body;
        const movieModel = {
            tenPhim,
            biDanh,
            trailer,
            moTa,
            ngayKhoiChieu,
            sapChieu,
            dangChieu,
            hot,
            danhGia,
            hinhAnh: `${process.env.DOMAIN}/public/images/${req.file.filename}`
        }
        await model.phim.update(movieModel,{
            where: {
                maPhim
            }
        });
        const result = await model.phim.findOne({where: {
            maPhim
        }});
        const data = {
            statusCode: 200,
            message: 'Xử lý thành công!',
            content: result
        }
        res.send(data);
    }catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}

// Xoa Phim
const deleteMovie = async (req, res) => {
    try{
        const { maPhim } = req.body;
        const result = await model.phim.destroy({
            where: {
                maPhim
            }
        });
        if(result===0){
            res.send({
                statusCode: 404,
                message: 'Không tìm thấy phim!'
            })
        }else{
            res.send({
                statusCode: 200,
                message: 'Xử lý thành công!'
            })
        }
    }catch (err) {
        res.send({
            statusCode: 500,
            message: 'Xử lý thất bại!'
        });
        console.log(err);
    }
}
module.exports = {
    getAllBanner,
    getAllMovie,
    getAllMoviePagination,
    getMovieByDate,
    getMovieById,
    addMovieUploadImage,
    updateMovieUploadImage,
    deleteMovie
}