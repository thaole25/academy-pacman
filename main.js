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
	goal: {x: 2, y: 1}
}

const design2 = {
	map: map2,
	minion: {x: 6, y: 10},
	goal: {x: 2, y: 1}
}

const design3 = {
	map: map3,
	minion: {x: 6, y: 5},
	goal: {x: 6, y: 1}
}

let el = document.getElementById('world');

let design = design1;
let map = design.map;
let minion = design.minion;
let goal = design.goal;
let currentMap = 0;

function nextGame() {
    done();
	if (currentMap == 0){
		design = design2;
		currentMap += 1;
	}else if (currentMap == 1){
		design = design3;
		currentMap += 1;
	}else{
        alert("No more maps! Back to the first map");
        design = design1;
        currentMap = 0;
	}
	map = design.map;
	minion = design.minion;
	goal = design.goal;
    //location.reload();
    drawWorld(map);
    countDown(30);
    document.addEventListener("keydown", pressKey);
    //document.onkeydown = pressKey(event);
}

drawWorld(map);
countDown(30);
document.addEventListener("keydown", pressKey);

