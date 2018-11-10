// 1 => <div class='wall'></div>
// 2 => <div class='coin'></div>
// 3 => <div class='ground'></div>
// 4 => <div class='banana'></div>
// 5 => <div class='minion'></div>

const map1 = [ 
    [1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,3,4,3,3,3,2,3,3,3,2,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1], 
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,1,3,3,3,3,1],  
    [1,3,3,3,3,3,5,3,3,3,3,1], 
    [1,1,1,1,1,1,1,1,1,1,1,1], 
];

const map2 = [ 
    [1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,3,4,3,3,3,2,3,3,3,2,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1], 
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,5,3,3,3,3,1], 
    [1,1,1,1,1,1,1,1,1,1,1,1], 
];

const map3 = [ 
    [1,1,1,1,1,1,1,1,1,1,1,1], 
    [1,3,3,3,3,3,4,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1], 
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,5,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1],  
    [1,3,2,3,3,3,3,3,3,3,2,1],  
    [1,3,3,3,3,3,3,3,3,3,3,1], 
    [1,1,1,1,1,1,1,1,1,1,1,1], 
];

const MAX_TIME = 3;
const el = document.getElementById('world');
const nextButton = document.getElementById('nextBtn');
const finishButton = document.getElementById('finishBtn');
const timer = document.getElementById('timer');
const historyMap = [map1, map2, map3];

let listenerPressKey;
let timeout;
let gameIndex = 0;
let seconds = MAX_TIME;
let savePositions = [];
//let fileName = currentMap + ".json";

startGame();

function startGame(){
	let map = historyMap[gameIndex];
	gameIndex += 1;
	results = drawWorld(map);
	let goals = results[0];
	let minion = results[1];
	countDown();
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

function countDown(){
	timer.innerHTML = seconds;
	seconds --;
	timeout = setTimeout(countDown, 1000);
	if (seconds < 0){
		finish();
	}
}

function pressKey(map, goals, minion){
	let numberGoals = goals.length;
	let i;
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
			savePositions.push([minion.x, minion.y]);
			map[minion.y][minion.x] = 5;
			drawWorld(map);
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
			savePositions.push([minion.x, minion.y]);
			map[minion.y][minion.x] = 5;
			drawWorld(map);
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
			savePositions.push([minion.x, minion.y]);
			map[minion.y][minion.x] = 5;
			drawWorld(map);
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
			savePositions.push([minion.x, minion.y]);
			map[minion.y][minion.x] = 5;
			drawWorld(map);
		}
	}
}

function finish(){
	const getTimer = MAX_TIME - seconds - 1;
	clearTimeout(timeout);
	timer.innerHTML = '';
	document.removeEventListener("keydown", listenerPressKey);
	let results = {time: getTimer, pos: savePositions};
	finishButton.style.display = 'none';
	nextButton.style.display = 'inline-block';
	//download(fileName, results);
}

function nextGame() {
    //done();
    nextButton = document.getElementById("nextMap");
    nextButton.disabled = true;
	if (currentMap == 1){
		design = design2;
		currentMap += 1;
	}else if (currentMap == 2){
		design = design3;
		currentMap += 1;
	}else{
        alert("No more maps! Back to the first map");
        design = design1;
        currentMap = 1;
	}
	map = design.map;
	minion = design.minion;
    goals = design.goals;
    savePositions = [];
    fileName = currentMap + ".json";
    drawWorld(map);
    seconds = MAX_TIME;
    countDown();
    //countDown(30);
    document.addEventListener("keydown", pressKey);
}

function download(fileName, exportObj) {
	// https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj)));
	element.setAttribute('download', fileName);
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

