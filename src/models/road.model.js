import mongoose, { Schema } from "mongoose";

const roadSchema = new Schema({
    startLocationId: {
        type: Number,
        index: true
    },
    endLocationId: {
        type: Number,
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

export const Road = mongoose.model("Road", roadSchema)