import { Parser } from 'json2csv';
import { Road } from '../models/road.model.js';
import { TrafficUpdate } from '../models/trafficUpdate.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getTrafficCondition = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const road = await Road.findById(id);
    if (!road) {
        throw new ApiError(404, 'Road not found.');
    }

    res.status(200).json(new ApiResponse(200, road.traffic_condition, 'Current traffic condition retrieved successfully.'));
});

const generateTrafficReport = asyncHandler(async (req, res) => {
    const trafficUpdates = await TrafficUpdate.find();

    const fields = ['road_id', 'timestamp', 'traffic_condition'];
    const opts = { fields };
    const parser = new Parser(opts);
    const csv = parser.parse(trafficUpdates);

    res.header('Content-Type', 'text/csv');
    res.attachment('traffic_report.csv');
    res.send(csv);
});

export { generateTrafficReport, getTrafficCondition };

