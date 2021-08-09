const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").createServer(app);

const devicesRoutes = require("./routes/devices")

app.use(cors());

app.use(devicesRoutes);

server.listen(8000, () => console.log("Server is running!"));
