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

  let dbUser = leaderboardDB.push(user, (a) => console.log(a));
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
