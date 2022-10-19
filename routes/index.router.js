const express = require('express')
const router = new express.Router()

const roomRoutes = require('./apiV1/room.routes');
const userRoutes = require('./apiV1/user.routes');
const bookingRoutes = require('./apiV1/booking.routes');

router.use('/booking', bookingRoutes);
router.use('/room', roomRoutes);
router.use('/user', userRoutes);

module.exports = router;