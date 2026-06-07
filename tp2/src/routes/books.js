const express = require("express");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", year: 2008, genre: "Informatique" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999, genre: "Informatique" },
  { id: 3, title: "Design Patterns", author: "Gang of Four", year: 1994, genre: "Informatique" },
  { id: 4, title: "You Don't Know JS", author: "Kyle Simpson", year: 2015, genre: "JavaScript" },
  { id: 5, title: "Eloquent JavaScript", author: "Marijn Haverbeke", year: 2018, genre: "JavaScript" },
];
let nextId = 6;

router.use(isAuthenticated);

router.get("/", (req, res) => {
  res.render("books/index", { title: "Bibliothèque", books });
});

router.get("/new", (req, res) => {
  res.render("books/new", { title: "Ajouter un livre", error: null });
});

router.post("/", (req, res) => {
  const { title, author, year, genre } = req.body;

  if (!title || !author) {
    return res.render("books/new", {
      title: "Ajouter un livre",
      error: "Le titre et l'auteur sont obligatoires.",
      values: { title, author, year, genre },
    });
  }

  const book = { id: nextId++, title, author, year: parseInt(year) || null, genre };
  books.push(book);
  res.redirect("/books");
});

router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.redirect("/books");
  res.render("books/detail", { title: book.title, book });
});

router.post("/:id/delete", (req, res) => {
  books = books.filter((b) => b.id !== parseInt(req.params.id));
  res.redirect("/books");
});

module.exports = router;
