const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const leaveRoutes = require("./routes/leaveRoutes");

const app = express();

// DB connection
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/leaves", leaveRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

// Server start
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);