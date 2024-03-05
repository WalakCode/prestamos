const jwt = require("jsonwebtoken");

const authToken = async (req, res, next) => {
  let token = req.cookies.jwt
  if (!token) {
    let error = null
    res.render('main.ejs',{error})
    return;
  }
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  if (token) {
    try {
      jwt.verify(token,'SECRETUNIQUEKEY');
      next();
    } catch (errors) {
      let error = null
      return res.render('main.ejs',{error})
    }
  }
};

module.exports = {
  authToken,
};
