// All of our JavaScript code goes here... 
	
// 1 => <div class='wall'></div>
// 2 => <div class='coin'></div>
// 3 => <div class='ground'></div>
// 4 => <div class='banana'></div>
// 5 => <div class='minion'></div>

function drawWorld(map){
	el.innerHTML = '';
	for(var y = 0; y < map.length ; y = y + 1) {
		for(var x = 0; x < map[y].length ; x = x + 1) {		
			if (map[y][x] === 1) {
				el.innerHTML += "<div class='wall'></div>";
			}
			else if (map[y][x] === 2) {
				el.innerHTML += "<div class='coin'></div>";
			}
			else if (map[y][x] === 3) {
				el.innerHTML += "<div class='ground'></div>";
			}
			else if (map[y][x] === 4) {
				el.innerHTML += "<div class='banana'></div>";
			}
			else if (map[y][x] === 5) {
				el.innerHTML += "<div class='minion'></div>";
			}
		}
		el.innerHTML += "<br>";
	}
}

let timer = document.getElementById('timer');
let timeout;

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

function done(){
	let getTimer = MAX_TIME - seconds - 1;
	clearTimeout(timeout);
	timer.innerHTML = "DONE!";
	//document.onkeydown = null;
	document.removeEventListener("keydown", pressKey);
	let results = {time: getTimer, pos: savePositions};
	download(fileName, results);
	console.log(getTimer);
	console.log(savePositions);
}

function countDown(){
	timer.innerHTML = seconds;
	seconds --;
	timeout = setTimeout(countDown,1000);
	if (seconds < 0){
		done();
	}
}

function pressKey(event){
	let numberGoals = goals.length;
	let i;
	if (event.keyCode === 37){ // minion MOVE LEFT
		if ( map[minion.y][minion.x-1] !== 1){
			for (i = 0; i < numberGoals; i++){
				if (minion.y == goals[i].y && minion.x == goals[i].x){
					map[minion.y][minion.x] = goals[i].img;
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
					map[minion.y][minion.x] = goals[i].img;
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
					map[minion.y][minion.x] = goals[i].img;
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
					map[minion.y][minion.x] = goals[i].img;
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
