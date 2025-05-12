import dotenv from "dotenv";
import connectDB from "./db/db.js";
import express from "express"
dotenv.config({
    path: './env'
})

const app = express();

connectDB().then(
    app.listen(process.env.PORT || 8000, () => {
        console.log(`app is listening on the port : ${process.env.PORT}`)
    })
).catch(
    (error) => {
        console.error(`mongoDb connection error : ${error}`)
    }
);