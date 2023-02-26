// API to fetch outside file
export default async function handler(req, res){
	const url = req.body;
	try {
		const response = await fetch(url);
		const result = await response.text();
		res.status(200).send(result);
	} catch (err) {
		res.status(404).send({ message: err });
	}
}