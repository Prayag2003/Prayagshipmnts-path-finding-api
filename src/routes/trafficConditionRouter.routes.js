import { Router } from "express";
import { getTrafficCondition } from "../controllers/trafficConditionReportController.js";
const trafficConditionRouter = Router()

// NOTE: POST Request to register a road
trafficConditionRouter.route("/").get(
    getTrafficCondition
)

export default trafficConditionRouter