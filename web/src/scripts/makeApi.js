function makeUrl(){
 if(window.location.hostname === 'localhost'){
	return  `http://localhost:3000`
 }
 else return 'https://ytmdown.herokuapp.com/'
}

fetch = axios.create({
 baseURL:makeUrl()
})
