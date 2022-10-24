const express = require('express');
const  rootRouter = express.Router();
const cinemaRoute = require('./cinemaRoutes');
const movieRoute = require('./movieRoutes');
const ticketRoute = require('./ticketRoutes');
const userRoute = require('./userRoutes')


rootRouter.use('/QuanLyNguoiDung',userRoute);
rootRouter.use('/QuanLyRap',cinemaRoute);
rootRouter.use('/QuanLyPhim',movieRoute);
rootRouter.use('/QuanLyDatVe',ticketRoute);

module.exports = rootRouter;