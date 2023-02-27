// API to fetch outside file
export default async function handler(req, res){
	const body = req.body;
	try {
		const response = await fetch(body);
		const result = await response.arrayBuffer();
		const string = Buffer.from(result).toString('base64');
		res.status(200).send(string);
	} catch (err) {
		res.status(404).send({ message: err });
	}
}