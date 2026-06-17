const express = require("express");
require("dotenv").config();
const connectDB=require("./config/db");
const cors=require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const taskroutes = require("./routes/taskroutes");
const authroutes=require("./routes/authroutes");

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

app.use("/api/tasks", taskroutes);
app.use("/api/auth",authroutes);
connectDB();
app.listen(process.env.PORT, () => {
    console.log("server started on port 5000");
});