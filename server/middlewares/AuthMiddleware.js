const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accessToken = req.header("Authorization");
  if (!accessToken)
    return res.json({ error: true, message: "User not logged in!" });

  try {
    const isTokenValid = verify(
      accessToken.split(" ")[1],
      process.env.SECRETE_KEY
    );
    if (isTokenValid) {
      return next();
    } else {
      return res
        .status(500)
        .json({ error: true, message: "User session has expired" });
    }
  } catch (err) {
    return res.status(500).json({ error: true, message: err });
  }
};

module.exports = { validateToken };
