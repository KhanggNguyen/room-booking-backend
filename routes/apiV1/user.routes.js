const express = require("express");
const router = express.Router();
const {
    register,
    login,
    refreshToken,
    getAddress,
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
} = require("../../controllers/apiV1/user.controller");

const {role, verifyJwtToken} = require("../../middleware/auth");

router.post("/register", register);

router.post("/refresh-token", refreshToken);

router.post("/login", login);

router.post("/logout", (req, res) => {});

//Addresses

router.get("/address/:addressId", getAddress);

router.get("/address", verifyJwtToken, getAddresses);

router.post("/address", addAddress);

router.put("/address", updateAddress);

router.delete("/address", deleteAddress);

module.exports = router;
