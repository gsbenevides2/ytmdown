const {writeFileSync,readFileSync} = require('fs')
const {getFilesList} = require('minify-cli/utils')
const version = require('./package.json').webVersion
const template = readFileSync('./sw.template').toString()
module.exports = (src='src')=>{
 getFilesList('/web/src').then(fileList=>{
	const htmls =fileList.html.map(html=>{
	 if(html!== 'index.html'){
		return html.slice(0,-5)
	 }
	 else return '/'
	})
	const files = [...fileList.css,...fileList.js,...htmls]
	let string = '\n'
	for(file of files){
	 const fileObject = {
		url:file,
		revision:version
	 }
	 string += JSON.stringify(fileObject) + ",\n"
	}
	const final = template.replace(/<files>/,string.slice(0,-2))
	console.log('ok')
	writeFileSync(`./web/${src}/sw.js`,final)
 })
}
