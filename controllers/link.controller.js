import { nanoid } from 'nanoid';
import { Link } from '../models/Link.js';

// GET ALL
export const getLinks = async (req, res) => {
	try {
		const links = await Link.find({ uid: req.uid });

		return res.status(201).json({ links });
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error: 'Server errror' });
	}
};

// GET ONE
export const getLink = async (req, res) => {
	try {
		const { id } = req.params;

		const link = await Link.findById(id);
		if (!link) return res.status(404).json({ error: "Link doesn't exists" });

    if(!link.uid.equals(req.uid)) 
      return res.status(401).json({ error: "Access Denied"})

		return res.status(201).json({ link });
	} catch (error) {
		console.log(error);
		if (error.kind == 'ObjectId') {
			return res.status(403).json({ error: 'Invalid ID format' });
		}

		return res.status(500).json({ error: 'Server errror' });
	}
};

// CREATE LINK
export const createLink = async (req, res) => {
	try {
		let { longLink } = req.body;
		if (!longLink.startsWith('https://')) {
			longLink = 'https://' + longLink;
		}
		const link = new Link({ longLink, nanoLink: nanoid(6), uid: req.uid });
		const newLink = await link.save();

		return res.status(201).json({ newLink });
	} catch (error) {
		console.log(error);

		return res.status(500).json({ error: 'Server errror' });
	}
};

// REMOVE LINK
export const removeLink = async(req, res) => {
  try {
		const { id } = req.params;

		const link = await Link.findById(id);
		if (!link) return res.status(404).json({ error: "Link doesn't exists" });

    if(!link.uid.equals(req.uid)) 
      return res.status(401).json({ error: "Access Denied"})

    await Link.findByIdAndDelete(id);

		return res.json({ link });
	} catch (error) {
		console.log(error);
		if (error.kind == 'ObjectId') {
			return res.status(403).json({ error: 'Invalid ID format' });
		}

		return res.status(500).json({ error: 'Server errror' });
	}
}
