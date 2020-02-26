function makeUrl(){
 if(window.location.hostname === 'localhost'){
	return  `http://localhost:3000/`
 }
 else return 'https://ytmdown.herokuapp.com/'
}

api = axios.create({
 baseURL:makeUrl()
})
