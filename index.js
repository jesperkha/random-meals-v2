// Express shinanigans
const Express = require("express");
const app = Express();
app.use(Express.json());
app.use(Express.static("./client"));

const fetchRecipeFromApi = require("./server/get-api-data");

app.listen(3000, async () => {
	console.log("Listening at 3000 \n");

	// Send recipe data back as object.body
	app.post("/getRecipe", async (req, res) => {
		console.log("Got request:", req.body);

		try {
			const recipe = await fetchRecipeFromApi(req.body);
			const randomIndex = Math.floor(Math.random() * recipe.results.length);

			if (recipe.results.length != 0) res.json({ status: "success", body: recipe.results[randomIndex] });
			else res.json({ status: "blank" });

			console.log("Success \n");
		} catch {
			res.json({ status: "error" });
			console.log("Error \n");
		}
	});
});
