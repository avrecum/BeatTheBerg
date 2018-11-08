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

  let leaderboard = [];
  let rank;
  let user;

  const getData = async (data) => {
    if(data.val()) {
      let tmp = await data.val();
      leaderboard.push(Object.values(tmp));
      leaderboard = leaderboard.sort((a, b) => parseFloat(b.time) - parseFloat(a.time)).slice(0, 20);
      user = leaderboard[0].find((el) => el.name === "Qo");
      rank = leaderboard.indexOf(leaderboard[0].sort((a, b) => parseFloat(b.time) - parseFloat(a.time)).find((el) => el.name === "Qo"));
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
    // res.json({ status: 200, data: { user: leaderboard[0].find((el) => el.name === "Qo"),
    //                                 rank: leaderboard[0].indexOf(leaderboard[0].sort((a, b) => parseFloat(b.time) - parseFloat(a.time)).find((el) => el.name === "Qo")),
    //                                 leaderboard: leaderboard[0].sort((a, b) => parseFloat(b.time) - parseFloat(a.time)).slice(0, 20)
    //                               }});
    res.json({ status: 200, data: { leaderboard: leaderboard, user: user, rank: rank } });
  } else
    res.json({ status: 500, err: "Error while getting leaderboard" });

});

/**
 * POST Leaderboard
 */
router.post('/leaderboard', (req, res, next) => {

  let user = {
      name: 'Qo',
      time: 100
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
