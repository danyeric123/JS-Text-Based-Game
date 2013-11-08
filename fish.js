var fishArray = [];

function CreateFish (fish, water, amount, chance, weight) {
	this.fish = fish;
	this.water = water;
	this.amount = amount;
	this.chance = chance;
	this.weight = weight;
	
	fishArray.push(this);
	
	console.log("A " + fish + " has been been born.")
}

var bass = new CreateFish("bass", "lake", 0, 2, 8);
var carp = new CreateFish("carp", "lake", 0, 4, 3);
var perch = new CreateFish("perch", "lake", 0, 5, 5);
var trout = new CreateFish("trout", "stream", 0, 2, 9);
var walleye = new CreateFish("walleye", "stream", 0, 8, 10);
var catfish = new CreateFish("catfish", "pond", 0, 6, 2);
var bluegill = new CreateFish("bluegill", "pond", 0, 9, 1);
//var whiteWhale = new CreateFish("white whale", "ocean", 0, 1, 200)

//CreateFish.prototype.announce = function () {return "A " + this.fish + " has been added to your " + this.water + ".";};
//CreateFish.prototype.kill = function () {return "Your " + this.fish + " has died.";};
CreateFish.prototype.points = function () {
	var locPoints = document.getElementById("total-points-count");
	var initPoints = parseInt(locPoints.innerHTML);
	
	locPoints.innerHTML = initPoints + this.weight;
	
	}

function addToDiv () {
	var that = fishArray[Math.floor(fishArray.length * Math.random())];
	var newFishie = document.getElementById(that.water);
	newFishie.innerHTML = newFishie.innerHTML + "<p>A " + that.fish + " lives in a " + that.water + ".</p>";
		
	if (document.getElementsByTagName('p').length > 9) {
		clearInterval(gameInterval);
		}
};

function gameState(state) {
	var timerInterval = 1000;
	
	if (state == "start") {
		gameInterval = setInterval(function() {addToDiv()}, timerInterval);
		alert("Stocking fish!");
			document.getElementById("start").disabled = true;
	} else {
		clearInterval(gameInterval);
		alert("Stocking stopped");
		document.getElementById("start").disabled = false;
	}
}

function countTotalFish () {
	var totalFish = 0;
	for (i=0; i<fishArray.length; i++) {
		var gorkaNodes = fishArray[i].amount;
		totalFish += gorkaNodes;
		document.getElementById("total-fish-count").innerHTML = totalFish;
	};
}

function goFish() {
	var fishNodes = document.getElementsByTagName('p');
	var caughtFish = Math.floor(fishNodes.length * Math.random());
	var fishNodeTimeout = Math.floor(Math.random() * 15) * 1000;
        
	document.getElementById("fishing").style.display = "block";
        
	function fishNodeTime () {
		document.getElementById("fishing").style.display = "none";
		document.getElementById("start").disabled = false;
                
		var fishPrefix = fishNodes[caughtFish].innerHTML.slice(2,6);
                
			//current quickfix for updating fishcount
		switch(fishPrefix) {
			case "bass":
				var bassCount = parseInt(document.getElementById("bass-count").innerHTML);
				bassCount = bassCount + 1;
				fishArray[0].amount = bassCount;
				document.getElementById("bass-count").innerHTML = bassCount;
	                        
				bass.points();
	                        
				alert("You caught a glorious bass!");
			break;
			case "carp":
				var carpCount = parseInt(document.getElementById("carp-count").innerHTML);
				carpCount = carpCount + 1;
				fishArray[1].amount = carpCount;
				document.getElementById("carp-count").innerHTML = carpCount;
	                        
				carp.points();
	                        
				alert("You caught a filthy carp!");
			break;
			case "perc":
				var perchCount = parseInt(document.getElementById("perch-count").innerHTML);
				perchCount = perchCount + 1;
				fishArray[2].amount = perchCount;
				document.getElementById("perch-count").innerHTML = perchCount;
	                        
				perch.points();
	                        
				alert("You caught a small perch!");
			break;
			case "trou":
				var troutCount = parseInt(document.getElementById("trout-count").innerHTML);
				troutCount = troutCount + 1;
				fishArray[3].amount = troutCount;
				document.getElementById("trout-count").innerHTML = troutCount;
	                        
				trout.points();
	                        
				alert("You caught a slimy trout!");
			break;
			case "wall":
				var walleyeCount = parseInt(document.getElementById("walleye-count").innerHTML);
				walleyeCount = walleyeCount + 1;
				fishArray[4].amount = walleyeCount;
				document.getElementById("walleye-count").innerHTML = walleyeCount;
	                        
				walleye.points();
	                        
				alert("You caught a weird looking walleye!");
			break;
			case "catf":
				var catfishCount = parseInt(document.getElementById("catfish-count").innerHTML);
				catfishCount = catfishCount + 1;
				fishArray[5].amount = catfishCount;
				document.getElementById("catfish-count").innerHTML = catfishCount;
	                        
				catfish.points();
	                        
				alert("You caught a dangerous catfish!");
			break;
			case "blue":
				var bluegillCount = parseInt(document.getElementById("bluegill-count").innerHTML);
				bluegillCount = bluegillCount + 1;
				fishArray[6].amount = bluegillCount;
				document.getElementById("bluegill-count").innerHTML = bluegillCount;
	                        
				bluegill.points();
	                        
				alert("You caught a tiny bluegill!");
			break;
			default:
				alert("nothing caught");
			break;                
			}
                
		fishNodes[caughtFish].parentNode.removeChild(fishNodes[caughtFish]);
		countTotalFish();
        
        }
        
setTimeout(fishNodeTime, fishNodeTimeout);
    
}

document.getElementById("start").addEventListener("click", function() {gameState("start")}, true);
document.getElementById("stop").addEventListener("click", function() {gameState("stop")}, true);
document.getElementById("fish").addEventListener("click", goFish, true);