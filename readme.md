# Sequelize + Express Boilerplate, Hossein's Recipe

This is an example of how to setup Sequelize and Express together in a project for NodeJS.

Feel free to download this and use as a starting point for your brief!

This example uses Postgres as the database engine.

## How to use?

* Install dependencies with `npm i`
* In ./sequelize/index.js at the 5th line, enter your database credentials.
* Run with `npm start`
* Open your browser and try the REST endpoints:
	* UI: 					`localhost:8080/` (minimal UI)
	* Get All: 				`localhost:8080/api/tasks/?userId=1` (GET)
	* Get by id:			`localhost:8080/api/tasks/1` (GET)
	* New task:				`localhost:8080/api/tasks/?userId=1` (POST)
		* Body format: 		`{ subject: 'New task title' }`
	* Toggle completion:	`localhost:8080/api/tasks/1` (PATCH)
	* Remove:				`localhost:8080/api/tasks/1` (DELETE)

## New model or New controller

Create a new model `your-model.model.js` and a new express route controller `your-model.js` to handle:

* `GET` and `CREATE` in `/api/your-model`
* `GET`, `PUT` and `DELETE` in `/api/your-model/:id`

## No front-end!

I focus only on how you will integrate Sequelize with Express in your backend. If you want to contribute to the UI, please go ahead. There is a dummy UI implemented using ejs. 

## License

MIT
