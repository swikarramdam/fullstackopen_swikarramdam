const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const password = process.argv[2];
const uri = `mongodb+srv://swikar:${password}@cluster0.dkor4to.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const personSchema = new Schema({
  name: String,
  number: String,
});

const Person = model("Person", personSchema);

const person = new Person({
  name: "Aasds Lovelace",
  number: "39-44-5323523",
});

person.save().then((result) => {
  console.log("person added");
  mongoose.connection.close();
});
