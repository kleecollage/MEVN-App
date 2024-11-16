import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
	// console.log(req.body);
	const { email, password } = req.body;
	try {
		// alternative auth validation
		let user = await User.findOne({ email });
		if (user) throw { code: 11000 };

		user = new User({ email, password });
		const savedUser = await user.save();
		console.log('saved user: ', savedUser);
		// TODO: generate  JWT
		return res.status(201).json({ ok: true });
	} catch (error) {
		console.log(error);
		// default mongoose auth validation
		if (error.code == 11000)
			return res.status(400).json({ error: 'User is already taken' });

		return res
			.status(500)
			.json({ error: 'Server error. Contact with administrator' });
	}
};

export const login = async (req, res) => {
	// console.log(req.body);
	try {
		const { email, password } = req.body;
		
		let user = await User.findOne({ email });
    if (!user) 
      return res.status(403).json({ error: "User doesn't exists" });

		const respuestaPassword = await user.comparePassword(password);
		if (!respuestaPassword)
			return res.status(403).json({ error: 'Incorrect Password' });
    
    // JWT payload
    const token = jwt.sign({ uid: user.id }, process.env.JWT_SECRET)
    // TODO: Refresh token
		return res.json({ token });
	} catch (error) {
		console.log(error);

		return res
			.status(500)
			.json({ error: 'Server error. Contact with administrator' });
	}
};
