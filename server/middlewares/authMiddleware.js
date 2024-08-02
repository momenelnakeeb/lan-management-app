const passport = require('passport');

exports.protect = passport.authenticate('jwt', { session: false });

exports.admin = (req, res, next) => {
  console.log("Admin middleware check for user:", req.user.email);
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    console.log("Access denied for user:", req.user.email);
    res.status(403).json({ message: 'Access denied' });
  }
};
