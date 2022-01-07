//used to authorize user in our backend

const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWTS, {
    expiresIn: "7d",
  });
};

module.exports = generateToken;
