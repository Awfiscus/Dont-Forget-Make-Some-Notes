const express = require("express");
const path = require("path");
const bd = require("./db.json");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const noteTitles = [];
const notes = [];

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  const notesFile = req.body(bd);
  console.log(notesFile);
  return res.json(notesFile);
});

//listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
