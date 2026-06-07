const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const path = require("path");

require("./config/passport");

const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tp2";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log(" Connected to MongoDB"))
  .catch((err) => console.error(" MongoDB connection error:", err));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "tp2_super_secret_key_change_in_production",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.get("/", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/books");
  res.redirect("/auth/login");
});

app.use("/auth", authRouter);
app.use("/books", booksRouter);

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
