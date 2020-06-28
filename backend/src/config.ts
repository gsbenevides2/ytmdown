import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
dotenv.config()

function makeDownloadsDirectory () {
  const directoryPath = path.resolve(__dirname, '..', 'downloads')
  const exists = fs.existsSync(directoryPath)
  if (exists) {
    fs.readdirSync(directoryPath).map(filePath => {
      fs.unlinkSync(
        path.resolve(directoryPath, filePath)
      )
    })
  } else {
    fs.mkdirSync(directoryPath)
  }
}

makeDownloadsDirectory()
