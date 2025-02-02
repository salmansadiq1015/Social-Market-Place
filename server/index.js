import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import http from "http";
import colors from "colors";
import connectDB from "./config/db.js";
import { initialSocketServer } from "./socketServer.js";
import authRoutes from "./routes/authRoutes.js";

// Dotenv
dotenv.config();

// Connect to MongoDB
connectDB();

// Middleware
const app = express();
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Socket Server
const server = http.createServer(app);
initialSocketServer(server);

// Routes
app.use("/api/v1/auth", authRoutes);

// Rest API
app.use("/", (req, res) => {
  res.sendFile(
    `<h1>Welcome to Social Market Place, Server is running... </h1>`
  );
});

// PORT
const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`.bgCyan.white);
});
