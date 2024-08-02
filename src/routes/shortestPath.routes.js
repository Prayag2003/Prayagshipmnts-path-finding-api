import { Router } from "express";
import { getShortestPath } from "../controllers/shortest-path.controller.js";
const shortestPathRouter = Router()

// NOTE: POST Request to register a road
shortestPathRouter.route("/shortest-path").post(
    getShortestPath
)

export default shortestPathRouter