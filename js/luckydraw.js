//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://developer.mozilla.org/en-US/docs/Web/API/FileReader
//https://mounirmesselmeni.github.io/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/

let theArray = [];
let currentWinner;
let allWinners = [];
let fileUploaded = false;

//open bob
function openModal(id) {
	let modal = document.getElementById(id);
	modal.style.display = "block";
}

function closeModal(id) {
	let modal = document.getElementById(id);
	modal.style.display = "none";
}

function handleFiles(files) {
	//check
	if (window.FileReader) {
		//supported
		getText(files[0]);
		fileUploaded = true;
	} else {
		//not
		alert('FileReader are not supported in this browser.');
	}
}

//get text
function getText(theFile) {
	let reader = new FileReader();
	//read
	reader.readAsText(theFile);
	//errors
	reader.onload = loadHandler;
	reader.onerror = error;
}

//ready
function loadHandler(event) {
	let csv = event.target.result;
	processData(csv);
}

//error
function error(event) {
	if(event.target.error.name == "NotReadableError") {
		alert("Cannot read the file");
	}
}

//go
function processData(csv) {
    let allText = csv.split(/\r\n|\n/);
    for (let i=0; i<allText.length; i++) {
        let data = allText[i].split(';');
            for (var j=0; j<data.length; j++) {
				theArray.push(data[j]);
            }
    }
	arrayCreated = true;
}

//show bob
function displayWinner() {
    $("#winners-name").html(currentWinner);
}

//BlessRNG
function RNGesus() {
    if(!fileUploaded) {
		openModal('errorModal');
    } else if (theArray.length === 0) {
		openModal('emptyList');
    } else {
		let winnerIndex = Math.floor(Math.random() * (theArray.length));

		currentWinner = theArray[winnerIndex];
		displayWinner();
		allWinners.push(theArray[winnerIndex]);
		removeWinner(winnerIndex);
		showAllWinners();
		console.log('Bless RNGesus')
    }
}

//took a while
function removeWinner(winnerIndex) {
	theArray.splice(winnerIndex, 1);
	console.log('yes')
}

function showAllWinners() {
    let content = "<h2>Winners List</h2>";
    content += "<ul>";
    for (let i = 0; i < allWinners.length; i++) {
		content += "<li>";
		content += allWinners[i];
		content += "</li>";
    }
    content += "</ul>";
    content += "<p><a onClick=\"location.reload()\" class=\"btn btn-info\" href=\"#\" role=\"button\">Reset</a></p>";
	content += "<br>"
    $("#all-winners").html(content);
}