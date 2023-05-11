const State = require('../models/State');
const User = require('../models/User');
const Category = require('../models/Category');
const Ad = require('../models/Ad');
const { validationResult, matchedData } = require('express-validator');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

module.exports = {
	getStates: async (req, res) => {
		let states = await State.find();
		res.json({ states });
	},
	info: async (req, res) => {
		let token = req.query.token;

		const user = await User.findOne({ token });
		const state = await State.findById(user.state);
		const ads = await Ad.find({ idUser: user._id.toString() });

		let adList = [];
		for (let i in ads) {
			const cat = await Category.findById(ads[i].category);

			adList.push({
				...ads[i],
				category: cat.slug,
			});
		}

		res.json({
			name: user.name,
			email: user.email,
			state: state.name,
			stateId: user.state,
			ads: adList,
		});
	},
	editAction: async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.json({ error: errors.mapped() });
			return;
		}
		const data = matchedData(req);

		//const user = await User.findOne({token:data.token})

		let updates = {};

		if (data.name) {
			updates.name = data.name;
		}

		if (data.email) {
			const emailCheck = await User.findOne({ email: data.email });
			if (emailCheck) {
				res.json({ error: 'Email already exist' });
				return;
			}
			updates.email = data.email;
		}

		if (data.state) {
			if (mongoose.Types.ObjectId.isValid(data.state)) {
				const stateCheck = await State.findById(data.state);

				if (!stateCheck) {
					res.json({ error: 'State does not exist' });
					return;
				}
				updates.state = data.state;
			} else {
				res.json({ error: 'Invalid state code ' });
				return;
			}
		}

		if (data.password) {
			const newPasswordHash = await bcrypt.hash(data.password, 10);
			updates.passwordHash = newPasswordHash;
		}

		await User.findOneAndUpdate({ token: data.token }, { $set: updates });

		res.json({});
	},
};
