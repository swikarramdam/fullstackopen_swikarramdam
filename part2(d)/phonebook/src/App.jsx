import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import Form from "./Components/Form";
import Display from "./Components/Display";
import personService from "./Services/service";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState(null);

  useEffect(function () {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const filtered = persons.filter(
    (person) => person.name?.toLowerCase().includes(searchTerm.toLowerCase()) //just adding question mark fixed it
  );
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add a new</h2>
      <Form
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>

      <Display filtered={filtered} persons={persons} setPersons={setPersons} />
    </div>
  );
};

export default App;
