// Loop through the cities array and create one marker for each city.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create basemaps layer

let baseMaps = {
  "Streets": streets,
  "Satellite Streets": satelliteStreets,
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// // Add our 'streets' tile layer to the map. 
// streets.addTo(map);

// Accessing the Toronto neighborhoods GeoJSON URL.
let torontoHoods ="https://raw.githubusercontent.com/jmmadson/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
  color: "#0000FF",
  weight: 1,
  fillColor: "#FFFFa1",
  fillOpacity: 0.2
}
// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function(data) {
  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
L.geoJSON(data, {
  style: myStyle,
  onEachFeature: function(feature, layer) {
    layer.bindPopup("<h3> Neighborhood: </h3>"  + feature.properties.AREA_NAME);
  }
})
.addTo(map);
});
