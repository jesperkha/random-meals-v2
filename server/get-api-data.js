// Gets food data

require("dotenv").config();
const fetch = require("node-fetch");

/**
 * Fetches food data.
 * Param: tags (array of strings with tags for query)
 * @param {Array} tags
 * @returns {object}
 */
module.exports = async (tags) => {
	const API_KEY = process.env.API_KEY;
	const options = {
		method: "GET",
		headers: {
			"x-rapidapi-key": API_KEY,
			"x-rapidapi-host": "tasty.p.rapidapi.com",
		},
	};

	const res = await fetch(`https://tasty.p.rapidapi.com/recipes/list?&tags=${tags}`, options);
	const json = await res.json();
	return json;
};
