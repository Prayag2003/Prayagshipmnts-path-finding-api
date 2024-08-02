import { Router } from "express";
import { registerLocation, getAllLocations } from "../controllers/location.controller.js";
const locationRouter = Router()

// NOTE: POST Request to register a road
locationRouter.route("/register").post(
    registerLocation
)

locationRouter.route("/").get(
    getAllLocations
)

export default locationRouter