const express = require("express");
const passport = require("passport");
const User = require("../models/User");

const router = express.Router();

router.get("/register", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/books");
  res.render("auth/register", { title: "Inscription", error: null });
});

router.post("/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.render("auth/register", {
      title: "Inscription",
      error: "Les mots de passe ne correspondent pas.",
      values: { username, email },
    });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.render("auth/register", {
        title: "Inscription",
        error: "Nom d'utilisateur ou email déjà utilisé.",
        values: { username, email },
      });
    }

    const user = new User({ username, email, password });
    await user.save();

    req.login(user, (err) => {
      if (err) throw err;
      res.redirect("/books");
    });
  } catch (err) {
    console.error(err);
    res.render("auth/register", {
      title: "Inscription",
      error: "Une erreur est survenue. Veuillez réessayer.",
      values: { username, email },
    });
  }
});

router.get("/login", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/books");
  res.render("auth/login", {
    title: "Connexion",
    error: null,
    success: req.query.registered ? "Compte créé avec succès !" : null,
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login?error=1",
  }),
  (req, res) => {
    const returnTo = req.session.returnTo || "/books";
    delete req.session.returnTo;
    res.redirect(returnTo);
  }
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/auth/login");
  });
});

module.exports = router;
