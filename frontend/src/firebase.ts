import * as firebase from 'firebase/app'
import 'firebase/performance'
import 'firebase/analytics'

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE as string)
firebase.initializeApp(firebaseConfig)
firebase.performance()
firebase.analytics()
