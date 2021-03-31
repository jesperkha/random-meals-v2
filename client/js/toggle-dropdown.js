// Stored selected options
let selectedMeal = "";
let selectedRegion = "";
let selectedOptions = [];

function dropdown(id) {
	const toggle = document.getElementById(id);
	const content = document.getElementById(`${id}-content`);

	// Toggle if dropdown is shown or not
	if (content.classList.contains("dropdown-content-down")) {
		content.classList.remove("dropdown-content-down");
		toggle.classList.remove("dropdown-top-down");
	} else {
		content.classList.add("dropdown-content-down");
		toggle.classList.add("dropdown-top-down");
	}
}

function toggleSelect(id) {
	const clicked = document.getElementById(id);
	const parent = document.getElementById(clicked.parentElement.id);

	// remove all selected options
	for (let elem of parent.childNodes) {
		elem?.classList?.remove("select-selected");
	}

	// select new
	clicked.classList.add("select-selected");

	// set value to variable
	if (parent.id == "meal-type-content") {
		if (clicked.id == "any") selectedMeal = "";
		else selectedMeal = clicked.id;
	}

	if (parent.id == "region-content") {
		if (clicked.id == "Rany") selectedRegion = "";
		else selectedRegion = clicked.id;
	}
}

function toggleSelectMultiple(id) {
	const clicked = document.getElementById(id);

	// Toggle for multiple options
	if (clicked.classList.contains("select-selected")) {
		clicked.classList.remove("select-selected");
		selectedOptions.splice(selectedOptions.indexOf(clicked.id), 1);
	} else {
		clicked.classList.add("select-selected");
		selectedOptions.push(clicked.id);
	}
}
