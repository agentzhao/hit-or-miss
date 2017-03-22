


// Random Number Generator
// Invokable makeRandom function requires element to have a min & max
var makeRandom = function() {
  var min = this.getAttribute("min");
  var max = this.getAttribute("max");
  if(!min || !max){
    alert("Error: missing value. Check if min and max are set.");
    return "-1";
  }
  if(!parseFloat(min) || !parseFloat(max)){
    alert("Error: wrong value type. Check if min or max is set as a non-number.");
    return "-1";
  }
  var l1 = (min + "").split(".");
  var l2 = (max + "").split(".");
  min = parseFloat(min);
  max = parseFloat(max);
  var randomVal = -1;

  if(!l1[1] && !l2[1])
    randomVal = Math.floor(Math.random()*(max-min+1)+min);
  else{
    if(l1[1] && l2[1])
      var decimalPlaces = l1[1].length > l2[1].length ? l1[1].length : l2[1].length;
    else
      var decimalPlaces = l1[1]? l1[1].length : l2[1].length;
    randomVal = parseFloat((Math.random() * (max - min) + min)).toFixed(decimalPlaces);
  }
  updateSlaves(this.id, randomVal);
};

// update all nodes which have instance of randomNum as a master
function updateSlaves(master,randomValue) {
  var randomNode = document.getElementsByClassName("randomNode");
  for (var i = 0; i < randomNode.length; i++) {
    var nodeMaster = randomNode[i];
    if(randomNode[i].getAttribute("master")==master)
      randomNode[i].innerText = randomValue;
  }
}

// get an array of html elements with class of randomNum
var randomNum = document.getElementsByClassName("randomNum");

// add event listner to each instance of class
for (var i = 0; i < randomNum.length; i++) {
  randomNum[i].addEventListener('click', makeRandom, false);
}








// Authentication
// TODO: Enable Google sign in project console -> select, enable, save
var provider = new firebase.auth.GoogleAuthProvider();

// Set up user variables (to be assigned later)
var 
  user = firebase.auth().currentUser, name, uid, email, photoUrl;

function update(){
  user = firebase.auth().currentUser;
  if (user != null) {
  user.providerData.forEach(function (profile) {
    console.log("Sign-in provider: "+profile.providerId);
    console.log("  Provider-specific UID: "+profile.uid);
    console.log("  Name: "+profile.displayName);
    console.log("  Email: "+profile.email);
    console.log("  Photo URL: "+profile.photoURL);
  });
}
}
// authentication flow: redirect
function signIn(){
  firebase.auth().signInWithRedirect(provider);
  // Always update user
  update();
}

firebase.auth().onAuthStateChanged(function(user) {
	update();
	if(user) {
		$("#buttone").text("Sign Out");
		$("#buttone").click(function(){
			firebase.auth().signOut().then(function() {
			// Sign-out successful.
			console.log("Signed out");
			hi = 0;
		}, function(error) {
			// An error happened.
			console.log("Sign out unsuccessful");
			});
		});
	} else if(hi < 1){
		$("#buttone").text("No user signed in");
		signIn();
	}
  });

var hi = 0;
$(document).ready(function () {
  update();
  $("#buttone").click(function(){
	signIn();  
  });

  hi += 1;
  // Site handling
  if(user) {
		$("#buttone").text("Sign Out");
		$("#buttone").click(function(){
			firebase.auth().signOut().then(function() {
			// Sign-out successful.
			console.log("Signed out");
			hi = 0;
		}, function(error) {
			// An error happened.
			console.log("Sign out unsuccessful");
			});
		});
	} else if(hi < 1){
		$("#buttone").text("No user signed in");
		signIn();
	}
  
});
