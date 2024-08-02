import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";

const roadSchema = new Schema({
    startLocationId: {
        type: Number,
        index: true
    },
    endLocationId: {
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    trafficCondition: {
        type: String,
        enum: ["CLEAR", "MODERATE", "HIGH"]
    }
}, { timestamps: true })

roadSchema.methods.generateAccessToken = function () {
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
roadSchema.methods.generateRefreshToken = function () {
    // light weight
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Road = mongoose.model("Road", roadSchema)