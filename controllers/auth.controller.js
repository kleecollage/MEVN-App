import { User } from '../models/User.js';
import { generateRefreshToken, generateToken } from '../utils/tokenManager.js';

// REGISTER CONTROLLER
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

		//* TOKEN *//
		const { token, expiresIn } = generateToken(user.id)
		generateRefreshToken(user.id, res)

		return res.status(201).json({ token, expiresIn });
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

// LOGIN CONTROLLER
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
    
    //* TOKEN *//
    const { token, expiresIn } = generateToken(user.id)
		generateRefreshToken(user.id, res)

    return res.json( {token, expiresIn} );
	} catch (error) {
		console.log(error);

		return res
			.status(500)
			.json({ error: 'Server error. Contact with administrator' });
	}
};

export const infoUser = async(req, res) => { 
  try {
		const user = await User.findById(req.uid).lean();
    return await res.json({ email: user.email, uid: user.uid })
  } catch (error) {
    console.log(error)
		return res.status(500).json({error: error.message})
  }
}

export const refreshToken = (req, res) => {
	try {
    const { token, expiresIn } = generateToken(req.uid);

		return res.json({ token, expiresIn });
	} catch (error) {
		console.log(error);
		return res.status(500).json({error: error.message})
	}
}

export const logout = (req, res) => {
	res.clearCookie('refreshToken');
	res.json({ok: true})
}
