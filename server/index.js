const express = require("express");
const morgan = require("morgan");

const app = express();
const port = 3000;

app.use(function (req, res, next) {
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
