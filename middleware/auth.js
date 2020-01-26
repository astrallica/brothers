const jwt = require("express-jwt")
const secret = "secret"

function getTokenFromHeader(req){
  console.log(req.headers)
  // NTS: HTTP authorization header syntax -> Authorization: <type> <credentials>
  // TODO: lookup what default <type> in authorization header is set to.
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer' ||
      req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Basic') {
    // return <credentials> : JWT token
    return req.headers.authorization.split(' ')[1];
  // process token sent in query
  } else if (req.headers.authorization && req.headers.authorization.split(' ').length === 1) {
    return req.headers.authorization
  }
  else if (req.query && req.query.token) {
    return req.query.token
  }
  return null;
}

var auth = {
  required: jwt({
    secret: secret,
    requestProperty: 'auth',
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    requestProperty: 'auth',
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

module.exports = auth
