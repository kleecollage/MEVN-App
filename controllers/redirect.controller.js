import { Link } from "../models/Link.js";

export const redirectLink = async (req, res) => {
  try {
    const { nanoLink } = req.params;
    const link = await Link.findOne({ nanoLink });
    // validations
		if (!link) 
			return res.status(404).json({ error: "Link doesn't exists" });

		return res.redirect(link.longLink);
	} catch (error) {
		console.log(error);
		if (error.kind == 'ObjectId') {
			return res.status(403).json({ error: 'Invalid ID format' });
		}
    return res.status(500).json({ error: 'Server errror' });
  }
};