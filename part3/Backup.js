const express = require("express");
const app = express();

let persons = [
  { id: "1", name: "Arto Hellas", number: "040-123456" },
  { id: "2", name: "Ada Lovelace", number: "39-44-5323523" },
  { id: "3", name: "Dan Abramov", number: "12-43-234345" },
  { id: "4", name: "Mary Poppendieck", number: "39-23-6423122" },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const now = new Date();
  const timeString = now.toLocaleString();
  res.send(`
    <p>Phonebook has info for ${persons.length} people <br/> ${timeString}</p>
  `);
});

app.get("/api/persons/:id", (req, res) => {
  const myId = req.params.id;
  const myPerson = persons.find((person) => person.id === myId);

  if (myPerson) {
    res.json(myPerson);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const myId = req.params.id;
  persons = persons.filter((person) => person.id !== myId);
  res.status(204).end();
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
