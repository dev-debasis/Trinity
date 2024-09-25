import dotenv from "dotenv"
import mongoose, { connect } from "mongoose"
import express from "express"
import connectDB from "./db/index.js"

dotenv.config({
    path: "../.env"
})

connectDB()