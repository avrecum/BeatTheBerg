import express from 'express';
import axios from 'axios';
const router = express.Router();
import dotenv from 'dotenv';
dotenv.config();

let database;
let leaderboardDB;
let userDB;
let firebase;
let storyOrder;

var BASE_URL = process.env.BASE_URL;

export const getRouter = (firebaseRef, storyOrderRef) => {
  firebase = firebaseRef;
  database = firebase.database();
  userDB = database.ref('users');
  leaderboardDB = database.ref('leaderboard');
  storyOrder = storyOrderRef;
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
  let leaderboard;
  let rank;
  let user;

  const getData = async data => {
    if (data.val()) {
      let tmp = await data.val();
      leaderboard = Object.values(tmp);
      leaderboard = leaderboard
        .sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
        .slice(0, 10);
      user = leaderboard.find(el => el.name === name);
      rank = leaderboard.indexOf(
        leaderboard
          .sort((a, b) => parseFloat(a.time) - parseFloat(b.time))
          .find(el => el.name === name)
      );
      rank++;
      return true;
    } else {
      res.json({ status: 500, err: 'No data! ' });
      return false;
    }
  };

  const errData = error => {
    console.error('Something went wrong.');
    console.error(error);
  };

  let dataList = await leaderboardDB.once('value', getData, errData);

  // Return project if availible
  if (dataList) {
    res.json({
      status: 200,
      data: { leaderboard, user, rank }
    });
  } 
  //else res.json({ status: 500, err: 'Error while getting leaderboard' });
});

/**
 * POST Leaderboard
 */
router.post('/leaderboard', async (req, res, next) => {
  let name = req.body.name;
  let time = Number(req.body.time);
  console.log(req.body.data)
  let user = {
    name,
    time
  };
  let dbLeaderboardEntry = await leaderboardDB.child(user.name).set(user);
  console.log('Data: Firebase generated key: ' + dbLeaderboardEntry.key);
 
  if (dbLeaderboardEntry){
    res.json({ status: 200, data: dbLeaderboardEntry.key });}
  else res.json({ status: 500, err: 'Error while adding leaderboard entry!' });
});

/**
 * POST login user
 */
router.post('/user/login', (req, res) => {
  const user = req.body.user;
  try {
    userDB.once('value', data => {
      let users = data.val();
      if (users) {
        if (users[user]) {
          req.session.progress = users[user].progressCounter;
          req.session.startTime = users[user].startTime;
          req.session.user = user;
          req.flash('message', 'Erfolgreich eingeloggt!')
          res.json({
            status: 200,
            data: {}
          });
        } else {
          if(!res.headerSent){
          res.json({
            status: 500,
            data: 'User not in database'
          });
        }
        }
      }
    });
  } catch (err) {
    console.error(err);
  }
});

const hasUser = user => {
  return new Promise((resolve, reject) => {
    try {
      userDB.once('value', data => {
        let users = data.val();
        if (users) {
          if (users[user]) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    } catch (err) {
      console.error(err);
      resolve(false);
    }
  });
};

/**
 * POST add user to user database
 */
router.post('/user/register', async (req, res) => {
  const user = req.body.user;
  try {
    const response = await hasUser(user);
    if (!response) {
      let dbUserEntry = userDB.child(user).set({
        startTime: Math.floor(new Date() / 1000),
        progressCounter: 0
      });
      console.log('Data: Firebase generated key: ' + dbUserEntry.key);
    }
    req.flash('message', 'Erfolgreich registriert!');
    req.flash('justregistered', user)
    res.json({ status: 200 });
  } catch (err) {
    console.error(err);
    res.json({ status: 500 });
  }
});

router.get('/user/logout', (req, res) => {
  req.session.progress = undefined;
  req.session.startTime = undefined;
  req.session.user = undefined;
  req.flash('message','Erfolgreich ausgeloggt!')
  res.send('success');
});

/**
 * GET Progress
 */
router.get('/progress', async (req, res, next) => {
  let name = req.query.user || null;
  console.log('Name: ',name);
  let progress;
  let dataList;

  try {
    const getData = async data => {
      if (data.val()) {
        let tmp = await data.val();
        progress = parseInt(tmp[name].progressCounter);
        console.log(progress);
        // Return progress
        res.json({ status: 200, data: progress });
      } else {
        res.json({ status: 500, err: 'No data! ' });
      }
    };

    const errData = error => {
      console.error('Something went wrong.');
      console.error(error);
    };

    dataList = await userDB
      .orderByKey()
      .equalTo(name)
      .once('value', getData, errData);
  } catch (err) {
    console.log('Error: ', err.message)
    //res.json({ status: 500, err: 'Error while getting progress' });
  }

});

/**
 * UPDATE progress
 */
router.post('/progress', async (req, res, next) => {
  const user = req.session.user;
  const marker = req.body.marker;
  if (marker!== undefined) {
    const updateProgress = async progress => {
      let updateProg = progress.data;
      updateProg++;
      req.session.progress = updateProg;
      const leaderboard = async (user, startTime) =>{
        //let url = BASE_URL + "/api/leaderboard"
        console.log(req.session.startTime+ " starttime")
        axios.post(`${BASE_URL}/api/leaderboard`,{"name": user, "time": Math.floor(new Date() / 1000)-startTime}).then(function(res){
          console.log("response"+res)
        }).catch(function(err){
          console.log(err)
        })
      }

      await userDB.child(user).update({ progressCounter: updateProg });
      if(updateProg == 24){
        console.log("posting to leaderboard: " + req.session.user + " " + updateProg)
        await leaderboard(req.session.user, req.session.startTime);
      }
      res.json({ status: 200, marker: updateProg });
    };
    axios
      .get(`${BASE_URL}/api/progress?user=${user}`)
      .then(function(response) {
        //console.log(Number(storyOrder[response.data.data])-1);
        if (Number(marker) === storyOrder[response.data.data]-1) {
          updateProgress(response.data);
        } else {
          res.status(304);
          res.json({ status: 304 });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }else{
    res.json({status: 304})
  }

});
