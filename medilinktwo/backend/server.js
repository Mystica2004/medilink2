const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// TODO: Import Routes
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/appointments", require("./routes/appointments"));
app.use("/reports", require("./routes/reports"));

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
}).catch(err => console.error(err));
