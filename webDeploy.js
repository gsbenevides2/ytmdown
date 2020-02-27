//This script changes the public folder to the folder with the mimicked files.
const {writeFileSync} = require('fs')
const firebaseJson = require('./firebase.json')
firebaseJson.hosting.public = 'web/public'
writeFileSync('./firebase.json',JSON.stringify(firebaseJson,null,4))

