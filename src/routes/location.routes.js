import { Router } from "express";
import { registerLocation } from "../controllers/location.controller";
const locationRouter = Router()

// NOTE: POST Request to register a road
locationRouter.route("/register").post(
    registerLocation
)

export default locationRouter