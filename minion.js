// 1 => <div class='wall'></div>
// 2 => <div class='coin'></div>
// 3 => <div class='ground'></div>
// 4 => <div class='banana'></div>
// 5 => <div class='minion'></div>

const MAX_TIME = 30;
const el = document.getElementById('world');
const startBtn = document.getElementById('startBtn');
const nextButton = document.getElementById('nextBtn');
const finishButton = document.getElementById('finishBtn');
const timer = document.getElementById('timer');
const task = document.getElementById('task');
const tuteDiv = document.getElementById('tutorial');
const gameCanvas = document.getElementById('gameCanvas');
const historyMap = [map0, map1, map2, map3, map4, map5, map6, map7, map8, map9];
const totalMaps = historyMap.length;

let participant;
let listenerPressKey;
let timeout;
let gameIndex = 1;
let saveData = []; //uct timestamp - posX - posY - game index - condition - participant 
let condition;
let isTute = false;

function showTask(){
	document.getElementById('startScreen').style.display = 'none';
	condition = document.getElementById('condition').value;
	participant = document.getElementById('inputName').value;
	if (condition == "1"){
		task.innerHTML += "<p> In this task:" +
		"<li>Using the up/down/left/right keyboards to move the minion</li>" +
		"<li>You have 30 seconds to get the banana</li>" +
		"<li>Click the finish button when you reach the banana</li></p>";
		task.style.display = 'inline';
	}else if (condition == "2"){
		task.innerHTML += "<p> In this task:" +
		"<li>Using the up/down/left/right keyboards to move the minion</li>" +
		"<li>You have 30 seconds to get the banana</li>" +
		"<li>Click the finish button when you reach the banana</li>" + 
		"<li><b>At the same time, do not give away your destination is the banana. You may</li>" +
			"<ul><li>Be a greedy minion and use the coins as decoys. You may collect the coin first and then go to the banana</li>" +
			"<li>Go to the banana with an ambiguous path (Be creative)</li>" +
			"<li>Please notice that you can collect the banana and coins multiple times</li></ul>" + 
		"</b></p>";
		task.style.display = 'inline';
	}else if(condition == "3"){
		task.innerHTML += "<p> In this task:" +
		"<li>Using the up/down/left/right keyboards to move the minion</li>" +
		"<li>You have 30 seconds to get the banana</li>" +
		"<li>Click the finish button when you reach the banana</li>" + 
		"<li>At the same time, do not give away your destination is the banana. You may</li>" +
			"<ul><li>Be a greedy minion and use the coins as decoys. You may collect the coin first and then go to the banana</li>" +
			"<li>Go to the banana with an ambiguous path (Be creative)</li>" + 
			"<li>Please notice that you can collect the banana and coins multiple times</li></ul>" + 
		"<li><b>Someone is watching your gaze so he/she knows that you will be looking at the banana, which is your real destination." +
		" Your task is to mislead the observer by changing your eye movements. You may try to</li> " +
			"<ul><li>Avoid looking at the banana</li>" +
			"<li>Be creative</li></ul></b></p>";
		task.style.display = 'inline';
	}
}

function tutorial(){
	isTute = true;
	task.style.display = 'none';
	tuteDiv.style.display = 'inline';
	gameCanvas.style.display = 'inline';
	let map = historyMap[0]; 
	results = drawWorld(map);
	let goals = results[0];
	let minion = results[1];
	// let seconds = MAX_TIME * 4;
	// countDown(seconds);
	listenerPressKey = function listener(event){
		pressKey(map, goals, minion);
	}
	document.addEventListener("keydown", listenerPressKey);
}

function startGame(){
	isTute = false;
	finishButton.style.display = 'inline-block';
	tuteDiv.style.display = 'none';
	gameCanvas.style.display = 'inline'; 
	let map = historyMap[gameIndex];
	results = drawWorld(map);
	let goals = results[0];
	let minion = results[1];
	let seconds = MAX_TIME;
	countDown(seconds);
	let now = new Date();
	let timestamp = now.getUTCFullYear() + "-" + (now.getUTCMonth() + 1) + "-" + now.getUTCDate()
				+ " " + now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds() 
				+ "." + now.getUTCMilliseconds();
	saveData = [];
	saveData.push([timestamp, minion.x, minion.y, gameIndex, condition, participant]);
	listenerPressKey = function listener(event){
		pressKey(map, goals, minion);
	}
	document.addEventListener("keydown", listenerPressKey);
}

function drawWorld(map){
	let goals = [];
	let minion;
	el.innerHTML = '';
	for(let y = 0; y < map.length ; y = y + 1) {
		for(let x = 0; x < map[y].length ; x = x + 1) {		
			if (map[y][x] === 1) {
				el.innerHTML += "<div class='wall'></div>";
			}
			else if (map[y][x] === 2) {
				el.innerHTML += "<div class='coin'></div>";
				goals.push({"x": x, "y": y, "type": 2});
			}
			else if (map[y][x] === 3) {
				el.innerHTML += "<div class='ground'></div>";
			}
			else if (map[y][x] === 4) {
				el.innerHTML += "<div class='banana'></div>";
				goals.push({"x": x, "y": y, "type": 4});
			}
			else if (map[y][x] === 5) {
				el.innerHTML += "<div class='minion'></div>";
				minion = {"x": x, "y": y};
				
			}
		}
		el.innerHTML += "<br>";
	}
	return [goals, minion];
}

function countDown(seconds){
	timer.innerHTML = seconds;
	//seconds --;
	timeout = setTimeout("countDown("+(seconds-1)+")", 1000);
	if (seconds < 0){
		finish();
	}
}

function pressKey(map, goals, minion){
	let numberGoals = goals.length;
	let i;
	let now = new Date();
	let timestamp = now.getUTCFullYear() + "-" + (now.getUTCMonth() + 1) + "-" + now.getUTCDate()
					+ " " + now.getUTCHours() + ":" + now.getUTCMinutes() + ":" + now.getUTCSeconds() 
					+ "." + now.getUTCMilliseconds();
	if (event.keyCode === 37){ // minion MOVE LEFT
		if (map[minion.y][minion.x-1] !== 1){
			for (i = 0; i < numberGoals; i++){
				if (minion.y == goals[i].y && minion.x == goals[i].x){
					map[minion.y][minion.x] = goals[i].type;
					break;
				}
			}

			if (i == numberGoals){
				map[minion.y][minion.x] = 3;
			}
			minion.x = minion.x - 1;
		}
	}else if (event.keyCode === 38){ // minion MOVE UP
		if ( map[minion.y-1][minion.x] !== 1){
			for (i = 0; i < numberGoals; i++){
				if (minion.y == goals[i].y && minion.x == goals[i].x){
					map[minion.y][minion.x] = goals[i].type;
					break;
				}
			}
			if (i == numberGoals){
				map[minion.y][minion.x] = 3;
			}
			minion.y = minion.y - 1;
		}
	}
	else if (event.keyCode === 39){ // minion MOVE RIGHT
		if ( map[minion.y][minion.x+1] !== 1){
			for (i = 0; i < numberGoals; i++){
				if (minion.y == goals[i].y && minion.x == goals[i].x){
					map[minion.y][minion.x] = goals[i].type;
					break;
				}
			}
			if (i == numberGoals){
				map[minion.y][minion.x] = 3;
			}
			minion.x = minion.x + 1;
		}
	}
	else if (event.keyCode === 40){ // minion MOVE DOWN
		if ( map[minion.y+1][minion.x] !== 1){
			for (i = 0; i < numberGoals; i++){
				if (minion.y == goals[i].y && minion.x == goals[i].x){
					map[minion.y][minion.x] = goals[i].type;
					break;
				}
			}
			if (i == numberGoals){
				map[minion.y][minion.x] = 3;
			}
			minion.y = minion.y + 1;
		}
	}
	saveData.push([timestamp, minion.x, minion.y, gameIndex, condition, participant]);
	map[minion.y][minion.x] = 5;
	drawWorld(map);
}

function finish(){
	clearTimeout(timeout);
	timer.innerHTML = '';
	document.removeEventListener("keydown", listenerPressKey);
	finishButton.style.display = 'none';
	if (isTute){
		startBtn.style.display = 'inline-block';
	}else{
		nextButton.style.display = 'inline-block';
		let fileName = participant + "-" + gameIndex + "-" + condition + ".csv";
		saveToCSV(fileName, saveData);
	}
}

function saveToCSV(fileName, saveData) {
	//let csvContent = "data:text/csv;charset=utf-8,";
	// saveData.forEach(elem => {
	// 	let row = elem.join(",");
	// 	csvContent += row + "\r\n";
	// });
	let csvContent = "";
	for (let i = 0; i < saveData.length; i++){
		let row = saveData[i].join(",");
		csvContent += row + "\r\n";
	}
	let blobObj = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	if (window.navigator.msSaveBlob){
		window.navigator.msSaveBlob(blobObj, fileName);
	}else{
		csvContent = "data:text/csv;charset=utf-8," + csvContent;
		let link = document.createElement("a");
		link.setAttribute("href", encodeURI(csvContent));
		link.setAttribute("download", fileName);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}

function nextGame() {
	gameIndex += 1;
	if (gameIndex >= totalMaps){
		alert('No more maps');
		nextButton.style.display = 'none';
	}else{
		nextButton.style.display = 'none';
		// Change to next map 
		startGame();
	}
}

