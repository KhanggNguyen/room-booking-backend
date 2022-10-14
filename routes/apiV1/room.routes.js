const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const Mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

//models & helpers
const Room = require("../../models/room.model");
const {role, verifyJwtToken} = require("../../middleware/auth");

//controllers
const {
    getRoom,
    getRoomByNumber,
    getRooms,
    createRoom,
    updateRoom,
    updateAvailability,
    deleteRoom
} = require("../../controllers/apiV1/room.controller");

const storage = multer.memoryStorage();
const upload = multer({ storage });

//add room
router.post(
    "/",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager),
    createRoom
);

//router.get("/:number", getRoomByNumber);

router.get("/", getRooms);

router.get("/search", getRoom);

router.put(
    "/:id",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager),
    updateRoom
);

router.put(
    "/availability/:id",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager),
    updateAvailability
);

router.delete(
    "/:id",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin),
    async (req, res, next) => {}
);

module.exports = router;
