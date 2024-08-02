import { Road } from "../models/road.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getShortestPath = asyncHandler(async (req, res) => {
    const { startLocationId, endLocationId } = req.query;

    if (!startLocationId || !endLocationId) {
        throw new ApiError(400, "Start and end location IDs are required.");
    }

    const roads = await Road.find();

    const graph = {};

    roads.forEach(road => {
        const start = road.startLocationId.toString();
        const end = road.endLocationId.toString();

        if (!graph[start]) graph[start] = {};
        if (!graph[end]) graph[end] = {};

        graph[start][end] = road.distance * getTrafficWeight(road.traffic_condition);
        graph[end][start] = road.distance * getTrafficWeight(road.traffic_condition);
    });

    const pathData = dijkstra(graph, startLocationId, endLocationId);

    if (!pathData) {
        throw new ApiError(404, "No path found between the specified locations.");
    }

    res.status(200).json(new ApiResponse(200, pathData, "Shortest path calculated successfully."));
});

const getTrafficWeight = (trafficCondition) => {
    const weights = {
        clear: 1,
        moderate: 5,
        heavy: 10
    };
    return weights[trafficCondition] || 1;
};

const dijkstra = (graph, start, end) => {
    const distances = {};
    const previous = {};
    const queue = new Set(Object.keys(graph));

    distances[start] = 0;

    queue.forEach(vertex => {
        if (vertex !== start) {
            distances[vertex] = Infinity;
        }
        previous[vertex] = null;
    });

    while (queue.size) {
        const u = Array.from(queue).reduce((min, vertex) => (
            distances[vertex] < distances[min] ? vertex : min
        ), Array.from(queue)[0]);

        queue.delete(u);

        if (u === end) {
            const path = [];
            let temp = end;
            while (previous[temp]) {
                path.push(temp);
                temp = previous[temp];
            }
            path.push(start);
            path.reverse();

            const total_distance = distances[end];
            const estimated_time = total_distance * 3;

            return {
                path,
                total_distance,
                estimated_time
            };
        }

        for (const neighbor in graph[u]) {
            const alt = distances[u] + graph[u][neighbor];
            if (alt < distances[neighbor]) {
                distances[neighbor] = alt;
                previous[neighbor] = u;
            }
        }
    }

    return null;
};

export { getShortestPath };
