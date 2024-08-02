import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const locationSchema = new Schema({
    name: {
        type: Number,
        index: true
    },
    latitude: {
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
}, { timestamps: true })

locationSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
locationSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Road = mongoose.model("Road", locationSchema)