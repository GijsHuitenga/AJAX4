
"use strict"; // opt out of "sloppy mode"

const debug = true; //debuggen

// bind HTML elements via DOM
let weerButton = document.getElementById('weatherButton'); // bind via DOM
let weerButton2 = document.getElementById('weatherButton2'); // bind via DOM
let weatherTickerTape = document.getElementById('weatherTickerTape'); // bind via DOM
let weatherHere = document.getElementById('weatherHere'); // bind via DOM
let completeWeatherHere = document.getElementById('completeWeatherHere'); // bind via DOM
weerButton.addEventListener('click', getWeather);
weerButton2.addEventListener('click', getWeather2);
// weatherTickerTape.addEventListener('click', getWeatherTicker);

// overige variabelen
let apiAddress = "http://weerlive.nl/api/json-data-10min.php?key="; // address

// let key = "77f9e00dfd";
let key = "demo";
let locatie = "&locatie=";

function getLocation() {
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(changeLocation);
	} else {
		x.innerHTML = "Geolocation is not supported by this browser.";
	}
}

let geolocation = "Amsterdam"; // locatie als string]
let url = apiAddress + key + locatie + geolocation;

function getWeather2() {
	weatherHere.innerHTML = "";
	makeAjaxCall(url, "GET"). then (showWeather2, errorHandler);
}

function getWeather() {
	weatherHere.innerHTML = "";
	makeAjaxCall(url, "GET"). then (showWeather, errorHandler); 
}

function showWeather(weatherString) {
	let weatherObject = JSON.parse(weatherString);
	let ditWeer = weatherObject.liveweer[0].plaats + 
	"<br>Temperatuur " + weatherObject.liveweer[0].temp + "&#176;C" + 
	"<br>Verwachting " + weatherObject.liveweer[0].verw + 
	"<br>Weerbeeld " +  weatherObject.liveweer[0].samenv + 
	"<br>Icoon " + "<img src='icons/" + weatherObject.liveweer[0].image + ".png'>" +
	"<br>Neerslag " + weatherObject.liveweer[0].d0neerslag + "&#x25;";
	weatherHere.innerHTML = ditWeer;
}

function showWeather2(weatherString) {
	let weatherObject = JSON.parse(weatherString); // convert JSON string => Object
	let completeData = "";
	for (const [key, value] of Object.entries(weatherObject.liveweer[0])) {
		debug ? console.log(`${key}: ${value}`) : ""; // debug naar console
		completeData += key + " : " + value + "<br>"; // maakt string
		weatherHere.innerHTML = completeData; // string printen in browser
	}
}

function makeAjaxCall(url, methodType) {
	let promiseObj = new Promise(function(resolve, reject){
		debug ? console.log(url) : ""; // conditional ternary
		let xmlhttp = new XMLHttpRequest();
		xmlhttp.open(methodType, url, true);
		xmlhttp.send();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState === 4) {
				if (xmlhttp.status === 200) {
					debug ? console.log("xmlhttp done succesfully") : "";
					let serverResponse = xmlhttp.responseText; // server antwoord met string
					debug ? console.log(serverResponse) : ""; // debug
					resolve(serverResponse); // wordt via return promiseObj terruggegeven
				} else {
					reject(xmlhttp.status);
					console.log("xmlhttp failed"); // debug
				}
			} else {
				debug ? console.log("xmlhttp processing going on") : "";
			}
		}
		debug ? console.log("request sent succesfully") : ""; // debug
	});
}

function errorHandler(statusCode) {
	console.log("failed with status", status);
}
