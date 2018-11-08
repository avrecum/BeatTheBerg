import express from 'express';
const router = express.Router();

let database;
let leaderboardDB;
let userDB;
let firebase;

export const getRouter = (firebaseRef) => {
  firebase = firebaseRef;
  database = firebase.database();
  userDB = database.ref('users');
  leaderboardDB = database.ref('leaderboard');
  return router;
};

/**
 * GET Leaderboard
 * RETURNS leaderboard (top 20) as [{name, time}]
 *         requested user (?name=username) as {name, time}
 *         user rank as int
 */
router.get('/leaderboard', async (req, res, next) => {

  let name = req.query.name || null;
  console.log(name);

  let leaderboard = [];
  let rank;
  let user;

  const getData = async (data) => {
    if(data.val()) {
      let tmp = await data.val();
      leaderboard.push(Object.values(tmp));
      leaderboard = leaderboard.sort((a, b) => parseFloat(b.time) - parseFloat(a.time)).slice(0, 20);
      user = leaderboard[0].find((el) => el.name === name);
      rank = leaderboard[0].indexOf(leaderboard[0].sort((a, b) => parseFloat(a.time) - parseFloat(b.time)).find((el) => el.name === name));
      rank++;
      return true;
    } else {
      res.json({ status: 500, err: "No data! " });
      return false;
    }
  }

  const errData = (error) => {
    console.error('Something went wrong.');
    console.error(error);
  }

  let dataList = await leaderboardDB.on('value', getData, errData);

  // Return project if availible
  if(dataList) {
    res.json({ status: 200, data: { leaderboard: leaderboard, user: user, rank: rank } });
  } else
    res.json({ status: 500, err: "Error while getting leaderboard" });

});

/**
 * POST Leaderboard
 */
router.post('/leaderboard', (req, res, next) => {

  let name = req.body.name;
  let time = Number(req.body.time);

  let user = {
      name: name,
      time: time
  };

  let dbLeaderboardEntry = leaderboardDB.push(user, (a) => console.log(a));
  console.log('Data: Firebase generated key: ' + dbLeaderboardEntry.key);

  if(dbLeaderboardEntry)
    res.json({ status: 200, data: dbLeaderboardEntry.key });
  else
    res.json({ status: 500, err: "Error while adding leaderboard entry!" });
});

/**
 * POST login user
 */
router.post('/user/login', (req, res) => {
  const user = req.body.user;
  try {
    userDB.on('value', (data) => {
      let users = data.val();
      if (users) {
        if (users[user]) {

        }
      }
    });
    let dbUserEntry = userDB.child(user).set({
      startTime: Date.now(),
      progressCounter: 0
    });
    console.log('Data: Firebase generated key: ' + dbUserEntry.key);
  } catch (err) {
    console.error(err);
  }

  res.redirect('/game');
});

/**
 * POST add user to user database
 */
router.post('/user/register', (req, res) => {
  const user = req.body.user;
  try {

    let dbUserEntry = userDB.child(user).set({
      startTime: Date.now(),
      progressCounter: 0
    });
    console.log('Data: Firebase generated key: ' + dbUserEntry.key);
  } catch (err) {
    console.error(err);
  }

  res.redirect('/game');
});

/**
 * GET Progress
 */
router.get('/progress', (req, res, next) => {
  let name = req.query.name || null;
  console.log(name);

  let progress;

  const getData = async (data) => {
    if(data.val()) {
      let tmp = await data.val();
      progress = tmp;
      return true;
    } else {
      res.json({ status: 500, err: "No data! " });
      return false;
    }
  }

  const errData = (error) => {
    console.error('Something went wrong.');
    console.error(error);
  }

  let dataList = await userDB.on('value', getData, errData);

  // Return project if availible
  if(dataList) {
    res.json({ status: 200, data: { leaderboard: leaderboard, user: user, rank: rank } });
  } else
    res.json({ status: 500, err: "Error while getting preogress" });
});

/**
 * UPDATE progress
 */
 router.post('/progress', (req, res, next) => {
   // post data
 });
