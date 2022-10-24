const express = require('express');
const cinemaRoute = express.Router()
const cinemaControllers = require('../controllers/cinemaControllers')
const authControllers = require('../controllers/authControllers')

cinemaRoute.get('/LayThongTinHeThongRap',cinemaControllers.getAllCinemaSystem);
cinemaRoute.get('/LayThongTinCumRapTheoHeThong',cinemaControllers.getAllCinemaCluster);
cinemaRoute.get('/LayThongTinLichChieuHeThongRap',cinemaControllers.getAllShowtimeCinemaSystem);
cinemaRoute.get('/LayThongTinLichChieuPhim',cinemaControllers.getAllShowtimeMovie);
module.exports = cinemaRoute;