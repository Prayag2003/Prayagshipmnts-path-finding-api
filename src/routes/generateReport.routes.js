import { Router } from "express";
import { generateTrafficReport } from "../controllers/trafficConditionReportController.js";
const generateReportRouter = Router()

// NOTE: POST Request to register a road
generateReportRouter.route("/").get(
    generateTrafficReport
)

export default generateReportRouter