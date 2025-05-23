dotenv.config();
import express from "express";
import dotenv from "dotenv"
import path from "path"
import cookieParser from "cookie-parser";
import cors from "cors"

import authRouter from "./routes/auth.route.js"
import profileRouter from "./routes/profile.route.js";
import blockchainRouter from "./routes/blockchain.route.js";


//Connect DB
import connectDB from "./connection/connectDB.js";

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/blockchain", blockchainRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


//Server start
app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server has started at PORT: ${PORT}`)
});