const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;
    let adminToken = req.body.adminToken || req.query.adminToken || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
      adminToken = adminToken.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    // verify token and get user data out of it -- else verify adminToken and get admin data out of it.

    if (token) {
      try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
      } catch {
        console.log('Invalid token');
      }
      return req;
    } else {
      try {
        const { data } = jwt.verify(adminToken, secret, { maxAge: expiration });
        req.admin = data;
      } catch {
        console.log('Invalid adminToken');
      }
      return req;
    }

  },

  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },

  signAdminToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};