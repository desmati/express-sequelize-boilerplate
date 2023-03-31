const { models } = require('../../sequelize');
const { getIdParam, getQueryString } = require('../helpers');

async function getAll(req, res) {
	let userId = getQueryString(req, 'userId');

	const tasks = await models.task.findAll({
		where: {
			userId: userId
		}
	});
	res.status(200).json(tasks);
};

async function getById(req, res) {
	const id = getIdParam(req);
	const task = await models.task.findByPk(id);
	if (task) {
		res.status(200).json(task);
	} else {
		res.status(404).send('404 - Not found');
	}
};

async function create(req, res) {
	let userId = getQueryString(req, 'userId');
	if (!userId) {
		res.status(400).send("Provide userId");
	}

	let title = req.body.title;
	if (!title) {
		res.status(400).send("Provide task title");
	}

	if (req.body.id) {
		res.status(400).send(`Bad request: ID should not be provided, since it is determined automatically by the database.`)
	} else {
		let task = {
			title,
			status: "todo",
			userId: userId
		};
		console.log("new task", task);

		await models.task.create(task);
		res.status(201).end();
	}
};

async function update(req, res) {
	let userId = getQueryString(req, 'userId');
	if (!userId) {
		res.status(400).send("Provide userId");
	}

	const id = getIdParam(req);

	// We only accept an UPDATE request if the `:id` param matches the body `id`
	if (req.body.id === id) {
		await models.task.update(req.body, {
			where: {
				id: id
			}
		});
		res.status(200).end();
	} else {
		res.status(400).send(`Bad request: param ID (${id}) does not match body ID (${req.body.id}).`);
	}
};

async function toggle(req, res) {
	const id = getIdParam(req);

	const task = await models.task.findByPk(id);
	if (!task) {
		res.status(404).send('404 - Not found');
	}

	let newStatus = 'todo';
	if (task.status === 'todo') {
		newStatus = 'completed';
	}

	await task.update({ status: newStatus });

	res.status(200).json(task);
};

async function remove(req, res) {
	const id = getIdParam(req);
	await models.task.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
};

module.exports = {
	getAll,
	getById,
	create,
	update,
	remove,
	toggle
};
