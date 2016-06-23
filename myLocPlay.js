window.onload = getMyLocation;

// Getting my location

function getMyLocation() {
	if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(displayLocation,  displayError);
	}
	else {
	alert("Oops, no geolocation support");
	}
}

function displayLocation(position) {
	var latitude = position.coords.latitude;
	var longitude = position.coords.longitude;

	var div = document.getElementById("location");
	div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

	var km = computeDistance(position.coords, graceCoords);
	var distance = document.getElementById("distance");
	distance.innerHTML = "You are " + km + " km from Grace.";

	var message = document.getElementById("message");
	if (km > 100) {
	message.innerHTML = "Damn, that's a little too far! You should fly to visit her, or have her fly her to visit you."
	 }
	else {
	message.innerHTML = "Hey, you're not that far from her. You should just bike or take a train to visit her."
	}

	showMap(position.coords);
}

// Handling error messages

function displayError(error) {
	var errorTypes = {
		0: "Unknown error",
		1: "Permission denied by user",
		2: "Position is not available",
		3: "Request timed out"
	};
	var errorMessage = errorTypes[error.code];
	if (error.code == 0 || error.code == 2) {
		errorMessage = errorMessage + " " + error.message;
	}
	var div = document.getElementById("location");
	div.innerHTML = errorMessage;
}

function degreesToRadians(degrees) {
	var radians = (degrees * Math.PI)/180;
	return radians;
};

// Computing distance from Grace

function computeDistance(startCoords, destCoords) {
var startLatRads = degreesToRadians(startCoords.latitude);
var startLongRads = degreesToRadians(startCoords.longitude);
var destLatRads = degreesToRadians(destCoords.latitude);
var destLongRAds = degreesToRadians(destCoords.longitude);

var Radius = 6371; // radius of Earth in km
var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
	Math.cos(startLatRads) * Math.cos(destLatRads) * 
	Math.cos(startLongRads - destLongRAds)) * Radius;
	return Math.round(distance);
};


var graceCoords = {
	latitude: 37.3846128,
	longitude: 126.90502679999997
};

// Creating a map

var googleLatAndLong = new google.maps.LatLng(latitude, longitude);

var map;

function showMap(coords) {
	var googleLatAndLong = 
		new google.maps.LatLng(coords.latitude, coords.longitude);

	var mapOptions = {
	zoom: 10,
	center: googleLatAndLong,
	mapTypeId: google.maps.MapTypeId.Roadmap
	};
	var mapDiv = document.getElementById("map");
	map = new google.maps.Map(mapDiv, mapOptions);
}







