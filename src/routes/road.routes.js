import { Router } from "express";
import { registerRoad } from "../controllers/road.controller.js"
const roadRouter = Router()

// NOTE: POST Request to register a road
roadRouter.route("/register").post(
    registerRoad
)

export default roadRouter