const express = require('express');
const userRoute = express.Router()
const userControllers = require('../controllers/userControllers')
const authControllers = require('../controllers/authControllers')

userRoute.get('/LayDanhSachNguoiDung',userControllers.getAllUser);
userRoute.get('/LayDanhSachNguoiDungPhanTrang',authControllers.verifyToken,userControllers.getUserPagination);
userRoute.get('/LayDanhSachLoaiNguoiDung',userControllers.getUserType);
userRoute.post('/DangKy',userControllers.signUp);
userRoute.post('/DangNhap',userControllers.signIn);
userRoute.post('/ThemNguoiDung',authControllers.verifyTokenAdmin,userControllers.createUser);
userRoute.put('/CapNhatThongTinNguoiDung/:maNguoiDung',authControllers.verifyTokenAdmin,userControllers.updateUser);
userRoute.delete('/XoaNguoiDung/:taiKhoan',authControllers.verifyTokenAdmin,userControllers.deleteUser);
userRoute.get('/TimKiemNguoiDung',authControllers.verifyToken,userControllers.searchUser);
userRoute.get('/TimKiemNguoiDungPhanTrang',authControllers.verifyToken,userControllers.searchUserPagination);

module.exports = userRoute;