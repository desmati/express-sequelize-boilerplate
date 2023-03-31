// A helper function to assert the request ID param is valid
// and convert it to a number (since it comes as a string by default)
function getIdParam(req) {
	const id = req.params.id;
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid ':id' param: "${id}"`);
}

// A helper function to assert the request ID query string is valid
// and convert it to a number (since it comes as a string by default)
function getQueryString(req, key) {
	const id = req.query[key];
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid ':${key}' query sting param: "${id}"`);
}


module.exports = { getIdParam, getQueryString };
