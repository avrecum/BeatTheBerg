import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import debugModule from 'debug';
const debug = debugModule('beattheberg:server');
import http from 'http';
import session from 'express-session';
import FirebaseStoreModule from 'connect-session-firebase'
const FirebaseStore = FirebaseStoreModule(session);
import admin from "firebase-admin";

import serviceAccount from "./secrets.json";

import config from "./config.js";

import { getRouter } from "./routes/api.mjs";
import head from "./views/head.mjs";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init firebase
const ref = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beat-the-berg.firebaseio.com"
});

// Session handling
app.use(cookieParser());
app.use(session({
  store: new FirebaseStore({
    database: ref.database()
  }),
  secret: 'keyboard cat'
  resave: true,
  saveUninitialized: true
}));

app.set("view engine", "ejs");
app.use(express.static(path.resolve() + "/public"));

// index page
app.get('/', function(req, res) {
  res.render('pages/index', {
    head_template: head,
    user: false
  });
});

// game page
app.get("/game", function(req, res) {
  res.render("pages/game", {
    head_template: head
  });
});

// game page
app.get("/leaderboard", function(req, res) {
  res.render("pages/leaderboard", {
    head_template: head
  });
});

// Router
app.use("/api/", getRouter(ref));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.json({ error: err.message });
});

/**
 * Get port from environment and store in Express.
 */

const port = process.env.PORT || "5000";
app.set("port", port);

/**
 * Create HTTP server, listen on ports
 */

const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
