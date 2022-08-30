import mongoose from "mongoose";
import { initAdmin } from "../controller/initAdmin.js";

const mongoConnection = async () => {
  //Connect to DB
  mongoose.connect(
    `mongodb://${process.env.MONGODB_URI}:${process.env.MONGODB_PORT}/${process.env.DB_NAME}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Database Connection Success");
    }
  );
  let db = mongoose.connection;
  db.on("error", console.error.bind(console, "Database Connection Error"));
  db.once("open", async () => {
    console.log("Database is connected");
    initAdmin();
  });
};

export default mongoConnection;
