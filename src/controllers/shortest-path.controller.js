import { Road } from "../models/road.model.js";
import Dijkstra from 'dijkstrajs';

const buildGraph = async () => {
    const roads = await Road.find();
    const graph = new Dijkstra();

    roads.forEach(road => {
        const weight = getTrafficWeight(road.trafficCondition);
        graph.addEdge(
            road.startLocationId.toString(),
            road.endLocationId.toString(),
            road.distance + weight
        );
        graph.addEdge(
            road.endLocationId.toString(),
            road.startLocationId.toString(),
            road.distance + weight
        );
    });

    return graph;
};

const getTrafficWeight = (condition) => {
    switch (condition) {
        case 'CLEAR':
            return 1;
        case 'MODERATE':
            return 5;
        case 'HEAVY':
            return 10;
        default:
            return 1;
    }
};

const getShortestPath = asyncHandler(async (req, res) => {

    const { start_location_id, end_location_id } = req.query;

    if (!start_location_id || !end_location_id) {
        throw new ApiError(400, "Missing required parameters");
    }

    const graph = await buildGraph();
    const shortestPath = graph.shortestPath(
        start_location_id.toString(),
        end_location_id.toString()
    );

    if (!shortestPath) {
        throw new ApiError(404, "No path exists between the two locations");
    }

    const totalDistance = shortestPath.reduce(
        (sum, id, index, array) => {
            if (index < array.length - 1) {
                const edge = graph.getEdge(id, array[index + 1]);
                return sum + (edge ? edge.weight : 0);
            }
            return sum;
        }, 0);

    const estimatedTime = totalDistance / 50;

    return res.status(200).json({
        path: shortestPath,
        total_distance: totalDistance,
        estimated_time: Math.round(estimatedTime)
    });
});

export { getShortestPath };
