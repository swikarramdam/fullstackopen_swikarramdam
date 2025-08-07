import React from "react";
import InputForm from "./InputForm";
// import axios from "axios";
import personService from "/src/Services/service.js";

const Form = ({
  persons,
  setPersons,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
}) => {
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (persons.some((person) => person.name === newName)) {
            alert(
              `${newName} is already added to phonebook, do you want to replace the number?`
            );
            // return;
            const find = persons.find((person) => person.name === newName);
            return personService
              .update({ ...find, number: newNumber }, find.id)
              .then((updatedPerson) => {
                setPersons(
                  persons.map((p) =>
                    p.id === updatedPerson.id ? updatedPerson : p
                  )
                );
                setNewName("");
                setNewNumber("");
              });
          }

          if (persons.some((person) => person.number === newNumber)) {
            alert(`${newNumber} is already added to phonebook`);
            return;
          }
          const obj = {
            name: newName,
            number: newNumber,
          };

          // setPersons(persons.concat({ name: newName, number: newNumber }));
          // axios.post("http://localhost:3001/persons", obj).then((response) => {
          //   setPersons(persons.concat(response.data));
          // });
          personService
            .create(obj)
            .then((data) => setPersons(persons.concat(data)));
          setNewName("");
          setNewNumber("");
        }}
      >
        <div>
          <InputForm
            newName={newName}
            newNumber={newNumber}
            setNewName={setNewName}
            setNewNumber={setNewNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
