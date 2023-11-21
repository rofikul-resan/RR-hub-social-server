const jwt = require("jsonwebtoken");

const createJwtToken = async (data, secret) => {
  const token = jwt.sign(data, secret, { expiresIn: "7d" });
  const bearerToken = `bearer ${token}`;
  return bearerToken;
};

const verifyJWT = (req, res, next) => {
  try {
    const bearerToken = req.headers?.authorization;
    if (bearerToken) {
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.sendStatus(405);
        } else {
          req.decode = decode;
          return next();
        }
      });
    }
  } catch {
    res.end();
  }
};

const func = { createJwtToken, verifyJWT };
module.exports = func;
