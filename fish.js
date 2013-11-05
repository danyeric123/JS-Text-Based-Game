var fishArray = [];

function CreateFish (fish, water, fishId) {
	this.fish = fish;
	this.water = water;
	fishArray.push(this);
}

var bass = new CreateFish("bass", "lake");
var carp = new CreateFish("carp", "lake");
var perch = new CreateFish("perch", "lake");
var trout = new CreateFish("trout", "stream");
var walleye = new CreateFish("walleye", "stream");
var catfish = new CreateFish("catfish", "pond");
var bluegill = new CreateFish("bluegill", "pond");

//CreateFish.prototype.announce = function () {return "A " + this.fish + " has been added to your " + this.water + ".";};
//CreateFish.prototype.kill = function () {return "Your " + this.fish + " has died.";};

function addToDiv () {
		var that =	 fishArray[Math.floor(fishArray.length * Math.random())];
		var newFishie = document.getElementById(that.water);
		newFishie.innerHTML = newFishie.innerHTML + "<p>A " + that.fish + " lives in a " + that.water + ".</p>";
		
		if (document.getElementsByTagName('p').length > 9) {
			clearInterval(gameInterval);
		}
};

function gameState(state) {
	var timerInterval = 4000;
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
			document.getElementById("bass-count").innerHTML = bassCount + 1;
			alert("You caught a glorious bass!");
			break;
			case "carp":
			var carpCount = parseInt(document.getElementById("carp-count").innerHTML);
			document.getElementById("carp-count").innerHTML = carpCount + 1;
			alert("You caught a filthy carp!");
			break;
			case "perc":
			var perchCount = parseInt(document.getElementById("perch-count").innerHTML);
			document.getElementById("perch-count").innerHTML = perchCount + 1;
			alert("You caught a small perch!");
			break;
			case "trou":
			var troutCount = parseInt(document.getElementById("trout-count").innerHTML);
			document.getElementById("trout-count").innerHTML = troutCount + 1;
			alert("You caught a slimy trout!");
			break;
			case "wall":
			var walleyeCount = parseInt(document.getElementById("walleye-count").innerHTML);
			document.getElementById("walleye-count").innerHTML = walleyeCount + 1;
			alert("You caught a weird looking walleye!");
			break;
			case "catf":
			var catfishCount = parseInt(document.getElementById("catfish-count").innerHTML);
			document.getElementById("catfish-count").innerHTML = catfishCount + 1;
			alert("You caught a dangerous catfish!");
			break;
			case "blue":
			var bluegillCount = parseInt(document.getElementById("bluegill-count").innerHTML);
			document.getElementById("bluegill-count").innerHTML = bluegillCount + 1;
			alert("You caught a tiny bluegill!");
			break;
			default:
			alert("nothing caught");
			break;		
		}
		
	fishNodes[caughtFish].parentNode.removeChild(fishNodes[caughtFish]);
	
	}
	
	setTimeout(fishNodeTime, fishNodeTimeout);
}
	

document.getElementById("start").addEventListener("click", function() {gameState("start")}, true);
document.getElementById("stop").addEventListener("click", function() {gameState("stop")}, true);
document.getElementById("fish").addEventListener("click", goFish, true);


	