import dotenv from "dotenv"
import mongoose, { connect } from "mongoose"
import express from "express"
import connectDB from "./db/index.js"

dotenv.config({
    path: "../.env"
})

const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
    app.on("error", (error) => {
        console.log("ERROR: ", error);
        throw error
    })
    app.listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB Connection Failed: ", error);
})