import dotenv from "dotenv";
import connectDB from "./db/db.js";
import express from "express"
import { app } from "./app.js";
dotenv.config({
    path: './env'
})

connectDB().then(
    app.listen(parseInt(process.env.PORT) || 8000, () => 
        console.log(`app is listening on the port : ${process.env.PORT}`)
    )
).catch(
    (error) => {
        console.error(`mongoDb connection error : ${error}`)
    }
);