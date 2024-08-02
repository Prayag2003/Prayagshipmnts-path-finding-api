import { Location } from "../models/location.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerLocation = asyncHandler(async (req, res) => {
    // NOTE: Steps 
    // 1. get the road details from req.body
    // 2. apply validation, if not empty 
    // 3. check if the road already exists in db(via startLocationId or endLocationId)
    // 4. create road object - create entry in DB 
    // 5. return the response 

    const { name, latitude, longitude } = req.body

    // Validation of the fields
    const fields = [longitude, latitude];
    const areAllFieldsValid = fields.every(
        (field) => typeof field === "number" && !isNaN(field)
    );

    if (!areAllFieldsValid) {
        throw new ApiError(400, "All fields must be valid numbers.");
    }

    const existingRoad = await Location.findOne({
        $or: [{ latitude }, { longitude }]
    })

    if (existingRoad) {
        throw new ApiError(409, "Location with latitude or longitude already exists")
    }

    const road = await Location.create({
        name: name,
        latitude: latitude,
        longitude: longitude,
    })

    return res.status(201)
        .json(
            new ApiResponse(
                200,
                road,
                "Location registered successfully!"
            )
        )
})

export {
    registerLocation
}

