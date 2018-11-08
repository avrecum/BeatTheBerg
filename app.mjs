import createError from "http-errors";
import express from "express";
import path from "path";
import axios from "axios";
import cookieParser from "cookie-parser";
import logger from "morgan";
import debugModule from "debug";
const debug = debugModule("beattheberg:server");
import http from "http";
import session from "express-session";
import FirebaseStoreModule from "connect-session-firebase";
const FirebaseStore = FirebaseStoreModule(session);
import admin from "firebase-admin";

import { getRouter } from './routes/api.mjs';
import head from './views/head.mjs';
import markers from './views/markers.mjs';
import milestones from './views/milestones.mjs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init firebase
const projectId = process.env.FIREBASE_PROJECTID;
const emailPrefix = process.env.FIREBASE_CLIENTEMAIL;
const key = process.env.FIREBASE_KEY.replace(/\\n/g, "\n");

const ref = admin.initializeApp({
  credential: admin.credential.cert({
    projectId,
    clientEmail: `${emailPrefix}@${projectId}.iam.gserviceaccount.com`,
    privateKey: `-----BEGIN PRIVATE KEY-----\n${key}\n-----END PRIVATE KEY-----\n`
  }),
  databaseURL: `https://${projectId}.firebaseio.com`
});

// story mode order
const storyOrder = process.env.MILESTONES_ORDER.split("|");

// Session handling
app.use(cookieParser());
app.use(
  session({
    store: new FirebaseStore({
      database: ref.database()
    }),
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

app.set("view engine", "ejs");
app.use(express.static(path.resolve() + "/public"));

var appendLocalsToUseInViews = function(req, res, next) {
  // append request and session to use directly in views and avoid passing around needless stuff
  res.locals.request = req;

  if (req.session != null && req.session.user != null) {
    res.locals.user = req.session.user;
  }

  next(null, req, res);
};

app.use(appendLocalsToUseInViews);

// index page
app.get("/", function(req, res) {
  const { progress, startTime, user } = req.session;
  res.locals.user = user;
  let response = axios
    .get("http://localhost:5000/api/leaderboard?=" + user)
    .then(response => {
      let leaderboard = [];
      console.log(response);
      for(var i = 0; i < response.data.data.leaderboard.length; i++) {
        leaderboard.push("<tr>\
          <td scope='row'>" + (i+1) + "</td>\
          <td>" + response.data.data.leaderboard[i].name + "</td>\
          <td>" + response.data.data.leaderboard[i].time + "</td>\
        </tr>");
      }
      if(response.data.data.user) {
        leaderboard.push("<tr class='own-score'>\
          <td scope='row'>" + response.data.rank + "</td>\
          <td>" + response.data.data.user.name + "</td>\
          <td>" + response.data.data.user.time + "</td>\
        </tr>");
      }
      if (progress == null) {
        res.render("pages/index", {
          head_template: head,
          user: false,
          leaderboard: leaderboard
        });
      } else {
        res.render("pages/index", {
          head_template: head,
          user: {
            user,
            progress,
            startTime
          },
          leaderboard: leaderboard
        });
      }
    });
});

// game page
app.get("/game", async function(req, res) {
  const response = await axios.get(
    `http://localhost:5000/api/progress?user=${res.locals.request.session.user}`
  );
  let userProgress = response.data.data - 1;
  let currentMilestone = storyOrder[userProgress];
  let current_asset =
    currentMilestone > 0
      ? milestones[currentMilestone] + milestones[currentMilestone - 1]
      : milestones[currentMilestone];
  let current_marker =
    currentMilestone > 0
      ? markers[currentMilestone] + markers[currentMilestone - 1]
      : milestones[currentMilestone];
  res.render("pages/game", {
    head_template: head,
    current_asset,
    current_marker
  });
});

// game page
app.get("/leaderboard", function(req, res) {
  res.render("pages/leaderboard", {
    head_template: head
  });
});

// Router
app.use("/api/", getRouter(ref, storyOrder));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render tpages/he error page
  res.send(err.message);
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
console.log("Listening on port " + port);

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
