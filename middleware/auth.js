const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send({
      status_code: 401,
      message: "FAILED",
      data: "Assess denied. No token provied"
    });

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({
      status_code: 400,
      message: "FAILED",
      data: "Invalid Token"
    });
  }
}

module.exports = auth;

// For expiry time token
/*
const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        console.log(Date.now()-decoded.expireTime);
        if(!(Date.now()<decoded.expireTime)){
            return res.status(440).send('The token has expired')
        }
        const expireTime=Date.now()+900000;
        const newToken=jwt.sign(
            {
              id: decoded._id,
              isAdmin: decoded.isAdmin,
              username: decoded.username,
              isStaff: decoded.isStaff,
              isActive: decoded.isActive,
              expireTime: expireTime
            },
            process.env.JWT_PRIVATE_KEY
          );

        req.user = decoded;
        res.header("x-auth-token",newToken)
        next();


*/
