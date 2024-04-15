const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongooseDelete = require('mongoose-delete');

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

// Add plugins
mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: "all"
})

module.exports = mongoose.model("Course", Course);
