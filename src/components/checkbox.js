// Import module
import { useState } from "react"

// Export checkbox components
export default function Checkbox(props){
	const [check, setCheck] = useState(true);

	return (
		<div>
			<input 
				type='checkbox' 
				id='box' 
				checked={check} 
				onChange={(e) => {
					setCheck(e.target.checked);
					props.onChange(e)
				}}/>
			<label form='box'/>		
		</div>
	)
}