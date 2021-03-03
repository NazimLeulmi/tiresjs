const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();



// Mongo Database  Connection~
mongoose.connect("mongodb://localhost/expresstires", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB successfully");
});

// Express session middleware
let sessionMiddleware = session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true },
});
// Express session
app.use(sessionMiddleware);

// JSON PARSER
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// PUBLIC STATIC FOLDER
app.use(express.static(__dirname + '/public'));


// view engine setup



app.use(require("./routes/signin"));
app.use(require("./routes/signup"));
app.use(require("./routes/activate"));
app.use(require("./routes/tires"));


app.listen(2323, () => {
  console.log("LEUTIRES server running on port:2323");
})


