const express = require('express');
const movieRoute = express.Router()
const movieControllers = require('../controllers/movieControllers')
const authControllers = require('../controllers/authControllers')
const multer = require('multer');
const maxSize = 1 * 1024 * 1024;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${process.cwd()}/public/images`)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + file.originalname
        cb(null, uniqueSuffix)
    }
})
const upload = multer({storage,limits: { fileSize: maxSize }}).single('hinhAnh')

movieRoute.get('/LayDanhSachBanner',movieControllers.getAllBanner);
movieRoute.get('/LayDanhSachPhim',movieControllers.getAllMovie);
movieRoute.get('/LayDanhSachPhimPhanTrang',movieControllers.getAllMoviePagination);
movieRoute.get('/LayDanhSachPhimTheoNgay',movieControllers.getMovieByDate);
movieRoute.get('/LayThongTinPhim',movieControllers.getMovieById);
movieRoute.post('/ThemPhimUploadHinh',authControllers.verifyTokenAdmin,upload,movieControllers.addMovieUploadImage);
movieRoute.put('/CapNhatPhimUpload',authControllers.verifyTokenAdmin,upload,movieControllers.updateMovieUploadImage);
movieRoute.delete('/XoaPhim',authControllers.verifyTokenAdmin,movieControllers.deleteMovie);
module.exports = movieRoute;