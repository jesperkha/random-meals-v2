function getTags() {
	let tags = [];

	const pushFromSelect = (id) => {
		const select = document.getElementById(id);
		if (select.value != "") tags.push(select.value);
	};

	pushFromSelect("select-region");
	pushFromSelect("select-meal");

	document.getElementById("options").childNodes.forEach((e) => {
		if (e?.localName == "input" && e.checked) tags.push(e.value);
	});

	return tags;
}

function getValues(json) {
	let data = {};

	let recipe;
	if (json.hasOwnProperty("instructions")) recipe = json;
	else recipe = json.recipes[0];

	data.instructions = [];
	for (let i of recipe.instructions) {
		data.instructions.push(i.display_text);
	}

	data.ingredients = [];
	const ingredients = recipe.sections[0].components;
	for (let i of ingredients) {
		data.ingredients.push(i.raw_text);
	}

	data.name = json.name;
	data.img = json.thumbnail_url;

	const time = recipe.total_time_minutes;
	const hr = Math.floor(time / 60);
	const mn = time % 60;
	if (hr > 0) data.time = `${hr} Hours ${mn} Minutes`;
	else data.time = `${mn} Minutes`;

	data.nutrition = recipe.nutrition;
	data.servings = recipe.yields;

	delete data.nutrition.updated_at;

	return data;
}

async function requestRecipe() {
	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(getTags()),
	};

	const res = await fetch("/getRecipe", options);
	const json = await res.json();

	localStorage.setItem("data", JSON.stringify(getValues(json.body)));
	window.location = "./recipe.html";
}
