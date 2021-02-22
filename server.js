const express = require("express");
const path = require("path");
const fs = require("fs");
const bd = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const noteTitles = [];
let notes = [];

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/assets/js/index.js"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
    return notes;
  });
  res.json(notes);
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  newNote.id = uuidv4();

  notes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
  res.json(notes);
});

//STOPPED HERE
// app.delete('/api/notes',)

//listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
