const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const Mongoose = require("mongoose");
var jwt = require("jsonwebtoken");

//models & helpers
const Room = require("../../models/room.model");
const role = require("../../middleware/auth");
const verifyJwtToken = require("../../helpers/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/room/:slug", (req, res, next) => {});

router.get("/room", (req, res, next) => {});

router.get("/room/search/:name", (req, res, next) => {});

router.get("/room/type/:name", (req, res) => {});

//add room
router.post(
    "/room/add",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager),
    upload.single("image"),
    async (req, res) => {
        try {
            const name = req.body.name;
            const description = req.body.description;
            const floor = req.body.floor;
            const number = req.body.number;
            const room_type = req.body.room_type;
            const room_max_occupancy = req.body.room_max_occupancy;
            const image = req.file;
            const price = req.body.price;

            if (!name)
                return res
                    .status(400)
                    .json({ message: "You must enter name." });

            if (!room_type)
                return res
                    .status(400)
                    .json({ message: "You must enter room type." });

            if (!room_max_occupancy)
                return res
                    .status(400)
                    .json({ message: "You must enter room max occupancy." });

            if (!price)
                return res
                    .status(400)
                    .json({ message: "You must enter price." });

            const foundRoom = await Room.findOne({ floor, number });

            if (foundRoom)
                return res
                    .status(400)
                    .json({ message: "Room already exists." });

            let imageUrl = "";
            let imageKey = "";

            if (image) {
                const s3bucket = new AWS.S3({
                    access_key_id: process.env.AWS_ACCESS_KEY_ID,
                    secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
                    region: process.env.AWS_REGION,
                });

                const params = {
                    Bucket: process.env.AWS_BUCKET_NAME,
                    Key: image.originalname,
                    Body: image.buffer,
                    ContentType: image.mimetype,
                    ACL: "public-read",
                };

                const s3Upload = await s3bucket.upload(params).promise();

                imageUrl = s3Upload.Location;
                imageKey = s3Upload.key;
            }
        } catch (error) {
            return res.status.json({
                message: "Could not process the request. Please try again.",
            });
        }
    }
);

module.exports = router;