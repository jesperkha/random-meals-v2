function toggleRecipeSelect(id) {
	// reset other buttons
	document.getElementById("ingredients").classList.remove("selected");
	document.getElementById("instructions").classList.remove("selected");
	document.getElementById("details").classList.remove("selected");

	// reset other content divs
	document.getElementById("r_ingredients").classList.remove("selected-content");
	document.getElementById("r_instructions").classList.remove("selected-content");
	document.getElementById("r_details").classList.remove("selected-content");

	// Select chosen option
	document.getElementById(id).classList.add("selected");
	document.getElementById(`r_${id}`).classList.add("selected-content");
}
