const sequelize = require('.');
const { pickRandom, randomDate } = require('../utils/helpers/random');

async function run() {
	console.log('Rewriting the database, adding some dummy data.');

	// Syncing the database tables
	await sequelize.sync({ force: true });

	// Adding some dummy users
	await sequelize.models.user.bulkCreate([
		{ username: 'hossein' },
		{ username: 'ali' },
		{ username: 'john' },
		{ username: 'joe' },
	]);

	// Let's create random tasks for each user
	for (const user of await sequelize.models.user.findAll()) {
		for (let i = 0; i < 10; i++) {
			const title = pickRandom([
				'Do the POD',
				'Review assessment course goals',
				'Do the team building activities',
				'Talk to the product owner',
				'Meeting with the scrum master',
				'Attend the classes',
				'Thank Hossein for this amazing project',
				'Buy a cofee for Hossein',
			]);

			const status = pickRandom([
				'completed', 'todo'
			]);

			await user.createTask({
				title: title,
				status: status
			});
		}
	}

	console.log('Done!');
}

module.exports = run;