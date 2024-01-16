const express = require('express');
const db = require('./models');
const mysql2 = require('mysql2');
const { PORT } = require('./config/envConstants');
const {Movie, Show, Theatre} = require('./models');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	try {
		const city = req.query.city;
	
		if (!city) return res.status(400).json({ message: 'City is required' });
	
		Theatre.findAll({
		  where: {city: city},
		  attributes: ['id', 'name', 'totalHalls', 'city']
		}).then(theatres => {
			return res.json(theatres);
		}).catch(err => {
			console.log(err);
			return res.status(500).json({ message: 'Something went wrong' });
		});
	}
	catch(err) {
		console.log(err);
		return res.status(500).json({ message: 'Something went wrong' });
	}
});

db.sequelize.sync().then((req) => {
	app.listen(PORT, () => {
		console.log('Server is running on port '+PORT);
	}); 
}).catch((err) => {
	console.log(err);
});