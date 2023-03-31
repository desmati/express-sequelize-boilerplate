const app = require('./express/app');
const sequelize = require('./sequelize');
const PORT = 8080;

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

async function assertDatabaseCreationOK() {
	// Making sure setup.js initialized in oder to create tables; otherwise, you will get no such table errors

	const fs = require('fs');
	if (fs.existsSync('.dbinit')) {
		return;
	}

	const runSetup = require('./sequelize/setup');

	await runSetup();

	fs.writeFile(".dbinit", "Database initialized", (err) => {
		if (err)
			console.log(err);
		else {
			console.log(fs.readFileSync(".dbinit", "utf8"));
		}
	});

}

async function init() {
	await assertDatabaseConnectionOk();

	await assertDatabaseCreationOK();

	console.log(`Starting Sequelize + Express example on port ${PORT}...`);

	app.listen(PORT, () => {
		console.log(`Express server started on port ${PORT}. Try some routes, such as '/api/tasks'.`);
	});
}

init();
