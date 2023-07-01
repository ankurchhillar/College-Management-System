const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        comment: String,
        blog: { type: mongoose.Schema.Types.ObjectsId, ref: "Blog" },
        userId: { type: mongoose.Schema.Types.ObjectsId, ref: "User" },
    },
    { timestamps: true },
);