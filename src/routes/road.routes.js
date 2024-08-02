import { Router } from "express";
import { getAllRoads, registerRoad } from "../controllers/road.controller.js";
const roadRouter = Router()

// NOTE: POST Request to register a road
roadRouter.route("/register").post(
    registerRoad
)

roadRouter.route("/").get(
    getAllRoads
)

export default roadRouter