const express = require("express");
const router = express.Router();

//models & helpers
const { role, verifyJwtToken } = require("../../middleware/auth");
const {
    createBooking,
    getBookings,
    getBookingById,
    updatePaidStatus,
    deleteBooking,
} = require("../../controllers/apiV1/booking.controller");

router.get(
    "/",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager),
    getBookings
);

router.get(
    "/:id",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager, role.ROLES.Customer),
    getBookingById
);

router.post(
    "/",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager, role.ROLES.Customer),
    createBooking
);

router.put(
    "/paidStatus/:id",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin, role.ROLES.Manager),
    updatePaidStatus
);

router.delete(
    "/:id",
    verifyJwtToken,
    role.checkRole(role.ROLES.Admin),
    deleteBooking
);

module.exports = router;
