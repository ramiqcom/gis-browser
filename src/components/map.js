// Map state
export let Map;
let Tile;
export const setTile = (value) => Tile = value;

// ** Global Variables ** //

export default function init(id){
	/*
	// Import additional module
	require('plotty');
	require('leaflet-geotiff-2');
	require('leaflet-geotiff-2/dist/leaflet-geotiff-rgb');
	require("leaflet-geotiff-2/dist/leaflet-geotiff-vector-arrows");
	require("leaflet-geotiff-2/dist/leaflet-geotiff-plotty");
	*/

	// Assign map
	Map = L.map(id, 
		{ 
			center: { lat: -7.7, lng: 110.39 } ,
			zoom: 10
		}
	);
	
	// Add tile to map
	Tile = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(Map);
}