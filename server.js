require("./src/database");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const routes = require("./src/routes");
const whitelist = ["*"]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
}

const app = express();
const port = process.env.PORT || 5000;

app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.json());
app.get("/", function (req, res) {
  res.json({ message: "Auth API MontData" });
});

app.use(routes);

app.listen(port, function () {
  console.log("Server is running at port: ", port);
});
