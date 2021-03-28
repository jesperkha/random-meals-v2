function getTags() {
	let tags = [];

	const pushFromSelect = (id) => {
		const select = document.getElementById(id);
		if (select.value != "") tags.push(select.value);
	};

	pushFromSelect("select-ethnicity");
	pushFromSelect("select-meal");

	document.getElementById("options").childNodes.forEach((e) => {
		if (e?.localName == "input" && e.checked) tags.push(e.value);
	});

	console.log(tags);
	return tags;
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
	console.log(json);
}
