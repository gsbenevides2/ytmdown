const package = require('../../package.json')

module.exports = {
 index(request,response){
	response.json({
	 server:package.version,
	 web:package.webVersion
	})
 }
}
