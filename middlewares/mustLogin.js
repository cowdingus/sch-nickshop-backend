const jwt = require("jsonwebtoken");

module.exports = {
	mustLogin(req, res, next) {
		const token = req.get("Authorization")?.split(' ')[1];

		if (!token) {
			res.status(403).json({ message: "Login required" });
			return;
		}

		jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
			if (err) {
				res.status(403).json({ message: err.message });
				console.error(err);
				return;
			}

			req.user = payload;
			next();
		});
	}
};
