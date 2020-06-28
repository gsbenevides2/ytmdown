import * as firebase from 'firebase/app'
import 'firebase/performance'
import 'firebase/analytics'

const env = process.env
const firebaseConfig = {
  apiKey: env.REACT_APP_FIREBASE_APIKEY,
  authDomain: env.REACT_APP_FIREBASE_AUTHDOMAIN,
  databaseURL: env.REACT_APP_FIREBASE_DATABASEURL,
  projectId: env.REACT_APP_FIREBASE_PROJECTID,
  storageBucket: env.REACT_APP_FIREBASE_STORAGEBUCKET,
  messagingSenderId: env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: env.REACT_APP_FIREBASE_APPID,
  measurementId: env.REACT_APP_FIREBASE_MEASUREMENTID
}

firebase.initializeApp(firebaseConfig)
firebase.performance()
firebase.analytics()
