// Get values from API call result
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
	if (mn == 0) data.time = null;
	else data.time = `${mn} Minutes`;

	data.nutrition = recipe.nutrition;
	data.servings = recipe.yields;

	delete data.nutrition.updated_at;

	return data;
}

// Request recipe. Goes through backend
async function requestRecipe() {
	// show loading screen
	document.getElementById("loading").style.display = "flex";
	document.getElementById("main-content").style.display = "none";

	// Get selected tags from dropdowns
	let tags = [];
	if (selectedRegion) tags.push(selectedRegion);
	if (selectedMeal) tags.push(selectedMeal);
	tags = tags.concat(selectedOptions);

	const options = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(tags),
	};

	try {
		const res = await fetch("/getRecipe", options);
		const json = await res.json();

		if (json.status == "success") {
			// Set data and change page
			localStorage.setItem("data", JSON.stringify(getValues(json.body)));
			window.location = "./recipe.html";
		} else {
			// Show too many options message
		}
	} catch {
		// Show error message
		const err = document.getElementById("error");
		err.style.display = "flex";
		err.classList.add("show-error");
		setTimeout(() => {
			err.classList.remove("show-error");
			setTimeout(() => (err.style.display = "none"), 1000);
		}, 2000);

		// remove loading screen
		document.getElementById("loading").style.display = "none";
		document.getElementById("main-content").style.display = "flex";
	}
}
