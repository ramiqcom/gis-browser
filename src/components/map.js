// Map state
export let Map;

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

	// Tile

	// Esri world imagery
	const ewi = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	});

	// Open Street Map HOT
	const osmHot = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
	})

	// Assign map
	Map = L.map(id, 
		{ 
			center: { lat: -7.7, lng: 110.39 } ,
			zoom: 10,
			layers: [ ewi, osmHot ]
		}
	);

	// Basemap
	const basemap = {
		'ESRI World Imagery': ewi,
		'OpenStreetMap HOT': osmHot
	};

	// Control
	const control = L.control.layers(basemap).addTo(Map);
}