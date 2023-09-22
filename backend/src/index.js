import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.js";
import placesRoutes from "./routes/places.js";

const app = express();
config();
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/images", express.static("public/places"));
app.use("/auth", authRoutes);
app.use("/places", placesRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
