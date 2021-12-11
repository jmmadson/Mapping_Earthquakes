// Create the map object with center at the San Francisco airport.
let map = L.map('mapid').setView([30, 30], 2);

// Loop through the cities array and create one marker for each city.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Add our 'streets' tile layer to the map. 
streets.addTo(map);

// Add GeoJSON data.
let airportData = "https://raw.githubusercontent.com/jmmadson/Mapping_Earthquakes/main/majorAirports.json";

// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
  console.log(data);

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data).addTo(map);

  L.geoJson(data, {
      onEachFeature: function(features, layer){
      layer.bindPopup("<h2> Airport code: " + features.properties.faa + "<hr>" + "Airport Name: " + features.properties.name + ", " + features.properties.country + "</h2>")
    }
  }).addTo(map);

});