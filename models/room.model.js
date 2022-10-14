const mongoose = require("mongoose");
const { Schema } = mongoose;
const slug = require("mongoose-slug-generator");

const options = {
    separator: "-",
    lang: "en",
    truncate: 120,
};

mongoose.plugin(slug, options);

const RoomSchema = new Schema(
    {
        name: {
            type: String,
            minlength: 20,
            maxlength: 150,
            trim: true,
            required: true,
        },
        slug: {
            type: String,
            slug: "name",
        },
        number: {
            type: Number,
            required: true,
            unique: true,
        },
        description: {
            type: String,
            trim: true,
            required: true,
        },
        image: {
            type: String,
            trim: true,
        },
        maxOccupancy: { type: Number, min: 1, required: true },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        isAvailable: {
            type: Boolean,
            default: true,
        },
        options: [String],
        extras: [String],
        updated: Date,
        created: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Room", RoomSchema);
