// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

var firebaseConfig = {
  apiKey: "AIzaSyDKTgBJsiaan4Np7gZMsNHcXoGryVZFJ6o",
  authDomain: "arzo-e1a41.firebaseapp.com",
  databaseURL: "https://arzo-e1a41.firebaseio.com",
  projectId: "arzo-e1a41",
  storageBucket: "arzo-e1a41.appspot.com",
  messagingSenderId: "680123476845",
  appId: "1:680123476845:web:9049b468ebc43be8218864",
  measurementId: "G-VWBZV3KTNP"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };