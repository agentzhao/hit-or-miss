//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//https://developer.mozilla.org/en-US/docs/Web/API/FileReader
//https://mounirmesselmeni.github.io/2012/11/20/reading-csv-file-with-javascript-and-html5-file-api/

let theArray = [];
let currentWinner;
let allWinners = [];
let fileUploaded = false;

//adding facil chances
facils =['WANG SIYIN from DHS', 'CHEN YIYANG from DHS', 'SHAUN LEE XUAN WEI from DHS', 'NG LINGSHAN from DHS', 'ONG TENG WEE from DHS', 'NICKY REN from DHS', 'WANG ZILIANG from DHS', 'RYAN LOH JUN KAI from HCI', 'LONG MING WEI from HCI', 'REN GUANPENG from HCI', 'HENG ZHI CHENG from DHS', 'ERINN LEE from HCI', 'QIU WEIHONG  from HCI', 'ADRIAN HENG YU LIANG from NYJC', 'EE ANSHENG from DHS', 'TAN XIAOCHEN from DHS', 'HE YU from NJC', 'WEE HE-KUN from DHS', 'POH SAY KEONG from DHS', 'SIM JUSTIN from HCI', 'TAN GUO YANG from HCI', 'ONG AI WEI from NYJC', 'JERNIC YEO from NYJC', 'AIDAN LING ZHEN YANG from NYJC', 'CAI JIALIANG from NYJC', 'HAN JIN GUANG from NYJC', 'NICKIE TAN from NYJC', 'WINFRED LAM JUN WUNG from YJC', 'YONG XUAN WEI JOHAN from YJC', 'RUSSELL CHO from YJC', 'SENG BOON KEAT from YJC', 'POH ZHENG HONG from YJC', 'SENG BOON KEAT from YJC', 'IGNATIUS GOH LIE KAI from NYJC', 'TAN YUE JUN DARREN from YJC', 'GURDIRAJ SINGH from YJC', 'LEOW KAI JIE from HCI', 'CHEW KIA HWEE from PJC', 'JARED DANIEL RECOMENDABLE from YJC', 'NG MUN HIN from RI', 'GOH SIAU WEE from DHS', 'PENELOPE HO from YJC', 'TAN YAN ZHOU from DHS', 'LIN ZHIQI from DHS', 'CHEN LEYI from YJC', 'LIAN TONG from YJC', 'HEIN HTET TIN LATT from ACJC', 'AARON TI YU REN from ACJC', 'WU ZU AN@JOAN WU from HCI', 'SHERRI CHUAH CHIA YEN from NYJC', 'KAN CHENG HUNG from NYJC', 'HENG TENG YI from RI', 'MUHAMMAD ASYRAF BIN OMAR from YJC', 'Owen Leong from NUSH', 'Roy Ang from NUSH', 'YEOH YU YONG from DHS', 'SUN YIRAN from HCI', 'FANG ROULI from HCI', 'CHUA JEVY from JJC', 'HENG WEI JIE from JJC', 'DANIEL TAY JIN HONG from JJC', 'CHESTER CHUA from JJC', 'JEROLD LIM from JJC', 'RAHUL GIDIJALA from NJC', 'YEE JUN HYEOK BRYAN from NYJC', 'WAY YAN WIN from RI', 'LIM YONG JUN from DHS', 'TAI CHEE HIAN from DHS', 'TAN HONG LIANG from DHS', 'TAN HONG ZHAO from DHS', 'CHUA YIXUAN from NYJC', 'CHANG LE SHUEN from NYJC', 'JONATHAN GOH SHI NAM from NYJC', 'BHANUKA BANDARA EKANAYAKE from NYJC', 'WU ZIMING from NYJC', 'DANE TNG from NYJC', 'DAI TIANLE from DHS', 'KIM MINSEO from HCI', 'STEVANUS TIMOTHYUS from YJC', 'LONG JI YAO ARTHUR from DHS', 'GAO RUIPENG from DHS', 'TEO JING YI from DHS', 'ZHENG YI from DHS', 'AMBROSE CHUA from NUSH', 'PEARLYN LOH WOON QING from DHS', 'ZHANG FAN from YJC', 'CHLOE NIU MAN YUN from YJC']
for (let i=0; i<facils.length; i++) {
	theArray.push(facils[i])
	theArray.push(facils[i])
	theArray.push(facils[i])
}

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
	let chance = allText.length
    for (let i=0; i<allText.length; i++) {
        let data = allText[i].split(';');
            for (var j=0; j<data.length; j++) {
				//adding more chance for early signup
                for (let k=0; k<chance; k++){
					theArray.push(data[j].replace(',',' from '));
				}
            }
			chance--;
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
	//make copy cos it may be deleted
	let winnerarray = theArray[winnerIndex]
	for(var i = 0; i < theArray.length; i++) {
		if(theArray[i] == winnerarray){
			//remove
			theArray.splice(i, 1);
			console.log('yes')
			//this little piece of
			i--
		}
		else
			i++
    }    
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