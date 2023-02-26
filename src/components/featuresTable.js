// Import module
import { Grid } from 'gridjs-react';

export default function FeaturesTable(props){
	const name = props.name;
	const data = props.data;
	console.log(data);

	const properties = Object.keys(data.features[0].properties);
	const table = data.features.map((feat, index) => [ index, ...properties.map(prop => feat.properties[prop]) ]);

	return (
		<div>
			<div style={{ fontSize: 'x-large' }}>
				{name}
			</div>

			<Grid 
				columns={['Index', ...properties]}
				data={table}
				resizable={true}
				sort={true}
				search={true}
				height={'800px'}
				fixedHeader={true}
			/>
		</div>
	)
}