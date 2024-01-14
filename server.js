// Importing Essential Files
const express = require("express");
const dbConnect = require("./config/database");
const blogRoutes = require("./routes/blogRoutes");

// Taking Port Number from .env File
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Instance of express in app 
const app = express();

// json Middleware
app.use(express.json());

// API for Routes
app.use("/api/v1", blogRoutes);

// Connection with MongoDB Established
dbConnect();

// Server Started
app.listen(PORT, () => console.log("Server Started"));


