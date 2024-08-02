import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
    name: {
        type: String,
        index: true
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
},
    { timestamps: true }
)

export const Location = mongoose.model("Location", locationSchema)