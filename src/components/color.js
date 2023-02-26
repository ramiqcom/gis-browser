// Export color state
export const colorList = [ 'brown', 'red', 'pink', 'orange', 'tan', 'gold', 'yellow', 'olive', 'green', 'lime', 'cyan', 'turquoise', 'dodgerblue', 'blue', 'purple', 'indigo' ];

// Default color
export default function color () {
	const randomElement = colorList[Math.floor(Math.random() * colorList.length)];
	return randomElement;
}