const createError = require("http-errors");

//models & helpers
const Room = require("../../models/room.model");

const { roomValidate } = require("../../helpers/validation");

const {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken,
} = require("../../middleware/auth");

module.exports.createRoom = async (req, res, next) => {
    const { error } = roomValidate(req.body);

    if (error) {
        throw createError(error);
    }

    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();

        return res.json({
            status: "success",
            elements: savedRoom,
        });
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

module.exports.updateRoom = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        throw createError.BadRequest();
    }

    const { error } = roomValidate(req.body);

    if (error) {
        throw createError(error);
    }

    try {
        const updatedRoom = await Room.findOneAndUpdate({ _id: id }, req.body, {
            new: true,
        });

        return res.json({
            status: "success",
            elements: updatedRoom,
        });
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

module.exports.updateAvailability = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        throw createError.BadRequest();
    }

    try {
        const updatedRoom = await Room.findOneAndUpdate({ _id: id }, [
            { $set: { isAvailable: { $eq: [false, "$isAvailable"] } } },
        ], {new: true});

        return res.json({
            status: "success",
            elements: updatedRoom,
        });
    } catch (error) {
        if (error.isJoi === true) error.status = 422;
        next(error);
    }
};

module.exports.deleteRoom = async (req, res, next) => {};

module.exports.getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find({});

        return res.json({
            status: "success",
            elements: rooms,
        });
    } catch (error) {
        next(error);
    }
};
/*
module.exports.getRoomByNumber = async (req, res, next) => {
    try {
        const { number } = req.params;

        if (!number) {
            throw createError.BadRequest();
        }

        const room = await Room.findOne({ number });

        if (!room) {
            throw createError.NotFound("Room is not registered.");
        }

        return res.json({
            status: "success",
            elements: room,
        });
    } catch (error) {
        next(error);
    }
};
*/
module.exports.getRoom = async (req, res, next) => {
    try {

        const { maxOccupancy, number } = req.query;

        if(maxOccupancy){
            
            const rooms = await Room.find({maxOccupancy: { $gte: maxOccupancy }})

            if(!rooms){
                throw createError.NotFound("No room match the requirements.");
            }

            return res.json({
                status: "success",
                elements: rooms,
            })
        }

        if(number){
            const room = await Room.findOne({ number });

            if (!room) {
                throw createError.NotFound("Room is not registered.");
            }

            return res.json({
                status: "success",
                elements: room,
            });
        }

        throw createError.BadRequest();
    }catch(error){
        next(error);
    }
    
}
