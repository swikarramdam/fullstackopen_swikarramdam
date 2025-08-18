const express = require("express");
const app = express();
app.use(express.json());

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(notes));
// });

app.get("/api/notes", (request, response) => {
  console.log("you are calling get for all notes");
  response.json(notes);
});

app.get("/api/notes/:noteid", (request, response) => {
  const myId = request.params.noteid;
  const myNote = notes.find((note) => note.id === myId);

  if (myNote) {
    response.json(myNote);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:noteid", (request, response) => {
  const myId = request.params.noteid;
  notes = notes.filter((note) => note.id !== myId);

  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;
  note.id = String(notes.length + 1);
  if (!note.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  console.log("our note is", note);
  const myNote = {
    content: note.content,
    important: note.important || false,
    id: String(notes.length + 1),
  };
  notes.push(myNote);
  response.status(201).json(myNote);
});

const PORT = 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
