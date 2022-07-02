const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
    },
    checkin: {
        type: Date,
        required: true,
    },
    checkout: {
        type: Date,
        required: true,
    },
    adult: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true,
    },
    is_paid: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Booking", BookingSchema);
