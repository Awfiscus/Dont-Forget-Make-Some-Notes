const express = require("express");
const path = require("path");
const fs = require("fs");
const bd = require("./db/db.json");

//npm used to give each new note an unique id
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

//takes whatever is in the json file then save it to the notes array
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    notes = JSON.parse(data);
    console.log(notes);
    return notes;
  });
  res.json(notes);
});

//adds new note from front end to notes array then writes it to the json file
app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  newNote.id = uuidv4();

  notes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
    if (err) throw err;
  });
  res.json(notes);
});

//deletes note from json file based on id sent from front end
app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, data) => {
    let id = req.params.id;
    const parseData = JSON.parse(data);
    const remainingNotes = parseData.filter((note) => note.id !== id);
    fs.writeFile("./db/db.json", JSON.stringify(remainingNotes), (err) => {
      if (err) throw err;
    });
  });
  res.json(notes);
});

//listener
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
