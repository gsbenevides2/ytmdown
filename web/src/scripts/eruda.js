if(window.location.hostname === "localhost"){
 fetch('//cdn.jsdelivr.net/npm/eruda')
	.then(async response=>{
	 eval(await response.text())
	 eruda.init();
	 window.onerror= (message,file,line,character,object)=>{
		console.groupCollapsed("Error Details:",message)
		console.log("File:",file)
		console.log("Line:",line)
		console.log("Character:",character)
		console.log("Object:",object)
		console.groupEnd()
		eruda.show()
	 }
	})
}
