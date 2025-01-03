const exp = require("express");
app = exp();
const colors = require("colors");
const cors = require("cors");
const path = require("path");
const responseTime = require('response-time');
// connecting angular app with server
require("dotenv").config();

// npm install path
app.use(exp.static(path.join(__dirname, "dist/bookStore")));
const mongoose = require("mongoose");
const rate_limitter = require('express-rate-limit')



mongoose.connect(process.env.DBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const rateLimitter = (time, numberOfRequests) =>
  rate_limitter({
    windowMs: time,
    max: numberOfRequests,
    message: {
      code: 429,
      message: "Too many requests to handle! Please try after some time"
    }
  })


db.on("error", () => console.log("error in DB connection".red));
db.once("open", () => console.log("DB connected".green));

// app.use('/', (req, res) => res.send({ status: 200, message: `Welcome! Visit: ${process.env.client_route}` }));
app.use(
  cors({
    origin: [process.env.origin],
  })
);
app.use(responseTime());




const userApiObj = require("./apis/userapi");

const adminApiObj = require("./apis/adminapi");

const productApiObj = require("./apis/productapi");
app.use("/user", rateLimitter(1000,20), userApiObj);

app.use("/admin", adminApiObj);

app.use("/product", productApiObj);

app.use((req, res, next) => {
  res.send({ message: `path invalid ${req.url}` });
});

app.use((err, req, res, next) => {
  res.send({ message: "error occured", reason: err.message });
});

const port = process.env.PORT || 8080;
// j0oin syntax ===> join(path of the file , )

app.listen(port, () => {
  console.log(`web server listening on port ${port}`);
});
