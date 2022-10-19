const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookingSchema = new Schema({
    room: {
        type: Schema.Types.ObjectId,
        ref: "Room",
        required: [true, "Room is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    checkin: {
        type: Date,
        required: [true, "Checkin date is required"],
    },
    checkout: {
        type: Date,
        required: [true, "Checkout date is required"],
    },
    nights: {
        type: Number,
        required: [true, "Number of nights is required"],
    },
    amount: {
        type: Number,
        required: [true, "Total amount is required"],
    },
    totalGuests: {
        type: Number,
        required: [true, "Number of guests is required"],
    },
    adult: {
        type: Number,
        default: 0,
    },
    children: {
        type: Number,
        default: 0,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

BookingSchema.methods.verifyDatesFormat = async function (){
    return new Date(this.checkin) < new Date(this.checkout);
}

BookingSchema.methods.verifyPassedDates = async function(){
    return new Date(this.checkin) <= new Date() || new Date(this.checkout) <= new Date();
}

BookingSchema.methods.verifySelectedDates = async function(bookings) {
    try {
        const newCheckinDate = new Date(this.checkin);
        const newCheckoutDate = new Date(this.checkout);

        let isAvailable = true;
        bookings.forEach((booking) => {
            const checkinDate = new Date(booking.checkin);
            const checkoutDate = new Date(booking.checkout);

            if (
                (newCheckinDate <= checkinDate &&
                    newCheckoutDate >= checkinDate) || //start in date range
                (newCheckinDate >= checkoutDate &&
                    newCheckoutDate <= checkoutDate) || //end in date range
                (newCheckinDate <= checkinDate &&
                    newCheckoutDate >= checkoutDate) || // start and end between date range
                (newCheckinDate >= checkinDate &&
                    newCheckoutDate <= checkoutDate) // date range included in start and end
            ) {
                isAvailable = false;
            }
        });
        return isAvailable;
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = mongoose.model("Booking", BookingSchema);
