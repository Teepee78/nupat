import User from '../models/user.model.js';

export const createUser = async (req, res) => {
	const { name, gender } = req.body;

	const existingUser = await User.findOne({ name });
	if (existingUser) return res.status(400).json({ message: "User already exists" });

	const user = await new User({ name, gender });
	await user.save();

	return res.status(201).json({ user: user.toObject() });
}

export const getUserById = async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id);
	if (!user) return res.status(400).json({ message: "User not found" });

	const token = user.generateAuthToken();

	res.setHeader('Authorization', token);
	res.cookie('Authorization', token);
	return res.status(200).json({ user: user.toObject(), token });
}

export const updateUserById = async (req, res) => {
	const { id } = req.params;
	const { name } = req.body;

	const user = await User.findById(id);
	if (!user) return res.status(400).json({ message: "User not found" });

	user.name = name;
	await user.save();
	return res.status(200).json({ user: user.toObject() });
}

export const deleteUserById = async (req, res) => {
	const { id } = req.params;

	const user = await User.findById(id);
	if (!user) return res.status(400).json({ message: "User not found" });

	user.deleteOne();
	return res.status(200).json({ message: "User deleted successfully" });
}

export const getUsers = async (req, res) => {
	const users = await User.find();

	return res.status(200).json(users);
}

export const getMaleUsers = async (req, res) => {
	const users = await User.find({gender: 'male'});

	return res.status(200).json(users);
}
