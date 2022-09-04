const express = require("express");
const router = express.Router();
const { register, getAddress, getAddresses, addAddress, updateAddress, deleteAddress } = require("../../controllers/apiV1/user.controller");

const role = require("../../middleware/auth");
const verifyJwtToken = require("../../helpers/auth");

router.post("/register", register);

router.post("/refresh-token", (req, res, next) => {});

router.post("/login", (req, res, next) => {});

router.post("/logout", (req, res) => {});

//Addresses

router.get("/address/:addressId", getAddress);

router.get("/address", getAddresses);

router.post("/address", addAddress);

router.put("/address", updateAddress);

router.delete("/address", deleteAddress);

module.exports = router;
