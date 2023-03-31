const express = require('express');
const bodyParser = require('body-parser');
const { getQueryString } = require('./helpers');
const { models } = require('../sequelize');

const routes = {
	users: require('./routes/users'),
	tasks: require('./routes/tasks'),
	// Add more routes here...
	// items: require('./routes/you-model'),
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

// Create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

// Provide a root route just as an example
app.get('/', async (req, res) => {

	let userId = getQueryString(req, 'userId');

	const tasks = await models.task.findAll({
		where: { 
			userId: userId
		}
	});
	//res.status(200).json(tasks);
 
	res.render("index", { tasks });
});

// Define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getById) {
		app.get(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.getById)
		);
	}
	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
	if (routeController.update) {
		app.put(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.update)
		);
	}
	if (routeController.remove) {
		app.delete(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.remove)
		);
	}
	if (routeController.toggle) {
		app.patch(
			`/api/${routeName}/:id`,
			makeHandlerAwareOfAsyncErrors(routeController.toggle)
		);
	}
}

module.exports = app;
