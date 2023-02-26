// Import modules
import { useRef } from "react";

// Export the panel ref
export let dataPanelRef;

// Export data panel
export default function DataPanel(props) {
	dataPanelRef = useRef();

	return (
		<div className="dataBlock" ref={dataPanelRef} style={{ height: '100%', overflow: 'auto', gap: '5px' }}>
			{props.children}
		</div>
	)
}