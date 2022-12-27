require("dotenv").config();
const express = require("express");
const session = require("express-session");
const db = require("./app/config/db.conf");
const cors = require("cors");
const expressLayouts = require('express-ejs-layouts')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Error Handling Database
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => console.log("Connected to the database"));

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
);

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions)); //

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});

app.use("/", express.static(__dirname + "/public"));

app.use(expressLayouts)
app.set('layout', './layouts/full-width')
app.set("view engine", "ejs");

app.use("", require("./routes/routes"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
