// Express shinanigans
const Express = require("express");
const app = Express();
app.use(Express.json());
app.use(Express.static("./client"));
app.listen(3000, () => {
	console.log("Listening at 3000");
});
