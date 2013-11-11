function FisherPerson () {
		this.level = 0;
		this.multiplier = 1;
}

var fisherMan = new FisherPerson();

var fishArray = [];

CreateFish.prototype = fisherMan;

function CreateFish (fish, water, amount, chance, weight) {
	this.fish = fish;
	this.water = water;
	this.amount = amount;
	this.chance = chance;
	this.weight = weight;
	
	fishArray.push(this);
	
	console.log("A " + fish + " has been been born.");
}

//CreateFish.prototype.parent = FisherPerson.prototype;

var bass = new CreateFish("bass", "lake", 0, 2, 10);
var carp = new CreateFish("carp", "lake", 0, 1, 4);
var perch = new CreateFish("perch", "lake", 0, 1, 6);
var trout = new CreateFish("trout", "stream", 0, 3, 10);
var walleye = new CreateFish("walleye", "stream", 0, 3, 12);
var catfish = new CreateFish("catfish", "pond", 0, 2, 4);
var bluegill = new CreateFish("bluegill", "pond", 0, 0, 2);
var shad = new CreateFish("shad", "stream", 0, 0, 2);
var salmon = new CreateFish("salmon", "lake", 0, 3, 20);
var rockbass = new CreateFish("rock bass", "pond", 0, 0, 1);
var sucker = new CreateFish("sucker", "stream", 0, 0, 1);
//var whiteWhale = new CreateFish("white whale", "ocean", 0, 1, 200)

//CreateFish.prototype.announce = function () {return "A " + this.fish + " has been added to your " + this.water + ".";};
//CreateFish.prototype.kill = function () {return "Your " + this.fish + " has died.";};

CreateFish.prototype.points = function () {
	var locPoints = document.getElementById("total-points-count");
	var initPoints = parseInt(locPoints.innerHTML);
	
	this.weight = this.weight * this.multiplier;
	locPoints.innerHTML = initPoints + this.weight;
	
	//adjust level and score multiplier
	if (parseInt(locPoints.innerHTML) > 100 && this.level === 0) {	
		document.getElementById("fisherman-level-count").innerHTML = "Kayak Fisherman";
		fisherMan.multiplier = 2;
		fisherMan.level = 1;
		alert("You've been upgraded to a kayak fisherman!");
	} else if (parseInt(locPoints.innerHTML) > 200 && this.level === 1) {
		document.getElementById("fisherman-level-count").innerHTML = "Boat Fisherman";
		fisherMan.multiplier = 3;
		alert("You now own a boat!");
		fisherMan.level = 2;
	} else if (parseInt(locPoints.innerHTML) > 300 && this.level === 2) {
		document.getElementById("fisherman-level-count").innerHTML = "Ocean King";
		fisherMan.multiplier = 3;
		alert("Get that white whale.");
		fisherMan.level = 3;
	}
	
};

CreateFish.prototype.updateCount = function (fCount) {
	var fishCount = parseInt(document.getElementById(fCount + "-count").innerHTML);
	
	fishCount = fishCount + 1;
	this.amount = fishCount;
	document.getElementById(fCount + "-count").innerHTML = fishCount;

	this.points();
	
};

function addToDiv () {
	var fishNewArray = [];

	var randomGenerator = Math.floor(Math.random() * 4);
	
	function meetsChance(elem) {
		return elem.chance <= randomGenerator;
		}
	
	fishNewArray = fishArray.filter(meetsChance);
	var that = fishNewArray[Math.floor(fishNewArray.length * Math.random())];
	var newFishie = document.getElementById(that.water);
	newFishie.innerHTML = newFishie.innerHTML + "<p class=\"" + that.fish + "\">A " + that.fish + " lives in a " + that.water + ".</p>";
		
	if (document.getElementsByTagName('p').length > 19) {
		clearInterval(gameInterval);
	}
}

function gameState(state) {
	var timerInterval = 300;
	
	if (state == "start") {
		gameInterval = setInterval(function() {addToDiv();}, timerInterval);
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
	}
}

function goFish() {
	var fishNodes = document.getElementsByTagName('p');
	var caughtFish = Math.floor(fishNodes.length * Math.random());
	var fishNodeTimeout = Math.floor(Math.random() * 15) * 100;
        
	document.getElementById("fishing").style.visibility = "visible";
        
	function fishNodeTime () {
		document.getElementById("fishing").style.visibility = "hidden";
		document.getElementById("start").disabled = false;
                
		var fishClass = fishNodes[caughtFish].className;
                
		//current quickfix for updating fishcount
		switch(fishClass) {
			case "bass":
				bass.updateCount("bass");
				alert("You caught a glorious bass!");
			break;
			case "carp":
				carp.updateCount("carp");
				alert("You caught a filthy carp!");
			break;
			case "perch":
				perch.updateCount("perch");
				alert("You caught a small perch!");
			break;
			case "trout":
				trout.updateCount("trout");
				alert("You caught a slimy trout!");
			break;
			case "walleye":
				walleye.updateCount("walleye");
				alert("You caught a weird looking walleye!");
			break;
			case "catfish":
				catfish.updateCount("catfish");
				alert("You caught a dangerous catfish!");
			break;
			case "bluegill":
				bluegill.updateCount("bluegill");     
				alert("You caught a tiny bluegill!");
			break;
			case "shad":
				shad.updateCount("shad");     
				alert("You caught a finicky shad!");
			break;
			case "salmon":
				salmon.updateCount("salmon");     
				alert("You caught a tasty salmon!");
			break;
			case "rock bass":
				rockbass.updateCount("rockbass");     
				alert("You caught an annoying rock bass!");
			break;
			case "sucker":
				sucker.updateCount("sucker");     
				alert("You caught a super gross sucker!");
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

document.getElementById("start").addEventListener("click", function() {gameState("start");}, true);
document.getElementById("stop").addEventListener("click", function() {gameState("stop");}, true);
document.getElementById("fish").addEventListener("click", goFish, true);