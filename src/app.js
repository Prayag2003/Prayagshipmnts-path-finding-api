import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// MIDDLEWARES
app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(express.static("public"))
app.use(cookieParser())


// ROUTES for Roads
import roadRouter from "./routes/road.routes.js";
app.use("/api/v1/road", roadRouter)

// ROUTES for Locations
import locationRouter from "./routes/location.routes.js";
app.use("/api/v1/location", locationRouter)

export { app }
