const mongoose = require("mongoose");
const { Schema } = mongoose;
const slug = require("mongoose-slug-generator");

const options = {
    separator: "-",
    lang: "en",
    truncate: 120,
};

mongoose.plugin(slug, options);

const RoomSchema = new Schema({
    name: {
        type: String,
        minlength: 20,
        maxlength: 150,
        trim: true,
    },
    slug: {
        type: String,
        slug: "name",
    },
    floor: {
        type: Number,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        trim: true,
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    room_type: String,
    room_max_occupancy: Number,
    price: {
        type: Number,
        min: 1,
    },
    options:[String],
    extras: [String],
    updated: Date,
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Room", RoomSchema);
