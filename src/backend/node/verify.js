import jwt from 'jsonwebtoken';
const jwt_verify = (token) => {
  let authorized;
  if (token) {
    try {
      authorized = jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
      authorized = false;
    }
  }
  return authorized;
};

export default jwt_verify;
