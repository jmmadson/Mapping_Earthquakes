// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([37.0902, -95.7129], 3);
// Coordinates for line

let line = [
    [33.9416, -118.4085],
    [30.1975, -97.6664],
    [42.9476, -87.8966],
    [42.6777, -79.6248],
    [40.6413, -73.7781]
  ];

// Create Polyline using the line coordinates and make the line red

L.polyline(line, {
    color: "blue",
    weight: 4,
    opacity: 1.5,
    dashArray: '5, 5', 
    dashOffset: '20'
}).addTo(map)


// We create the tile layer that will be the background of our map.

// Get data from cities.js
let cityData = cities;

// Loop through the cities array and create one marker for each city.
cityData.forEach(function(city) {
    console.log(city)
    L.circleMarker(city.location)
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
  .addTo(map); 
});
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

