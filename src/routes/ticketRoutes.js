const express = require('express');
const ticketRoute = express.Router()
const ticketControllers = require('../controllers/ticketControllers')
const authControllers = require('../controllers/authControllers')

ticketRoute.post('/TaoLichChieu',ticketControllers.createShowtime);
// ticketRoute.get('/LayDanhSachNguoiDungPhanTrang',authControllers.verifyToken,ticketControllers.getticketPagination);


module.exports = ticketRoute;