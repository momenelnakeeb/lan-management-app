const { Strategy, ExtractJwt } = require('passport-jwt');
const User = require('../models/User');
require('dotenv').config();

module.exports = passport => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.JWT_SECRET;
  
  passport.use(new Strategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch(err => done(err, false));
  }));
};
