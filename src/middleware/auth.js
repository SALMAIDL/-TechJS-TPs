function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.session.returnTo = req.originalUrl;
  res.redirect("/auth/login");
}

module.exports = { isAuthenticated };
