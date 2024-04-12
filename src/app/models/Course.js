const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: "name", unique: true },
        videoId: { type: String },
        level: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Course", Course);
