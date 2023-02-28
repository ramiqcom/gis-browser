// Import module
import { useState } from "react";
import { SelectData, addResult } from '../analysisPage';
import { buffer } from '@turf/turf';
import Select from 'react-select';

// Analysis modal components
export default function Buffer (props) {
	// Unit option
	const options = [
		{ value: 'kilometers', label: 'kilometres' }, 
		{ value: 'meters', label: 'meters' }, 
		{ value: 'miles', label: 'miles' }
	];

	// Options state
	const [disabledRun, setDisabledRun] = useState(true);
	const [radius, setRadius] = useState(5);
	const [units, setUnits] = useState(options[0]);
	const [steps, setSteps] = useState(8);

	return (
		<div className="section">

			<div style={{ fontWeight: 'bold' }}>
				Buffer
			</div>

			<div className='paramSection'>
				Layer select
				<SelectData
					onChange={event => {
						event.value !== null ? setDisabledRun(false) : setDisabledRun(true);
					}}
				/>
			</div>
			
			<div className='paramSection'>
				Radius
				<input
					type='number'
					value={radius}
				/>
			</div>

			<div className='paramSection'>
				Units
				<Select 
					options={options}
					value={units}
				/>
			</div>

			<div className='paramSection'>
				Steps
				<input
					type='number'
					value={steps}
				/>
			</div>

			<div className='paramSection'>
				<button 
					className='action'
					disabled={disabledRun}
					onClick={() => {
						const value = buffer(layer.value, radius, { units: units.value, steps: steps });
						const label = `Buffer_${radius}_${units.label}_${layer.label}`;
						addResult({ value, label });
					}}
				>
					Run
				</button>
			</div>
			
		</div>
	)
}