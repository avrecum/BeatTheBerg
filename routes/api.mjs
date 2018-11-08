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
 */
router.get('/leaderboard', async (req, res, next) => {

  const leaderboard = [];

  
  const getData = (data) => {
    if(data.val()) {
      let tmp = data.val();
      leaderboard.push(Object.values(tmp));
    } else {
      res.json({ status: 500, err: "No data! " });
    }
  }
  
  const errData = (error) => {
    console.error('Something went wrong.');
    console.error(error);
  }
  
  let dataList = await leaderboardDB.on('value', getData, errData);

  // Return project if availible
  if(dataList)
    res.json({ status: 200, data: leaderboard[0] });
  else
    res.json({ status: 500, err: "Error while getting leaderboard" });

});

/**
 * POST Leaderboard
 */
router.post('/leaderboard', (req, res, next) => {

  let user = {
      name: 'Quentin',
      time: 2000
  };

  let dbLeaderboardEntry = leaderboardDB.push(user, (a) => console.log(a));
  console.log('Data: Firebase generated key: ' + dbLeaderboardEntry.key);

  if(dbLeaderboardEntry)
    res.json({ status: 200, data: dbLeaderboardEntry.key });
  else
    res.json({ status: 500, err: "Error while adding user" });
});

/**
 * GET UserData
 */
router.get('/user', (req, res, next) => {
  // fetch data
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
 * POST UserData
 */
router.post('/user', (req, res, next) => {
  // post data
});
