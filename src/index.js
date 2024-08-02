import dotenv from "dotenv"
import connectDB from "./db/conn.js";
import { app } from "./app.js";
dotenv.config(
    { path: './.env' }
)

const port = process.env.PORT || 8000

// listening to any errors from app
app.on("error", (error) => {
    console.log("ERR: ", error);
    process.exit(1)
})

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running or app is listening to ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MongoDB failed to connect ...", err);
    })
