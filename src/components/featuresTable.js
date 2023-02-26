// Import module
import { Grid, _ } from 'gridjs-react';
import * as turf from '@turf/turf';

// Main react components for features/data table
export default function FeaturesTable(props){
	// Main state
	const Map = props.map;
	const name = props.name;
	const data = props.data;

	// Create array for table
	const properties = Object.keys(data.features[0].properties);
	const table = data.features.map((feat, index) => {

		// Get centroid coordinates for zoom
		const coords = turf.centroid(feat).geometry.coordinates;
		const newCoords = [ coords[1], coords[0] ];

		// Click index for zoom to object
		const indexZoom = _(
			<div style={{ cursor: 'pointer' }} onClick={()  =>  Map.flyTo(newCoords, 18, { animate: true }) }>
				{index}
			</div>
		)

		return [ indexZoom, ...properties.map(prop => feat.properties[prop]) ]; 
	});

	return (
		<div>
			<div style={{ fontSize: 'x-large' }}>
				{name}
			</div>

			<Grid 
				columns={['Index', ...properties ]}
				data={table}
				resizable={true}
				sort={true}
				search={true}
				height={'800px'}
				fixedHeader={true}
				style={{ table: { fontSize: 'small', height: '5px' } }}
			/>
		</div>
	)
}