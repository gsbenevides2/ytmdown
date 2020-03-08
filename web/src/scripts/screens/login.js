function verifyDarkMode(){
 
 if(JSON.parse(localStorage.getItem('darkMode'))){
	document.body.classList.add('dark')
 }
}

function startFirebaseUi(){
 const uiConfig = {
	signInOptions: [
	 {
		provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		authMethod: 'https://accounts.google.com',
		clientId:'147670020064-5rdlgcv9f3s31mot6ber35cicdc69rpb.apps.googleusercontent.com'
	 }
	],
	tosUrl: '/tos',
	privacyPolicyUrl: function() {
	 window.location.assign('/police');
	},
	credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
 }
 const ui = new firebaseui.auth.AuthUI(firebase.auth())
 ui.disableAutoSignIn()
 ui.start('#firebaseui-auth-container',uiConfig) 
}
firebase.auth().onAuthStateChanged(user=>{
 if(user){
	alert(`Seja bem vindo ${user.displayName}`)
	const sendTo = (new URL(window.location.href)).searchParams.get('sendTo')
	
	window.location.href = `/${sendTo}`
 }
})
window.onload= ()=>{
 verifyDarkMode()
 startFirebaseUi()
}
