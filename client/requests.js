function dropdown(id) {
	const toggle = document.getElementById(id);
	const content = document.getElementById(`${id}-content`);

	if (content.classList.contains("dropdown-content-down")) {
		content.classList.remove("dropdown-content-down");
		toggle.classList.remove("dropdown-top-down");
	} else {
		content.classList.add("dropdown-content-down");
		toggle.classList.add("dropdown-top-down");
	}
}

let selectedMeal = "";
let selectedRegion = "";

function toggleSelect(id) {
	const clicked = document.getElementById(id);
	const parent = document.getElementById(clicked.parentElement.id);

	for (let elem of parent.childNodes) {
		elem?.classList?.remove("select-selected");
	}
	clicked.classList.add("select-selected");

	if (parent.id == "meal-type-content") {
		if (clicked.id == "any") selectedMeal = "";
		else selectedMeal = clicked.id;
	}

	if (parent.id == "region-content") {
		if (clicked.id == "Rany") selectedRegion = "";
		else selectedRegion = clicked.id;
	}
}

let selectedOptions = [];

function toggleSelectMultiple(id) {
	const clicked = document.getElementById(id);

	if (clicked.classList.contains("select-selected")) {
		clicked.classList.remove("select-selected");
		selectedOptions.splice(selectedOptions.indexOf(clicked.id), 1);
	} else {
		clicked.classList.add("select-selected");
		selectedOptions.push(clicked.id);
	}
}

// -------------------------------------------------------------------
// -------------------------------------------------------------------
// -------------------------------------------------------------------

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
	document.getElementById("loading").style.display = "flex";
	document.getElementById("main-content").style.display = "none";

	let tags = [];
	if (selectedRegion) tags.push(selectedRegion);
	if (selectedMeal) tags.push(selectedMeal);
	tags = tags.concat(selectedOptions);
	console.log(tags);

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
			localStorage.setItem("data", JSON.stringify(getValues(json.body)));
			window.location = "./recipe.html";
		} else {
			// Show too many options message
		}
	} catch {
		const err = document.getElementById("error");
		err.style.display = "flex";
		err.classList.add("show-error");
		setTimeout(() => {
			err.classList.remove("show-error");
			setTimeout(() => (err.style.display = "none"), 1000);
		}, 2000);

		document.getElementById("loading").style.display = "none";
		document.getElementById("main-content").style.display = "flex";
	}
}
