const createError = require("http-errors");

const Room = require("../../models/room.model");
const Booking = require('../../models/booking.model')

const { bookingValidate } = require("../../helpers/validation");
const { role } = require("../../middleware/auth");

/**
 * 
 * @param {string} req.query 
 * @param {json} res 
 * @param {callback} next 
 * @returns 
 */
module.exports.getBookings = async (req, res, next) => {
    try{
        let bookings = [];
        if(req.query.userid){
            bookings = await Booking.find({user: req.query.userid});
        }else if(req.user.role !== role.ROLES.Customer){
            bookings = await Booking.find();
        }

        return res.json({
            status: "success",
            elements: bookings,
        });
    }catch(error){
        next(error);
    }
}

module.exports.getBookingById = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        throw createError.BadRequest();
    }


    try{
        let booking = null;
        if([role.ROLES.Admin, role.ROLES.Manager].includes(req.user.role)){
            booking = await Booking.findOne({ _id: id });
        }else{
            booking = await Booking.findOne({ _id: id, user: req.user.userId });
        }

        if(!booking){
            throw createError.NotFound("Booking is not registered.");
        }

        return res.json({
            status: "success",
            elements: booking,
        });
    }catch(error){
        next(error);
    }
}

module.exports.createBooking = async (req, res, next) => {
    const { error } = bookingValidate(req.body);
    
    if (error) {
        throw createError(error);
    }

    const roomFound = await Room.findOne({_id: req.body.room})

    if(!roomFound){
        throw createError.BadRequest();
    }

    const checkinDate = new Date(req.body.checkin);
    const checkoutDate = new Date(req.body.checkout);
    const nights = Math.ceil(Math.abs(checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
    const amount = nights * roomFound.price + ((req.body.totalGuests-1) * 20);
    const booking = {user: req.user.userId, amount, nights,...req.body};

    try {
        const bookings = await Booking.find({room: req.body.room});
        const newBooking = new Booking(booking);

        if(!await newBooking.verifyDatesFormat()){
            throw createError.Conflict(`Date check in can not be after Date check out.`);
        }

        if(await newBooking.verifyPassedDates()){
            throw createError.Conflict(`Dates selected can not be in the past.`);
        }

        if(!await newBooking.verifySelectedDates(bookings)){
            throw createError.Conflict(`Dates selected is not available.`);
        }

        const savedBooking = await newBooking.save();

        return res.json({
            status: "success",
            elements: savedBooking,
        });
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

module.exports.updatePaidStatus = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        throw createError.BadRequest();
    }

    try{
        const updatedBooking = Booking.findOneAndUpdate({ _id: id }, [
            { $set: { isPaid: { $eq: [false, "$isPaid"] } } },
        ], {new: true});

        return res.json({
            status: "success",
            elements: updatedBooking,
        });
    }catch(error){
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
}

module.exports.deleteBooking = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        throw createError.BadRequest();
    }

    try{
        const deletedBooking = await Booking.findOneAndDelete({ _id: id });
        console.log(deletedBooking)
        return res.json({
            status: "success",
            elements: deletedBooking,
        });
    }catch(error){
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
}