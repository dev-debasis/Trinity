import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({
    limit: "20kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "20kb"
}));

app.use(express.static("public"));

import userRouter from "./routes/user.route.js";
import screenshotRouter from "./routes/screenshot.route.js";
import userDataRouter from "./routes/randomUser.route.js";
import pdfQrRouter from "./routes/pdfGenerator.route.js";

// Declaring the Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/screenshot", screenshotRouter);
app.use("/api/v1/generate-random-users-data", userDataRouter);
app.use("/api/v1/generate-pdf", pdfQrRouter);

export { app };