var ls = require('local-storage');

const jwt_verify = () => {
  const jwt = ls.get('jwt');
  let authorized;
  if (jwt) {
    authorized = require('jsonwebtoken').verify(jwt, process.env.JWT_SECRET);
  }
  return authorized;
};

export default jwt_verify;
