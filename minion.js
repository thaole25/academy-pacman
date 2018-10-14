// All of our JavaScript code goes here... 
	
// 1 => <div class='wall'></div>
// 2 => <div class='coin'></div>
// 3 => <div class='ground'></div>
// 4 => <div class='ghost'></div>
// 5 => <div class='minion'></div>
// map = [ 1, 2, 3 ]
// map = [ [1,2,3], [1,2,3], [1,2,3] ];

minion = {
	x: 6,
	y: 10
}

goal = {
	x: 2,
	y: 1
}

map = [ 
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
]

let el = document.getElementById('world');

function drawWorld(){
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

drawWorld();

let timer = document.getElementById('timer');
let timeout;

function done(){
	clearTimeout(timeout);
	timer.innerHTML = "DONE!";
	document.onkeydown = null;
}

function countDown(seconds){
	timer.innerHTML = seconds;
	seconds --;
	timeout = setTimeout('countDown('+seconds+')',1000);
	if (seconds < 0){
		done();
	}
}
countDown(30);

document.onkeydown = function(event){
	// console.log(event);
	if (event.keyCode === 37){ // minion MOVE LEFT
		if ( map[minion.y][minion.x-1] !== 1){
			map[minion.y][minion.x] = 3;
			minion.x = minion.x - 1;
			map[minion.y][minion.x] = 5;
			drawWorld();
		}
	}else if (event.keyCode === 38){ // minion MOVE UP
		if ( map[minion.y-1][minion.x] !== 1){
			map[minion.y][minion.x] = 3;
			minion.y = minion.y - 1;
			map[minion.y][minion.x] = 5;
			drawWorld();
		}
	}
	else if (event.keyCode === 39){ // minion MOVE RIGHT
		if ( map[minion.y][minion.x+1] !== 1){
			map[minion.y][minion.x] = 3;
			minion.x = minion.x + 1;
			map[minion.y][minion.x] = 5;
			drawWorld();
		}
	}
	else if (event.keyCode === 40){ // minion MOVE DOWN
		if ( map[minion.y+1][minion.x] !== 1){
			map[minion.y][minion.x] = 3;
			minion.y = minion.y + 1;
			map[minion.y][minion.x] = 5;
			drawWorld();
		}
	}
	reachGoal();
	console.log(reachGoal);
}

function reachGoal(){
	if (minion.x == goal.x && minion.y == goal.y){
		done();
	}
}

function nextGame() {
	location.replace('next.html');
}
