const config = {
  apiKey: process.env.API_KEY,
  authDomain: "beat-the-berg.firebaseapp.com",
  databaseURL: "https://beat-the-berg.firebaseio.com",
  projectId: "beat-the-berg",
  storageBucket: "beat-the-berg.appspot.com",
  messagingSenderId: process.env.SENDER_ID
};

module.exports = config;
