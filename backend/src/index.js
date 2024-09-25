import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path: "../.env"
})

const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at https://localhost:${PORT}`);
    })
})
.catch((error) => {
    console.log("MongoDB Connection Failed: ", error);
})