const express = require("express");
const cors = require("cors");
const db = require("./database");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);
app.get("/user/genreRelatedBooks", db.genreRelatedBooks);
app.get("/user/filterBooks", db.filterBooks);
app.post("/login", db.createUser);
app.get("/user/book/:id", db.getBookById);
// app.get("/user",db.getBooks)

app.listen(4000, () => console.log(`Server on localhost:4000`));
