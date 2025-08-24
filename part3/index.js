const express = require("express");
const app = express();
app.use(express.json());
var morgan = require("morgan");
const mongoose = require("mongoose");
const Person = require("./models/person");

const password = process.argv[2];
const uri = `mongodb+srv://swikar:${password}@cluster0.dkor4to.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
app.use(express.static("dist"));

const cors = require("cors");
app.use(cors());

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/info", (req, res) => {
  Person.countDocuments({}).then((count) => {
    const now = new Date();
    res.send(`
    <p>Phonebook has info for ${count} people <br/> ${now.toLocaleString()}</p>
  `);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((myPerson) => {
      if (myPerson) {
        res.json(myPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Person.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (updatedPerson) {
        res.json(updatedPerson);
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (req, res, next) => {
  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({
      error: "number or name is missing",
    });
  }
  // if (persons.some((p) => p.name === person.name)) {
  //   return res.status(400).json({
  //     error: "name must be unique",
  //   });
  // }
  const person = new Person({ name, number });
  person
    .save()
    .then((savedPerson) => {
      res.status(201).json(savedPerson);
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    // Happens when Mongo gets invalid ObjectId
    return response.status(400).json({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    // Happens when schema validation fails
    return response.status(400).json({ error: error.message });
  } else if (error.name === "MongoServerError" && error.code === 11000) {
    // Duplicate key (unique constraint violation)
    return response.status(400).json({ error: "Duplicate field value" });
  }

  next(error);
};
app.use(errorHandler);
const port = process.env.PORT ? process.env.PORT : 3001;
app.listen(port, () => {
  console.log("Server is running on port 3001");
});
