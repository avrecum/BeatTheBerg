import express from 'express';
const router = express.Router();

// const env = process.env.NODE_ENV || 'dev';
// const rootURL =
//   env === 'dev' ? 'http://localhost:5000' : 'https://maintainerswanted.com';
// const callbackUrl = rootURL + '/api/auth/github/callback';

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
router.get('/leaderboard', (req, res, next) => {

  const leaderboard = [];

  leaderboardDB.orderByChild("time").limitToLast(20).on('value', getData, errData);

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

  // projectRef.on('value', getData, errData);

  // Return project if availible
  if(dataList)
    res.json({ status: 200, data: leaderboard });
  else
    res.json({ status: 500, err: "Error while getting leaderboard" });

});

/**
 * POST Leaderboard
 */
router.post('/leaderboard', (req, res, next) => {

  console.log(userDB);

  let user = {
      name: 'Quentin',
      time: 2000
  };

  console.log(user);

  let dbUser = userDB.push(user, finished);
  console.log('Data: Firebase generated key: ' + dbUser.key);

  if(dbUser)
    res.json({ status: 200, data: dbUser.key });
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
 * POST UserData
 */
router.post('/user', (req, res, next) => {
  // post data
});
