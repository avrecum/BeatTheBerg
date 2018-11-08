import express from "express";
const router = express.Router();

let database;
let leaderboardDB;
let userDB;
let firebase;

export const getRouter = firebaseRef => {
  firebase = firebaseRef;
  database = firebase.database();
  userDB = database.ref("users");
  leaderboardDB = database.ref("leaderboard");
  return router;
};

/**
 * GET Leaderboard
 * RETURNS leaderboard (top 20) as [{name, time}]
 *         requested user (?name=username) as {name, time}
 *         user rank as int
 */
router.get("/leaderboard", async (req, res, next) => {
  let name = req.query.name || null;
  console.log(name);

  let leaderboard;
  let rank;
  let user;

  const getData = async data => {
    if (data.val()) {
      let tmp = await data.val();
      leaderboard = Object.values(tmp);
      leaderboard = leaderboard
        .sort((a, b) => parseFloat(b.time) - parseFloat(a.time))
        .slice(0, 20);
      user = leaderboard.find(el => el.name === name);
      rank = leaderboard.indexOf(
        leaderboard
          .sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
          .find(el => el.name === name)
      );
      rank++;
      return true;
    } else {
      res.json({ status: 500, err: "No data! " });
      return false;
    }
  };

  const errData = error => {
    console.error("Something went wrong.");
    console.error(error);
  };

  let dataList = await leaderboardDB.on("value", getData, errData);

  // Return project if availible
  if (dataList) {
    res.json({
      status: 200,
      data: { leaderboard, user, rank }
    });
  } else res.json({ status: 500, err: "Error while getting leaderboard" });
});

/**
 * POST Leaderboard
 */
router.post("/leaderboard", async (req, res, next) => {
  let name = req.body.name;
  let time = Number(req.body.time);

  let user = {
    name,
    time
  };

  let dbLeaderboardEntry = leaderboardDB.child(user.name).set(user);
  console.log("Data: Firebase generated key: " + dbLeaderboardEntry.key);

  if (dbLeaderboardEntry)
    res.json({ status: 200, data: dbLeaderboardEntry.key });
  else res.json({ status: 500, err: "Error while adding leaderboard entry!" });
});

/**
 * POST login user
 */
router.post("/user/login", (req, res) => {
  const user = req.body.user;
  try {
    userDB.on("value", data => {
      let users = data.val();
      if (users) {
        if (users[user]) {
          req.session.progress = users[user].progressCounter;
          req.session.startTime = users[user].startTime;
          req.session.name = user;
          res.json({
            status: 200,
            data: {}
          });
        } else {
          res.json({
            status: 500,
            data: "User not in database"
          });
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

/**
 * POST add user to user database
 */
router.post("/user/register", (req, res) => {
  const user = req.body.user;
  try {
    userDB.on("value", data => {
      let users = data.val();
      if (users) {
        if (users[user]) {
          req.session.progress = users[user].progressCounter;
          req.session.startTime = users[user].startTime;
          req.session.name = user;
          res.json({
            status: 200,
            data: {
              progress: users[user].progressCounter,
              startTime: users[user].startTime
            }
          });
        } else {
          let dbUserEntry = userDB.child(user).set({
            startTime: Date.now(),
            progressCounter: 0
          });
          console.log("Data: Firebase generated key: " + dbUserEntry.key);
          res.json({ status: 200 });
        }
      }
    });
  } catch (err) {
    console.error(err);
  }

  res.redirect("/game");
});

/**
 * GET Progress
 */
router.get("/progress", async (req, res, next) => {
  let name = req.query.name || null;
  console.log(name);

  let progress;
  let dataList;

  try {
    const getData = async data => {
      if (data.val()) {
        let tmp = await data.val();
        progress = tmp;
      } else {
        res.json({ status: 500, err: "No data! " });
      }
    };

    const errData = error => {
      console.error("Something went wrong.");
      console.error(error);
    };

    dataList = await userDB
      .orderByKey()
      .equalTo(name)
      .on("value", getData, errData);
  } catch (err) {
    res.json({ status: 500, err: "Error while getting progress" });
  }

  // Return progress
  res.json({ status: 200, data: progress });
});

/**
 * UPDATE progress
 */
router.post("/progress", async (req, res, next) => {
  const name = req.body.name;

  let progressSuccess;

  try {
    let progress;

    const getData = async data => {
      if (data.val()) {
        let tmp = await data.val();
        progress = parseInt(tmp.progressCounter);
        progress++;
        progressSuccess = await userDB
          .child(name)
          .update({ progressCounter: progress });
      } else {
        res.json({ status: 500, err: "No data! " });
      }
    };

    const errData = error => {
      console.error("Something went wrong.");
      console.error(error);
    };

    dataList = await userDB
      .orderByKey()
      .equalTo(name)
      .on("value", getData, errData);
  } catch (err) {
    res.json({ status: 500, err: "Error while updating progress" });
  }

  // Return new progress
  res.json({ status: 200, data: progress });
});
