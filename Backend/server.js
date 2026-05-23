const express = require("express");
const connectDB = require("./config/db");
const Workspace = require("./models/Workspace");
const workspaceRoutes = require("./routes/workspaceRoutes");
const authRoutes = require("./routes/authRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const app = express();
const cors = require("cors");
require("dotenv").config();


app.use(express.json());
app.use(cors());
app.use(workspaceRoutes);
app.use(authRoutes);
app.use(resourceRoutes);
app.use("/uploads", express.static("uploads"));
connectDB();


const PORT = 5000;


app.get("/", (req, res) => {
  res.send("Prep Space backend is running");
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get("/info", (req, res) => {
  res.json({
    appName: "PrepSpace",
    version: "1.0",
    developer: "Charan",
  });
});
