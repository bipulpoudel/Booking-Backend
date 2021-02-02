import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

dotenv.config();

export const middlewaresConfig = (app) => {
  if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
  }

  app.use(express.static("uploads"));

  app.use(express.json({ extended: false }));
  app.use(cors());
};
