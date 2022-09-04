const express = require('express')
const router = new express.Router()

//const { roomRoutes } = require('./apiV1/room.routes');

//router.use('/room', roomRoutes)

const userRoutes = require('./apiV1/user.routes');


router.use('/user', userRoutes);

module.exports = router;