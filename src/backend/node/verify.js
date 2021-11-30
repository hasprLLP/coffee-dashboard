import jwt from 'jsonwebtoken';
const jwt_verify = (token) => {
  let authorized;
  if (token) {
    authorized = jwt.verify(token, process.env.JWT_SECRET);
  }
  return authorized;
};

export default jwt_verify;
