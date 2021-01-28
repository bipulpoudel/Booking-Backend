import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import { middlewaresConfig } from "./middlewares/index.js";

/* Route imports */
import userRoutes from "./routes/userRoutes.js";

/* Initialization */
const app = express();
/* Config */
dotenv.config();
connectDB();

/* Middleware Config */
middlewaresConfig(app);

/* Routes  */
app.use("/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
