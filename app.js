const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const compression = require("compression");
require("dotenv").config();

const routes = require( "./src/routes" )

const app = express();

const store = new mongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "doctorPat",
});

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true })); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
app.use(compression());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(
  session({
    secret: process.env.S_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
  })
);

//differtent routes are not supported by mong 
app.use( '/doctor', routes.doctors );
app.use( '/', routes.users);
app.use( '/slot', routes.slots );
app.use( '/appointment', routes.appointments );
app.all( '/*', ( req, res, next ) => {
  console.log( 'the url %s has been redirected', req.url );
  next(new Error(`The url http://localhost:${app.get('port')}${ req.originalUrl} has been redirected`));
})

//catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error();
  // console.log(err);
  err.statusCode = 404;
  err.message = 'Not Found';
  next(err);
});

//Errors handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const msg = err.message;
  const data = err.data;
  console.log(err)
  return res.status(status).json({ msg, data });
});

console.log(process.env.MONGO_URI)
//server
app.set("port", process.env.PORT || 3000);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then( () => {
      app.listen(app.get("port"));
  })
  .then(() => {
    console.info("Server is ready and listening on port " + app.get("port"));
  })
  .catch((err) => {
    if (err) return next(err);
    console.error("Error to connect to the database");
  });

module.exports = app;