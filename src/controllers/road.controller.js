import { Road } from "../models/road.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const registerRoad = asyncHandler(async (req, res) => {
    // NOTE: Steps 
    // 1. get the road details from req.body
    // 2. apply validation, if not empty 
    // 3. check if the road already exists in db(via startLocationId or endLocationId)
    // 4. create road object - create entry in DB 
    // 5. return the response 

    const { start_location_id, end_location_id, distance, traffic_condition } = req.body

    // Validation of the fields
    const fields = [start_location_id, distance, end_location_id];
    const areAllFieldsValid = fields.every(
        (field) => typeof field === "number" && !isNaN(field)
    );

    if (!areAllFieldsValid) {
        throw new ApiError(400, "All fields must be valid numbers.");
    }

    const existingRoad = await Road.findOne({
        $or: [{ start_location_id }, { end_location_id }]
    })

    if (existingRoad) {
        throw new ApiError(409, "Road with endLocationId or startLocationId already exists")
    }

    const road = await Road.create({
        startLocationId: start_location_id,
        endLocationId: end_location_id,
        distance: distance,
        trafficCondition: traffic_condition
    })

    return res.status(201)
        .json(
            new ApiResponse(
                200,
                road,
                "Road registered successfully!"
            )
        )
})

const getAllRoads = asyncHandler(async (req, res) => {
    const roads = await Road.find();
    return res.status(200).json(
        new ApiResponse(
            200,
            roads,
            "All roads retrieved successfully!"
        ));
});


const getRoadByName = asyncHandler(async (req, res) => {
    const { name } = req.params;

    const road = await Road.findOne({ name });

    if (!road) {
        throw new ApiError(404, "Road not found");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            road,
            "Road retrieved successfully!"
        )
    );
});

export {
    getAllRoads,
    registerRoad,
    getRoadByName
}