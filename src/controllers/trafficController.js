import { Road } from '../models/Road.js';
import { TrafficUpdate } from '../models/TrafficUpdate.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const updateTrafficCondition = asyncHandler(async (req, res) => {
    const { road_id, timestamp, traffic_condition } = req.body;

    if (!road_id || !timestamp || !traffic_condition) {
        throw new ApiError(400, 'road_id, timestamp, and traffic_condition are required.');
    }

    const road = await Road.findById(road_id);
    if (!road) {
        throw new ApiError(404, 'Road not found.');
    }

    const trafficUpdate = await TrafficUpdate.create({
        road_id,
        timestamp,
        traffic_condition
    });

    road.traffic_condition = traffic_condition;
    await road.save();

    res.status(201).json(new ApiResponse(201, trafficUpdate, 'Traffic update created successfully.'));
});

export { updateTrafficCondition };

