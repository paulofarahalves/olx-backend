require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileupload = require('express-fileupload');

const apiRoutes = require('./src/routes');

mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
	console.log('Error: ', error.message);
});

/*const database = (module.exports = () => {
	const connectionParams = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};
	try {
		mongoose.connect(process.env.DATABASE, connectionParams);
		console.log('DB successfully connected');
	} catch (error) {
		console.log(error);
	}
});

database();*/

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());

server.use(express.static(__dirname + '/public'));

server.use('/', apiRoutes);

server.listen(process.env.PORT, () => {
	console.log(`Running at ${process.env.BASE}`);
});
