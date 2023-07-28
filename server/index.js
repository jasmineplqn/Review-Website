const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const { PORT, ENV} = process.env;

const app = express();
const port = PORT;

app.use(function (req, res, next) {
  if(ENV && ENV === "PROD") {
    res.header("Access-Control-Allow-Origin", "https://skintech-report.vercel.app");
  }  else {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  }

  res.header(
    "Access-Control-Allow-Methods",
    "OPTIONS, HEAD, GET, PUT, POST, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(require("./routes"));
app.use(morgan("dev"));
app.use(express.static("./server/assets"));
app.use(express.urlencoded({ extended: false }));
app.use("/", express.static(__dirname + "/"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
