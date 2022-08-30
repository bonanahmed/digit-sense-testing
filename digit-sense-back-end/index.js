import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { databases } from "./config/database.js";

const app = express();

//Config
dotenv.config();
databases();

//import routes
import apiRoute from "./routes/api.js";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";

//Middleware
app.use(json());
app.use(cors());
//Routes Middleware
app.use("/api", apiRoute);
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//Serve
app.listen(process.env.SERVER_PORT || 5000, () =>
  console.log("Server is running at port " + process.env.SERVER_PORT || 5000)
);
