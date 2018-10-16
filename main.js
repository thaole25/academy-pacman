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

const design1 = {
	map: map1,
	minion: {x: 6, y: 10},
	goals: [{x: 2, y: 1, img: 4}, {x: 6, y: 1, img: 2}, {x: 10, y: 1, img: 2}]
}

const design2 = {
	map: map2,
	minion: {x: 6, y: 10},
	goals: [{x: 2, y: 1, img: 4}, {x: 6, y: 1, img: 2}, {x: 10, y: 1, img: 2}]
}

const design3 = {
	map: map3,
	minion: {x: 6, y: 5},
	goals: [{x: 6, y: 1, img: 4}, {x: 2, y: 9, img: 2}, {x: 10, y: 9, img: 2}]
}

const MAX_TIME = 30;

let el = document.getElementById('world');

let design = design1;
let map = design.map;
let minion = design.minion;
let goals = design.goals;
let currentMap = 1;
let seconds = MAX_TIME;
let savePositions = [];
let fileName = currentMap + ".json";

function nextGame() {
    //done();
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

drawWorld(map);
countDown();
//countDown(30);
document.addEventListener("keydown", pressKey);

